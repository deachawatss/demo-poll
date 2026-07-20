import { NextRequest, NextResponse } from "next/server";

import { addVote } from "../../../lib/db";
import { getPoll, isPollChoice } from "../../../lib/poll";

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

  await fetch(`http://localhost:${process.env.PORT || 3100}/_internal/broadcast`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ type: "vote-update", choices: poll.choices }),
  });

  return NextResponse.json(poll);
}
