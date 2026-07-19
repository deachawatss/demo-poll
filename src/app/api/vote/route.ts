import { NextRequest, NextResponse } from "next/server";

import { addVote } from "@/lib/db";
import { getPoll, isPollChoice } from "@/lib/poll";
import { broadcast } from "@/lib/ws";

type VoteRequest = {
  choice?: string;
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: VoteRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid choice" }, { status: 400 });
  }

  if (typeof body.choice !== "string" || !isPollChoice(body.choice)) {
    return NextResponse.json({ error: "Invalid choice" }, { status: 400 });
  }

  addVote(body.choice);
  const poll = getPoll();

  await broadcast({
    type: "vote-update",
    choices: poll.choices,
    totalVotes: poll.totalVotes,
  });

  return NextResponse.json({ success: true, totalVotes: poll.totalVotes });
}
