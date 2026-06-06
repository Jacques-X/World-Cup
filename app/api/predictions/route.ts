import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  apiError,
  assertSameOrigin,
  HttpError,
} from "@/lib/server/http";
import { POOL_ID } from "@/lib/server/pool";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import {
  easternKickoffAt,
  isPredictionLocked,
} from "@/lib/tournament";

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
    const body = schema.parse(await request.json());
    const supabase = getSupabaseAdmin();
    const deadlineQuery = await supabase
      .from("matches")
      .select("kickoff_at,match_date,match_time")
      .eq("pool_id", POOL_ID)
      .eq("id", body.matchId)
      .single();

    let kickoffAt: string | undefined;
    if (!deadlineQuery.error && deadlineQuery.data) {
      kickoffAt = deadlineQuery.data.kickoff_at;
    } else if (deadlineQuery.error?.code === "42703") {
      const legacyQuery = await supabase
        .from("matches")
        .select("match_date,match_time")
        .eq("pool_id", POOL_ID)
        .eq("id", body.matchId)
        .single();
      if (!legacyQuery.error && legacyQuery.data) {
        kickoffAt = easternKickoffAt(
          legacyQuery.data.match_date,
          String(legacyQuery.data.match_time),
        );
      }
    }

    if (!kickoffAt) {
      throw new HttpError(404, "Match not found.");
    }
    if (isPredictionLocked(kickoffAt)) {
      throw new HttpError(
        409,
        "Predictions are locked once the match kicks off.",
      );
    }

    const { data, error } = await supabase
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
    if (error?.message.includes("locked after kickoff")) {
      throw new HttpError(
        409,
        "Predictions are locked once the match kicks off.",
      );
    }
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
