import { describe, expect, it } from "vitest";
import { MATCHES, TEAMS } from "@/lib/data";
import {
  buildStandings,
  calculatePoints,
  predictionScores,
  validateScoreValue,
} from "@/lib/tournament";
import type { Player, Prediction } from "@/lib/types";

const players: Player[] = [
  { id: "p1", slot: 1, name: "One", color: "emerald" },
  { id: "p2", slot: 2, name: "Two", color: "blue" },
];

describe("calculatePoints", () => {
  it("awards exact, outcome, and incorrect scores correctly", () => {
    const match = MATCHES[0];
    const predictions: Prediction[] = [
      { playerId: "p1", matchId: match.id, home: 2, away: 1 },
      { playerId: "p2", matchId: match.id, home: 3, away: 0 },
    ];
    const result = {
      [match.id]: { home: 2, away: 1 },
    };

    expect(calculatePoints(players, predictions, result)).toEqual({
      p1: { total: 10, exact: 1, outcome: 0 },
      p2: { total: 5, exact: 0, outcome: 1 },
    });
  });

  it("ignores incomplete predictions and results", () => {
    const match = MATCHES[0];
    expect(
      calculatePoints(
        players,
        [{ playerId: "p1", matchId: match.id, home: 1, away: null }],
        { [match.id]: { home: 1, away: 0 } },
      ).p1.total,
    ).toBe(0);
  });
});

describe("buildStandings", () => {
  it("orders teams by points, goal difference, goals scored, then name", () => {
    const groupMatches = MATCHES.filter((match) => match.group === "A");
    const scores = Object.fromEntries(
      groupMatches.map((match, index) => [
        match.id,
        index === 0
          ? { home: 2, away: 0 }
          : index === 1
            ? { home: 1, away: 0 }
            : { home: 0, away: 0 },
      ]),
    );
    const table = buildStandings(groupMatches, TEAMS, scores).A;

    expect(table).toHaveLength(4);
    expect(table[0].pts).toBeGreaterThanOrEqual(table[1].pts);
    expect(table.every((team) => team.played === 3)).toBe(true);
  });
});

describe("prediction helpers", () => {
  it("normalizes a selected player's predictions", () => {
    const match = MATCHES[0];
    expect(
      predictionScores(
        [
          { playerId: "p1", matchId: match.id, home: 1, away: 0 },
          { playerId: "p2", matchId: match.id, home: 2, away: 2 },
        ],
        "p2",
      ),
    ).toEqual({ [match.id]: { home: 2, away: 2 } });
  });

  it("accepts blank and bounded integer scores", () => {
    expect(validateScoreValue("")).toBeNull();
    expect(validateScoreValue(0)).toBe(0);
    expect(validateScoreValue(99)).toBe(99);
    expect(() => validateScoreValue(-1)).toThrow();
    expect(() => validateScoreValue(100)).toThrow();
    expect(() => validateScoreValue(1.5)).toThrow();
  });
});
