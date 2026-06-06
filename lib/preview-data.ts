import { MATCHES } from "@/lib/data";
import { PLAYER_COLORS } from "@/lib/tournament";
import type { PoolState } from "@/lib/types";

export function previewPoolState(): PoolState {
  return {
    pool: {
      id: "00000000-0000-4000-8000-000000000001",
      name: "World Cup 2026 Predictor",
    },
    players: PLAYER_COLORS.map((color, index) => ({
      id: `00000000-0000-4000-9000-${String(index + 1).padStart(12, "0")}`,
      slot: index + 1,
      name: ["Alice", "Bob", "Charlie", "David", "Emma"][index],
      color,
    })),
    matches: MATCHES,
    predictions: MATCHES.slice(0, 18).flatMap((match) =>
      PLAYER_COLORS.map((_, index) => ({
        playerId: `00000000-0000-4000-9000-${String(index + 1).padStart(12, "0")}`,
        matchId: match.id,
        home: (match.matchNumber + index) % 4,
        away: (match.matchNumber + index + 2) % 3,
      })),
    ),
    results: Object.fromEntries(
      MATCHES.slice(0, 8).map((match) => [
        match.id,
        {
          home: match.matchNumber % 3,
          away: (match.matchNumber + 1) % 2,
        },
      ]),
    ),
    isAdmin: true,
    updatedAt: new Date().toISOString(),
  };
}
