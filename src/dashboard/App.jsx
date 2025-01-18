import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { fetchUserData } from "../fetch/fetchFunctions";

const TOTAL_QUESTIONS = 3313;

function getDerogatoryMessage(percentage) {
  // Each bracket is 10%. For example, 0-9 => 0 bracket, 10-19 => 10 bracket, etc.
  // We'll round down by dividing by 10 and flooring
  const bracket = Math.floor(percentage / 10) * 10;
  switch (bracket) {
    case 0:
      return "Bro, just put the fries in the bag.";
    case 10:
      return "Wow, 10%? You call that effort?";
    case 20:
      return "Only 20% done? My grandmother can code better than you...";
    case 30:
      return "Companies would rather pay $20 a month for chatGPT than hire you.";
    case 40:
      return "Barely almost half. Lame...";
    case 50:
      return "Halfway? More like halfway to quitting!";
    case 60:
      return "60%. Mediocre at best.";
    case 70:
      return "70%. Well, it's better than nothing... I guess.";
    case 80:
      return "80%?! You could have done this sooner.";
    case 90:
      return "90%? Are you going to finish or just loaf around?";
    case 100:
      return "Wow, 100%. Finally. About time!";
    default:
      // In case it's > 100 or negative for some reason
      if (percentage > 100) {
        return "_You have some insane over-completion, but you probably cheated!_";
      }
      return "_Keep going...I guess._";
  }
}

const Dashboard = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // We'll store all LeetCode data (including totalSolved, etc.) in one object:
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1) Fetch supabase.user
  async function fetchUser() {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error from supabase.auth.getUser:", error);
      }
      if (data.user) {
        setUser(data.user);
        console.log("Supabase user:", data.user);
      } else {
        // No user => go to /login
        navigate("/login");
      }
    } catch (err) {
      console.error("Supabase fetch user error:", err);
    }
  }

  // 2) Fetch data from your LeetCode API
  async function fetchLeetCodeData(username) {
    if (!username) return;
    try {
      setLoading(true);
      setError(null);
      // This should return the new structure with totalSolved, recentSubmissions, etc.
      const data = await fetchUserData(username);
      setLeetcodeData(data);
    } catch (err) {
      console.error("Failed to fetch LeetCode data:", err);
      setError(err.message || "Failed to fetch LeetCode data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    // user.user_metadata.leetcodeUsername => the LC handle
    const username = user?.user_metadata?.leetcodeUsername;
    if (username) {
      fetchLeetCodeData(username);
    }
  }, [user]);

  if (!user) {
    return <div>No user logged in</div>;
  }

  // Extract data from leetcodeData
  const totalSolved = leetcodeData?.totalSolved ?? 0;
  const recentSubmissions = leetcodeData?.recentSubmissions ?? [];
  const easySolved = leetcodeData?.easySolved ?? 0;
  const mediumSolved = leetcodeData?.mediumSolved ?? 0;
  const hardSolved = leetcodeData?.hardSolved ?? 0;

  // Calculate the progress percentage
  const progressPercentage = Math.round((totalSolved / TOTAL_QUESTIONS) * 100);

  // Get the relevant insult message
  const message = getDerogatoryMessage(progressPercentage);

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading LeetCode data...</p>}

      <div>
        <h2>
          LeetCode Username:{" "}
          {user.user_metadata?.leetcodeUsername || "(No Username)"}
        </h2>

        {/* Show total solved out of 3313 */}
        <p>
          Total Solved: {totalSolved} / {TOTAL_QUESTIONS} ({progressPercentage}
          %)
        </p>

        {/* The progress bar */}
        <div
          style={{
            width: "400px",
            height: "20px",
            backgroundColor: "#eee",
            borderRadius: "10px",
            overflow: "hidden",
            marginBottom: "0.5rem",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progressPercentage}%`,
              backgroundColor: "#2196F3",
              transition: "width 0.5s ease",
            }}
          />
        </div>

        {/* Derogatory message in italics */}
        <p style={{ fontStyle: "italic" }}>{message}</p>

        <div>
          <h3>Problems Solved by Difficulty</h3>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            <li style={{ color: "green" }}>Easy: {easySolved}</li>
            <li style={{ color: "orange" }}>Medium: {mediumSolved}</li>
            <li style={{ color: "red" }}>Hard: {hardSolved}</li>
          </ul>
        </div>

        <div className="recent-submissions-container">
          <h2>Recent Submissions:</h2>
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            {recentSubmissions.map((sub, idx) =>
              idx < 5 ? (
                <li key={idx} className="recent-submission-container">
                  <strong>{sub.title}</strong> – {sub.statusDisplay}
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default App;
