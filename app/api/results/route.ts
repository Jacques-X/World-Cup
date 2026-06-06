import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { apiError, assertSameOrigin, requireAdmin } from "@/lib/server/http";
import { POOL_ID } from "@/lib/server/pool";
import { getSupabaseAdmin } from "@/lib/server/supabase";

const score = z.number().int().min(0).max(99).nullable();
const schema = z.object({
  matchId: z.string().uuid(),
  home: score,
  away: score,
});

export async function PUT(request: NextRequest) {
  try {
    assertSameOrigin(request);
    await requireAdmin();
    const body = schema.parse(await request.json());
    const { data, error } = await getSupabaseAdmin()
      .from("match_results")
      .upsert(
        {
          pool_id: POOL_ID,
          match_id: body.matchId,
          home_score: body.home,
          away_score: body.away,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "pool_id,match_id" },
      )
      .select("match_id,home_score,away_score")
      .single();
    if (error) throw error;
    return NextResponse.json({
      matchId: data.match_id,
      home: data.home_score,
      away: data.away_score,
    });
  } catch (error) {
    return apiError(error);
  }
}
