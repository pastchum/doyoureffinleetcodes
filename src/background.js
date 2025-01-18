import { supabase } from "./lib/supabaseClient.js";

chrome.runtime.onInstalled.addListener(async () => {
  console.log("Extension installed. Fetching data from Supabase...");
  const { data, error } = await supabase.auth.getUser();
  console.log("Data:", data, "Error:", error);
});
