import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { apiError, assertSameOrigin, requireAdmin } from "@/lib/server/http";
import { POOL_ID } from "@/lib/server/pool";
import { getSupabaseAdmin } from "@/lib/server/supabase";

const schema = z.object({ name: z.string().trim().min(1).max(40) });

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    assertSameOrigin(request);
    await requireAdmin();
    const { id } = await context.params;
    const body = schema.parse(await request.json());
    const { data, error } = await getSupabaseAdmin()
      .from("players")
      .update({ name: body.name, updated_at: new Date().toISOString() })
      .eq("pool_id", POOL_ID)
      .eq("id", id)
      .select("id,slot,name,color")
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return apiError(error);
  }
}
