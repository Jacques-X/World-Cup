import { NextRequest, NextResponse } from "next/server";
import { apiError, assertSameOrigin, requireAdmin } from "@/lib/server/http";
import { POOL_ID } from "@/lib/server/pool";
import { getSupabaseAdmin } from "@/lib/server/supabase";

export async function DELETE(request: NextRequest) {
  try {
    assertSameOrigin(request);
    await requireAdmin();
    const supabase = getSupabaseAdmin();
    const [predictions, results] = await Promise.all([
      supabase.from("predictions").delete().eq("pool_id", POOL_ID),
      supabase.from("match_results").delete().eq("pool_id", POOL_ID),
    ]);
    if (predictions.error) throw predictions.error;
    if (results.error) throw results.error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
