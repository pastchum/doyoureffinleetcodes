import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Dashboard from "./dashboard/App";
import { supabase } from "./lib/supabaseClient";
import Login from "./login/App";
import FriendsPage from "./pages/FriendsPage";
import AddFriend from "./components/Friends/AddFriend";
import Header from "./components/Header";

function App() {
  const [user, setUser] = useState(null);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const navigate = useNavigate();

  // This toggles between showing the dashboard and going back to home
  const handleProfileClick = () => {
    if (user !== null) {
      if (!isDashboardOpen) {
        // If the dashboard is currently closed, open it
        navigate("/dashboard");
      } else {
        // If the dashboard is open, go back to home
        navigate("/");
      }
      setIsDashboardOpen((prev) => !prev);
    }
  };

  // This handles the navigation to the friends screen
  const handleFriendsButtonClick = () => {
    navigate("/friends");
  };

  async function fetchUser() {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error(error);
      }
      if (data.user && data.user !== user) {
        setUser(data.user);
        console.log(data.user);
        navigate("/");
      } else if (!data.user) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Supabase fetch user error:", err);
    }
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error during logout:", error);
      } else {
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Header handleProfileClick={handleProfileClick} />

      <div style={{ marginTop: "100px" }}>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          {/* Logout button */}
          {user && (
            <button className="button button:hover" onClick={handleLogout}>
              Logout
            </button>
          )}
          {/* Link to Friends */}
          {user && (
            <button
              onClick={handleFriendsButtonClick}
              className="button button-hover"
            >
              Friends
            </button>
          )}
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/add-friend" element={<AddFriend />} />
        </Routes>
      </div>
    </div>
  );
}

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Leetcode NOW</h1>
      <div className="card"></div>
      <p className="read-the-docs">Hurry up and do your leetcodes you bum</p>
    </>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
