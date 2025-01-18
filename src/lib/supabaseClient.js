import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://dnamrweqivloiydfroqs.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRuYW1yd2VxaXZsb2l5ZGZyb3FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxODQyMzQsImV4cCI6MjA1Mjc2MDIzNH0.TM5DGGlAbDQjEGYwZ7KMKk7LtCMdmjM-K-PHBC4zyi0";

// In a production extension, do NOT expose sensitive keys!
// For public-anon Supabase keys, it can be acceptable,
// but keep in mind that anything in a client extension is visible to users.

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
