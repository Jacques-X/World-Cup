import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";
import { env } from "@/lib/server/env";

let client: ReturnType<typeof createClient<Database>> | undefined;

export function getSupabaseAdmin() {
  if (!client) {
    const config = env();
    client = createClient<Database>(
      config.NEXT_PUBLIC_SUPABASE_URL,
      config.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );
  }
  return client;
}
