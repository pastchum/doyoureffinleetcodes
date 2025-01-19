import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { fetchUserData } from "../fetch/fetchFunctions";
import { useAuth } from "../context/AuthContext";

const TOTAL_QUESTIONS = 3313;

function getDerogatoryMessage(percentage) {
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
      if (percentage > 100) {
        return "_You have some insane over-completion, but you probably cheated!_";
      }
      return "_Keep going...I guess._";
  }
}

const Dashboard = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch LeetCode data
  async function fetchLeetCodeData(username) {
    if (!username) return;
    try {
      setLoading(true);
      setError(null);
      const data = await fetchUserData(username); // Fetch user data
      setLeetcodeData(data);
    } catch (err) {
      console.error("Failed to fetch LeetCode data:", err);
      setError(err.message || "Failed to fetch LeetCode data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const username = user?.user_metadata?.leetcodeUsername;
    if (username) {
      fetchLeetCodeData(username);
    }
  }, [user]);

  // Refresh function to re-fetch data
  const handleRefresh = () => {
    const username = user?.user_metadata?.leetcodeUsername;
    if (username) {
      fetchLeetCodeData(username);
    }
  };

  if (!user) {
    return <div>No user logged in</div>;
  }

  const totalSolved = leetcodeData?.totalSolved ?? 0;
  const recentSubmissions = leetcodeData?.recentSubmissions ?? [];
  const easySolved = leetcodeData?.easySolved ?? 0;
  const mediumSolved = leetcodeData?.mediumSolved ?? 0;
  const hardSolved = leetcodeData?.hardSolved ?? 0;
  const progressPercentage = Math.round((totalSolved / TOTAL_QUESTIONS) * 100);
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

        <p>
          Total Solved: {totalSolved} / {TOTAL_QUESTIONS} ({progressPercentage}
          %)
        </p>

        {/* Progress Bar */}
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

        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default Dashboard;