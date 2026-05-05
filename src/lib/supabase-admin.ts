import 'server-only';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable. The admin client cannot be initialized.");
}

/** Server-only admin client (service role, bypasses RLS — never ship to client) */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
