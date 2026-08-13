import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

function getSupabaseClient() {
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Supabase public credentials are not configured.");
  }
  client = createClient(url, key);
  return client;
}

/** Browser-safe client (anon key, respects RLS), initialized on first use. */
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, property) {
    return Reflect.get(getSupabaseClient(), property);
  },
});
