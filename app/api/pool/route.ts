import { NextResponse } from "next/server";
import { apiError } from "@/lib/server/http";
import { previewPoolState } from "@/lib/preview-data";
import { loadPoolState } from "@/lib/server/pool";
import { sessionState } from "@/lib/server/session";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (
      process.env.NODE_ENV === "development" &&
      process.env.LOCAL_PREVIEW === "true"
    ) {
      return NextResponse.json(previewPoolState(), {
        headers: { "Cache-Control": "private, no-store" },
      });
    }
    const session = await sessionState();
    return NextResponse.json(await loadPoolState(session.admin), {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch (error) {
    return apiError(error);
  }
}
