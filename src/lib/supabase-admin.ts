import 'server-only';
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabaseAdmin() {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Supabase admin credentials are not configured.");
  }

  client = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return client;
}

/** Backwards-compatible lazy admin client for server-only operations. */
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, property) {
    return Reflect.get(getSupabaseAdmin(), property);
  },
});
