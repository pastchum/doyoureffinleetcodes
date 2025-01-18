import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  async function fetchUser() {
    try {
      // Get the current session and user details
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
        navigate("/login");
        return;
      }

      if (session?.user) {
        setUser(session.user.user_metadata || {});
        console.log("User metadata:", session.user.user_metadata);
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Supabase fetch user error:", err);
      navigate("/login");
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return user ? (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Name: {user.name || "Anonymous"}</h2>
        <p>LeetCode Count: 0</p>
      </div>
    </div>
  ) : (
    <div>No user logged in</div>
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
