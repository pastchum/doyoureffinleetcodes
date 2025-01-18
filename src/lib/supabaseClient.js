/* eslint-disable no-undef */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Supabase URL and Anonymous Key are required.");
}

// In a production extension, do NOT expose sensitive keys!
// For public-anon Supabase keys, it can be acceptable,
// but keep in mind that anything in a client extension is visible to users.

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
