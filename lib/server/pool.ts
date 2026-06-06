import "server-only";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { easternKickoffAt } from "@/lib/tournament";
import type { GroupCode, PoolState } from "@/lib/types";

export const POOL_ID = "00000000-0000-4000-8000-000000000001";

async function loadMatches() {
  const supabase = getSupabaseAdmin();
  const withDeadline = await supabase
    .from("matches")
    .select(
      "id,match_number,group_code,match_date,match_time,kickoff_at,venue,home_team,away_team",
    )
    .eq("pool_id", POOL_ID)
    .order("match_number");

  if (!withDeadline.error) {
    return {
      data: (withDeadline.data ?? []).map((row) => ({
        ...row,
        kickoff_at: row.kickoff_at,
      })),
      error: null,
    };
  }

  if (withDeadline.error.code !== "42703") {
    return { data: [], error: withDeadline.error };
  }

  const legacy = await supabase
    .from("matches")
    .select(
      "id,match_number,group_code,match_date,match_time,venue,home_team,away_team",
    )
    .eq("pool_id", POOL_ID)
    .order("match_number");

  return {
    data: (legacy.data ?? []).map((row) => ({
      ...row,
      kickoff_at: easternKickoffAt(
        row.match_date,
        String(row.match_time),
      ),
    })),
    error: legacy.error,
  };
}

export async function loadPoolState(isAdmin: boolean): Promise<PoolState> {
  const supabase = getSupabaseAdmin();
  const [poolQuery, playersQuery, matchesQuery, predictionsQuery, resultsQuery] =
    await Promise.all([
      supabase.from("pools").select("id,name,updated_at").eq("id", POOL_ID).single(),
      supabase
        .from("players")
        .select("id,slot,name,color,updated_at")
        .eq("pool_id", POOL_ID)
        .order("slot"),
      loadMatches(),
      supabase
        .from("predictions")
        .select("player_id,match_id,home_score,away_score,updated_at")
        .eq("pool_id", POOL_ID),
      supabase
        .from("match_results")
        .select("match_id,home_score,away_score,updated_at")
        .eq("pool_id", POOL_ID),
    ]);

  const firstError = [
    poolQuery.error,
    playersQuery.error,
    matchesQuery.error,
    predictionsQuery.error,
    resultsQuery.error,
  ].find(Boolean);
  if (firstError) throw firstError;
  if (!poolQuery.data) throw new Error("The seeded pool was not found.");

  const timestamps = [
    poolQuery.data.updated_at,
    ...(playersQuery.data ?? []).map((row) => row.updated_at),
    ...(predictionsQuery.data ?? []).map((row) => row.updated_at),
    ...(resultsQuery.data ?? []).map((row) => row.updated_at),
  ];

  return {
    pool: { id: poolQuery.data.id, name: poolQuery.data.name },
    players: (playersQuery.data ?? []).map((row) => ({
      id: row.id,
      slot: row.slot,
      name: row.name,
      color: row.color,
    })),
    matches: (matchesQuery.data ?? []).map((row) => ({
      id: row.id,
      matchNumber: row.match_number,
      group: row.group_code as GroupCode,
      date: row.match_date,
      time: String(row.match_time).slice(0, 5),
      kickoffAt: row.kickoff_at,
      venue: row.venue,
      home: row.home_team,
      away: row.away_team,
    })),
    predictions: (predictionsQuery.data ?? []).map((row) => ({
      playerId: row.player_id,
      matchId: row.match_id,
      home: row.home_score,
      away: row.away_score,
    })),
    results: Object.fromEntries(
      (resultsQuery.data ?? []).map((row) => [
        row.match_id,
        { home: row.home_score, away: row.away_score },
      ]),
    ),
    isAdmin,
    updatedAt: timestamps.sort().at(-1) ?? new Date(0).toISOString(),
  };
}
