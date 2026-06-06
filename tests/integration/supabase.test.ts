import { createClient } from "@supabase/supabase-js";
import { describe, expect, it } from "vitest";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const run = url && key ? describe : describe.skip;

run("Supabase migration", () => {
  it("contains the seeded pool, five players, and 72 matches", async () => {
    const client = createClient(url!, key!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const [pool, players, matches] = await Promise.all([
      client
        .from("pools")
        .select("id")
        .eq("id", "00000000-0000-4000-8000-000000000001")
        .single(),
      client.from("players").select("id", { count: "exact", head: true }),
      client.from("matches").select("id", { count: "exact", head: true }),
    ]);

    expect(pool.error).toBeNull();
    expect(players.count).toBe(5);
    expect(matches.count).toBe(72);
  });
});
