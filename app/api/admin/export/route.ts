import { NextResponse } from "next/server";
import { apiError, requireAdmin } from "@/lib/server/http";
import { loadPoolState } from "@/lib/server/pool";

export async function GET() {
  try {
    await requireAdmin();
    const state = await loadPoolState(true);
    return new NextResponse(JSON.stringify(state, null, 2), {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition":
          'attachment; filename="wc2026-predictions-backup.json"',
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    return apiError(error);
  }
}
