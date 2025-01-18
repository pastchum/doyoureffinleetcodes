import React from "react";
import FriendsList from "../components/Friends/FriendsList";
import { Link, useNavigate } from "react-router-dom";

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
    </div>
  );
};
export default FriendsPage;
