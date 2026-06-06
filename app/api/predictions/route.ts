import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { apiError, assertSameOrigin, requireParticipant } from "@/lib/server/http";
import { POOL_ID } from "@/lib/server/pool";
import { getSupabaseAdmin } from "@/lib/server/supabase";

const score = z.number().int().min(0).max(99).nullable();
const schema = z.object({
  playerId: z.string().uuid(),
  matchId: z.string().uuid(),
  home: score,
  away: score,
});

export async function PUT(request: NextRequest) {
  try {
    assertSameOrigin(request);
    await requireParticipant();
    const body = schema.parse(await request.json());
    const { data, error } = await getSupabaseAdmin()
      .from("predictions")
      .upsert(
        {
          pool_id: POOL_ID,
          player_id: body.playerId,
          match_id: body.matchId,
          home_score: body.home,
          away_score: body.away,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "pool_id,player_id,match_id" },
      )
      .select("player_id,match_id,home_score,away_score")
      .single();
    if (error) throw error;
    return NextResponse.json({
      playerId: data.player_id,
      matchId: data.match_id,
      home: data.home_score,
      away: data.away_score,
    });
  } catch (error) {
    return apiError(error);
  }
}
