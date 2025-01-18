import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// In a production extension, do NOT expose sensitive keys!
// For public-anon Supabase keys, it can be acceptable,
// but keep in mind that anything in a client extension is visible to users.

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
