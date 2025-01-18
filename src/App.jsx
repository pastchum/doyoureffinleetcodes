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
import Login from "./login/App";
import FriendsPage from "./pages/FriendsPage";
import AddFriend from "./components/Friends/AddFriend";
import Header from "./components/Header";
import CheckDailyLeetcode from "./components/CheckDailyLeetcode";
import { AuthProvider, useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();
  const navigate = useNavigate();

  //navigate to login if no user
  useEffect(() => {
    if (user == null) {
      navigate("/login");

    }
  }, [user]);

  //navigate to root upon start
  useEffect(() => {
    navigate("/");
    if (user == null) navigate("/login");
  }, []);
  
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
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}