import { supabase } from "./lib/supabaseClient.js";

chrome.runtime.onInstalled.addListener(async () => {
  console.log("Extension installed. Fetching data from Supabase...");
  const { data, error } = await supabase.auth.getUser();
  console.log("Data:", data, "Error:", error);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "START_TIMER") {
    // Enable rule
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [1],
      addRules: [
        {
          id: 1,
          priority: 1,
          action: {
            type: "redirect",
            redirect: {
              url: "https://leetcode.com",
            },
          },
          condition: {
            urlFilter: "*",
            resourceTypes: ["main_frame"],
            excludedDomains: [
              "leetcode.com",
              "https://github.com/login/",
              "https://accounts.google.com/o/oauth2",
              "https://www.facebook.com/login.php",
              "https://www.linkedin.com/uas/login",
            ],
          },
        },
      ],
    });
  }
  if (message.type === "STOP_TIMER") {
    // Disable rule
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [1],
      addRules: [],
    });
  }
});
