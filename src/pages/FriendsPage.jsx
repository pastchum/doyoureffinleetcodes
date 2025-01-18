import React from "react";
import FriendsList from "../components/Friends/FriendsList";
import { Link, useNavigate } from "react-router-dom";
import FriendsNotification from "../components/Friends/FriendsNotification";

const FriendsPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: "10px",
        }}
      >
        Friends
      </h1>
      <button
        className="logout-button"
        onClick={() => navigate("/add-friend")}
        style={{ cursor: "pointer", marginRight: "5px" }}
      >
        Add Friend
      </button>
      <FriendsList />
      <FriendsNotification />
    </div>
  );
};
export default FriendsPage;
