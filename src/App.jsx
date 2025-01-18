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
