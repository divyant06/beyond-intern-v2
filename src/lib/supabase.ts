import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/** Browser-safe client (anon key, respects RLS) */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
