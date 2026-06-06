import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/server/env";
import { apiError, assertSameOrigin, HttpError } from "@/lib/server/http";
import { setAdminSession } from "@/lib/server/session";

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const body = (await request.json()) as { password?: string };
    const valid = await compare(
      body.password ?? "",
      env().ADMIN_PASSWORD_HASH,
    );
    if (!valid) throw new HttpError(401, "Incorrect admin password.");
    await setAdminSession();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
