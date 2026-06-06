type PoolRow = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

type PlayerRow = {
  id: string;
  pool_id: string;
  slot: number;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
};

type MatchRow = {
  id: string;
  pool_id: string;
  match_number: number;
  group_code: string;
  match_date: string;
  match_time: string;
  kickoff_at: string;
  venue: string;
  home_team: string;
  away_team: string;
};

type PredictionRow = {
  id: string;
  pool_id: string;
  player_id: string;
  match_id: string;
  home_score: number | null;
  away_score: number | null;
  updated_at: string;
};

type MatchResultRow = {
  id: string;
  pool_id: string;
  match_id: string;
  home_score: number | null;
  away_score: number | null;
  updated_at: string;
};

type TableDefinition<Row, Insert, Update> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      pools: TableDefinition<
        PoolRow,
        Omit<PoolRow, "created_at" | "updated_at"> &
          Partial<Pick<PoolRow, "created_at" | "updated_at">>,
        Partial<Omit<PoolRow, "id">>
      >;
      players: TableDefinition<
        PlayerRow,
        Omit<PlayerRow, "id" | "created_at" | "updated_at"> &
          Partial<Pick<PlayerRow, "id" | "created_at" | "updated_at">>,
        Partial<Omit<PlayerRow, "id" | "pool_id">>
      >;
      matches: TableDefinition<
        MatchRow,
        Omit<MatchRow, "id"> & Partial<Pick<MatchRow, "id">>,
        Partial<Omit<MatchRow, "id" | "pool_id">>
      >;
      predictions: TableDefinition<
        PredictionRow,
        Omit<PredictionRow, "id" | "updated_at"> &
          Partial<Pick<PredictionRow, "id" | "updated_at">>,
        Partial<Omit<PredictionRow, "id" | "pool_id">>
      >;
      match_results: TableDefinition<
        MatchResultRow,
        Omit<MatchResultRow, "id" | "updated_at"> &
          Partial<Pick<MatchResultRow, "id" | "updated_at">>,
        Partial<Omit<MatchResultRow, "id" | "pool_id">>
      >;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
