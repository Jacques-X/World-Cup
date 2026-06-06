import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/server/env";
import { apiError, assertSameOrigin, HttpError } from "@/lib/server/http";
import {
  safeTokenEqual,
  setParticipantSession,
} from "@/lib/server/session";

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token") ?? "";
    if (!safeTokenEqual(token, env().POOL_ACCESS_TOKEN)) {
      return NextResponse.redirect(new URL("/access?error=invalid", request.url));
    }
    await setParticipantSession();
    return NextResponse.redirect(new URL("/", request.url));
  } catch {
    return NextResponse.redirect(new URL("/access?error=server", request.url));
  }
}

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const body = (await request.json()) as { token?: string };
    if (!safeTokenEqual(body.token ?? "", env().POOL_ACCESS_TOKEN)) {
      throw new HttpError(401, "That invite token is not valid.");
    }
    await setParticipantSession();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
