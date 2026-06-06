export type GroupCode =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L";

export type Team = {
  name: string;
  flag: string;
  group: GroupCode;
};

export type Match = {
  id: string;
  matchNumber: number;
  group: GroupCode;
  date: string;
  time: string;
  venue: string;
  home: string;
  away: string;
};

export type Player = {
  id: string;
  slot: number;
  name: string;
  color: string;
};

export type Score = {
  home: number | null;
  away: number | null;
};

export type Prediction = Score & {
  playerId: string;
  matchId: string;
};

export type PoolState = {
  pool: {
    id: string;
    name: string;
  };
  players: Player[];
  matches: Match[];
  predictions: Prediction[];
  results: Record<string, Score>;
  isAdmin: boolean;
  updatedAt: string;
};

export type PlayerStats = {
  total: number;
  exact: number;
  outcome: number;
};

export type Standing = {
  name: string;
  flag: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
};
