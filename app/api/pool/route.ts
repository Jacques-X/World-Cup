import { NextResponse } from "next/server";
import { apiError, requireParticipant } from "@/lib/server/http";
import { previewPoolState } from "@/lib/preview-data";
import { loadPoolState } from "@/lib/server/pool";

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
    const session = await requireParticipant();
    return NextResponse.json(await loadPoolState(session.admin), {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch (error) {
    return apiError(error);
  }
}
