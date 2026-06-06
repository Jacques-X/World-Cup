import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { sessionState } from "@/lib/server/session";

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function requireAdmin() {
  const session = await sessionState();
  if (!session.admin) throw new HttpError(403, "Admin access required.");
  return session;
}

export function assertSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return;
  if (new URL(origin).host !== request.nextUrl.host) {
    throw new HttpError(403, "Cross-origin request rejected.");
  }
}

export function apiError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: error.issues[0]?.message ?? "Invalid request." },
      { status: 400 },
    );
  }
  if (error instanceof HttpError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  if (error instanceof Error) {
    console.error(error);
  }
  return NextResponse.json(
    { error: "The server could not complete the request." },
    { status: 500 },
  );
}
