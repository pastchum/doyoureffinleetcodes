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
import CheckDailyLeetcode from "./components/CheckDailyLeetcode";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // This toggles between showing the dashboard and going back to home

  async function fetchUser() {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error(error);
      }
      if (data?.user && data?.user !== user) {
        setUser(data.user);
        console.log(data.user);
      } else if (!data.user) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Supabase fetch user error:", err);
    }
  }

  //fetch user with each navigation
  supabase.auth.onAuthStateChange(fetchUser);

  useEffect(() => navigate("/login"), []);

  return (
    <div>
      <Header navigate={navigate} />

      <div style={{ marginTop: "100px" }}>
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
  return (
    <>
      <div className="card">
        <CheckDailyLeetcode />
      </div>
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
