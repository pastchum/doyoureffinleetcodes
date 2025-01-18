import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  async function fetchUser() {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error(error);
      }
      if (data.user && data.user !== user) {
        setUser(data.user.user_metadata);
        console.log(data.user);
      } else if (!data.user) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Supabase fetch user error:", err);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return user ? (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>User Name: {user.leetcodeUsername}</h2>
        <p>LeetCode Count: 0</p>
        <h3>Friends List:</h3>
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
