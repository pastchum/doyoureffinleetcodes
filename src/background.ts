import { supabase } from './lib/supabaseClient'

chrome.runtime.onInstalled.addListener(async () => {
  console.log('Extension installed. Fetching data from Supabase...')
  const { data, error } = await supabase.from('my_table').select('*')
  console.log('Data:', data, 'Error:', error)
})

const ALLOWED_DOMAIN = "https://leetcode.com"

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const url = details.url;

    // If the request is NOT to the allowed domain, we redirect:
    if (!url.startsWith(ALLOWED_DOMAIN)) {
      return { redirectUrl: ALLOWED_DOMAIN };
    }

    // Otherwise, do nothing (allow the request).
    return {};
  },
  { urls: ["<all_urls>"] }, // Listen for all URLs
  ["blocking"] // We need the blocking option to redirect
);