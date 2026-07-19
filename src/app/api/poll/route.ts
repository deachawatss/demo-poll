import { NextResponse } from "next/server";

import { getPoll } from "@/lib/poll";

export function GET(): NextResponse {
  return NextResponse.json(getPoll());
}
