import { NextRequest, NextResponse } from "next/server";
import { apiError, assertSameOrigin } from "@/lib/server/http";
import { clearAdminSession } from "@/lib/server/session";

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    await clearAdminSession();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
