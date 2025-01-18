import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { fetchSubmissions } from "../fetch/fetchFunctions";

const Dashboard = () => {
  const navigate = useNavigate();

  // track errors to show in the UI
  const [error, setError] = useState(null);

  // store the ENTIRE Supabase user object
  const [user, setUser] = useState(null);

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1) Fetch supabase.user
  async function fetchUser() {
    try {
      // Get the current session and user details
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error from supabase.auth.getUser:", error);
      }
      // If we have a valid user, store the entire user object
      if (data.user) {
        setUser(data.user);
        console.log("Supabase user:", data.user);
      } else {
        // no user, go to /login
        navigate("/login");
      }
    } catch (err) {
      console.error("Supabase fetch user error:", err);
      navigate("/login");
    }
  }

  // 2) Fetch from your LeetCode API
  async function fetchLeetCodeData(username) {
    if (!username) return;
    try {
      setLoading(true);
      setError(null);
      const submissionsList = await fetchSubmissions(username);
      setSubmissions(submissionsList);
    } catch (err) {
      console.error("Failed to fetch LeetCode submissions:", err);
      setError(err.message || "Failed to fetch LeetCode data");
    } finally {
      setLoading(false);
    }
  }

  // On mount, get Supabase user
  useEffect(() => {
    fetchUser();
  }, []);

  // Once user is set, if we have a leetcodeUsername, fetch
  useEffect(() => {
    // user?.user_metadata?.leetcodeUsername -> checks we have user_metadata
    if (user?.user_metadata?.leetcodeUsername) {
      fetchLeetCodeData(user?.user_metadata?.leetcodeUsername);
    }
  }, [user]);

  // If no user, show a fallback
  if (!user) {
    return <div>No user logged in</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading LeetCode submissions...</p>}

      <div>
        <h2>
          User Name: {user.user_metadata?.leetcodeUsername || "(No Username)"}
        </h2>
        <p>LeetCode Count: {submissions?.length || 0}</p>

        <h3>Recent Submissions:</h3>
        <ul>
          {submissions?.map((sub, idx) => (
            <li key={idx}>
              <strong>{sub.title}</strong> – {sub.statusDisplay}
            </li>
          ))}
        </ul>

        <h3>Friends List:</h3>
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
