import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import leetcodeLogo from "./icons/leetcode.png";
import profileLogo from "./icons/profile.png";
import "./App.css";
import Dashboard from "./dashboard/App";
import { supabase } from "./lib/supabaseClient";
import Login from "./login/App";
import FriendsPage from "./pages/FriendsPage";

function App() {
  const [user, setUser] = useState(null);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const navigate = useNavigate();

  const requestNotificationPermission = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        alert("Notifications enabled! You will receive reminders.");
      } else if (permission === "denied") {
        alert("Notifications are blocked. You can enable them in your browser settings.");
      } else {
        alert("Notification permission request was dismissed.");
      }
    });
  };

  useEffect(() => {
    // Set up interval to send notification every 12 hours
    // const intervalId = setInterval(() => {
    //   if (Notification.permission === "granted") {
    //     new Notification("Reminder", {
    //       body: "Don't forget to complete your LeetCode assignments!",
    //       icon: leetcodeLogo,
    //     });
    //   }
    // }, 12 * 60 * 60 * 1000); // 12 hours in milliseconds

    // Function to generate notifications at specific times
    const generateNotifications = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      console.log(`Current time: ${hours}:${minutes}`);

      if ((hours === 1 && minutes === 47)) {
      if (Notification.permission === "granted") {
        new Notification("Scheduled Reminder", {
        body: "Do u wanna stay jobless?",
        icon: leetcodeLogo,
        });
      }
      }
    };

    const notificationIntervalId = setInterval(generateNotifications, 60 * 1000); // 1 minute in milliseconds
    return () => clearInterval(notificationIntervalId);
    return () => clearInterval(intervalId);
  }, []);

  // This toggles between showing the dashboard and going back to home
  const handleProfileClick = () => {
    if (!isDashboardOpen) {
      // If the dashboard is currently closed, open it
      navigate("/dashboard");
    } else {
      // If the dashboard is open, go back to home
      navigate("/");
    }
    setIsDashboardOpen((prev) => !prev);
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
      {/* Button to explicitly request notification permission */}
      <button className="notification-button" onClick={requestNotificationPermission}>
        Enable Notifications
      </button>

      {/* Link to external LeetCode site */}
      <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer">
        <img
          src={leetcodeLogo}
          className="logo leetcode-logo"
          alt="LeetCode logo"
        />
      </a>

      {/* Profile icon that toggles the dashboard */}
      <img
        src={profileLogo}
        className="logo profile-logo"
        alt="Profile logo"
        onClick={handleProfileClick}
        style={{ cursor: "pointer" }}
      />

      {/* Logout button */}
      {user && (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}

      {/* Link to Friends */}
      {user && (
        <Link to="/friends" className="friends-link">
          Friends
        </Link>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/friends" element={<FriendsPage />} />
      </Routes>
    </div>
  );
}

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Leetcode NOW</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
      </div>
      <p className="read-the-docs">Click on the LeetCode logo to learn more</p>
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