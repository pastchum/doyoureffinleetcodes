import { supabase } from "../lib/supabaseClient";
import { useState, useEffect } from "react";
import { fetchSubmissions } from "../fetch/fetchFunctions";

export default function CheckDailyLeetcode() {
  const [user, setUser] = useState(null);
  const [dailyDone, setDailyDone] = useState(false);

  // Loading for fetch
  const [loading, setLoading] = useState(false);

  // Get user
  useEffect(() => {
    async function fetchUser() {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (data?.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, []);

  // Check for daily and update the state
  useEffect(() => {
    async function CheckDaily() {
      if (user == null) {
        setDailyDone(false);
        return;
      }
      setLoading(true);
      try {
        const recentSubmissions = await fetchSubmissions(
          user?.leetcodeUsername
        );
        const today = Math.floor(new Date().getTime() / 1000);
        const dailySubmission = recentSubmissions.some(
          (submission) =>
            submission.timestamp === today &&
            submission.statusDisplay == "Accepted"
        );
        setDailyDone(dailySubmission);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (user) {
      CheckDaily();
    }
  }, []);

  return user ? (
    <div>
      {loading ? (
        <div style={{ fontSize: "2rem" }}>Loading...</div>
      ) : (
        <div>
          {dailyDone ? (
            <div style={{ marginBottom: "20px" }}>
              <h2
                style={{
                  justifyContent: "space-between",
                  fontSize: "1rem",
                  margin: "0",
                }}
              >
                DO MORE
              </h2>
              <h1 style={{ fontSize: "2rem", margin: "0" }}>LEETCODES</h1>
            </div>
          ) : (
            <div style={{ marginBottom: "20px" }}>
              <h2 style={{ fontSize: "2rem", margin: "0" }}>DO YOUR DAILY</h2>
              <h1 style={{ fontSize: "3rem", margin: "0" }}>LEETCODE</h1>
            </div>
          )}
          <div className="daily-check-container">
            <h2 style={{ fontSize: "1rem", margin: "0" }}>
              Today's Daily Leetcode:
            </h2>
            {dailyDone ? (
              <>
                <h2 style={{ color: "green", fontSize: "2rem", margin: "0" }}>
                  Completed
                </h2>
                <h3
                  className="read-the-docs"
                  style={{ fontSize: "0.5rem", margin: "0" }}
                >
                  Good work. There's a chance you won't be jobless
                </h3>
              </>
            ) : (
              <>
                <h1 style={{ color: "red", fontSize: "3rem", margin: "0" }}>
                  NOT DONE
                </h1>
                <h3 style={{ color: "#AAA", fontSize: "0.5rem", margin: "0" }}>
                  You ain't getting a job at this rate
                </h3>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  ) : null;
}
