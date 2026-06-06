import type {
  GroupCode,
  Match,
  Player,
  PlayerStats,
  Prediction,
  Score,
  Standing,
  Team,
} from "@/lib/types";

export const GROUPS: GroupCode[] = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
];

export const PLAYER_COLORS = [
  "emerald",
  "blue",
  "indigo",
  "amber",
  "pink",
] as const;

export function scoreKey(matchId: string, playerId: string) {
  return `${matchId}:${playerId}`;
}

export function isCompleteScore(score?: Score): score is {
  home: number;
  away: number;
} {
  return (
    score?.home !== null &&
    score?.home !== undefined &&
    score?.away !== null &&
    score?.away !== undefined
  );
}

export function validateScoreValue(value: unknown): number | null {
  if (value === null || value === "") return null;
  if (
    typeof value !== "number" ||
    !Number.isInteger(value) ||
    value < 0 ||
    value > 99
  ) {
    throw new Error("Scores must be whole numbers between 0 and 99.");
  }
  return value;
}

function outcome(score: { home: number; away: number }) {
  if (score.home > score.away) return "home";
  if (score.home < score.away) return "away";
  return "draw";
}

export function calculatePoints(
  players: Player[],
  predictions: Prediction[],
  results: Record<string, Score>,
): Record<string, PlayerStats> {
  const totals = Object.fromEntries(
    players.map((player) => [
      player.id,
      { total: 0, exact: 0, outcome: 0 },
    ]),
  ) as Record<string, PlayerStats>;

  for (const prediction of predictions) {
    const result = results[prediction.matchId];
    if (!isCompleteScore(result) || !isCompleteScore(prediction)) continue;

    if (
      prediction.home === result.home &&
      prediction.away === result.away
    ) {
      totals[prediction.playerId].total += 10;
      totals[prediction.playerId].exact += 1;
    } else if (outcome(prediction) === outcome(result)) {
      totals[prediction.playerId].total += 5;
      totals[prediction.playerId].outcome += 1;
    }
  }

  return totals;
}

export function buildStandings(
  matches: Match[],
  teams: Record<string, Team>,
  scores: Record<string, Score>,
): Record<GroupCode, Standing[]> {
  const tables = Object.fromEntries(
    GROUPS.map((group) => [
      group,
      Object.fromEntries(
        Object.values(teams)
          .filter((team) => team.group === group)
          .map((team) => [
            team.name,
            {
              name: team.name,
              flag: team.flag,
              played: 0,
              won: 0,
              drawn: 0,
              lost: 0,
              gf: 0,
              ga: 0,
              gd: 0,
              pts: 0,
            },
          ]),
      ),
    ]),
  ) as Record<GroupCode, Record<string, Standing>>;

  for (const match of matches) {
    const score = scores[match.id];
    if (!isCompleteScore(score)) continue;

    const home = tables[match.group][match.home];
    const away = tables[match.group][match.away];
    home.played += 1;
    away.played += 1;
    home.gf += score.home;
    home.ga += score.away;
    away.gf += score.away;
    away.ga += score.home;

    if (score.home > score.away) {
      home.won += 1;
      home.pts += 3;
      away.lost += 1;
    } else if (score.home < score.away) {
      away.won += 1;
      away.pts += 3;
      home.lost += 1;
    } else {
      home.drawn += 1;
      away.drawn += 1;
      home.pts += 1;
      away.pts += 1;
    }
  }

  return Object.fromEntries(
    GROUPS.map((group) => [
      group,
      Object.values(tables[group])
        .map((team) => ({ ...team, gd: team.gf - team.ga }))
        .sort(
          (a, b) =>
            b.pts - a.pts ||
            b.gd - a.gd ||
            b.gf - a.gf ||
            a.name.localeCompare(b.name),
        ),
    ]),
  ) as Record<GroupCode, Standing[]>;
}

export function predictionScores(
  predictions: Prediction[],
  playerId: string,
): Record<string, Score> {
  return Object.fromEntries(
    predictions
      .filter((prediction) => prediction.playerId === playerId)
      .map((prediction) => [
        prediction.matchId,
        { home: prediction.home, away: prediction.away },
      ]),
  );
}
