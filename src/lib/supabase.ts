import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/** Browser-safe client (anon key, respects RLS) */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** Server-only admin client (service role, bypasses RLS — never ship to client) */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
