import { Link } from "react-router-dom";
import leetcodeLogo from "../icons/leetcode.png";
import profileLogo from "../icons/profile.png";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Header({ navigate }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  async function fetchUser() {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  }
  supabase.auth.onAuthStateChange(fetchUser);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "black",
          zIndex: 1000,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          marginRight: 60,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "",
            justifyContent: "flex-start",
            width: "100%",
            paddingTop: "10px",
          }}
        >
          <a
            href="https://leetcode.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={leetcodeLogo}
              className="logo leetcode-logo"
              alt="LeetCode logo"
            />
          </a>
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              color: "white",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                marginLeft: 20,
                justifyContent: "flex-start",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3 style={{ margin: 0, textAlign: "left" }}>Do Your Effin</h3>
              <h2 style={{ margin: 0, textAlign: "left" }}>LEETCODES</h2>
            </div>
          </Link>
        </div>
        {/* Profile icon that toggles the dashboard */}
        <img
          src={profileLogo}
          className="logo profile-logo"
          alt="Profile logo"
          onClick={() => setShowDropdown(!showDropdown)}
          style={{
            cursor: "pointer",
            width: 30,
            height: 30,
            position: "absolute",
            right: 20,
            top: 15,
          }}
        />
        {user && showDropdown && (
          <div
            style={{
              position: "absolute",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              borderRadius: "5px",
              transition: "opacity 0.3s ease",
              opacity: showDropdown ? 1 : 0,
              right: 20,
              top: 50,
              padding: 10,
              backgroundColor: "#333",
            }}
          >
            <ProfileDropDown
              user={user}
              navigate={navigate}
              setShowDropdown={setShowDropdown}
            />
          </div>
        )}
      </div>
    </>
  );
}

function ProfileDropDown({ user, navigate, setShowDropdown }) {
  //navigate to dashboard
  const handleProfileClick = () => {
    navigate("/dashboard");
    setShowDropdown(false);
  };

  // This handles the navigation to the friends screen
  const handleFriendsButtonClick = () => {
    navigate("/friends");
    setShowDropdown(false);
  };

  // handle logout
  const handleLogout = async () => {
    try {
      console.log("logging out");
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error during logout:", error);
      } else {
        navigate("/login");
        setShowDropdown(false);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Profile button */}
      {user != null && (
        <button
          className="button-dropdown button-dropdown:hover"
          onClick={handleProfileClick}
        >
          Profile
        </button>
      )}
      {/* Link to Friends */}
      {user != null && (
        <button
          onClick={handleFriendsButtonClick}
          className="button-dropdown button-dropdown-hover"
        >
          Friends
        </button>
      )}
      {/* Logout button */}
      {user != null && (
        <button
          className="button-dropdown button-dropdown:hover"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </div>
  );
}
