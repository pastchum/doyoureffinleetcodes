import { useEffect, useState } from "react";
import { fetchFriends } from "../../lib/friendsService";
import { sendNudge } from "./SendNudge";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetchFriends().then(setFriends);
  }, []);

  const handleNudge = async (receiverId) => {
    await sendNudge(receiverId);
    alert("Nudge sent!"); // Feedback to the sender
  };

  return (
    <div style={{ margin: "20px" }}>
      {friends.map((friend) => (
        <div
          key={friend.friend_id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "15px", // Space between rows
          }}
        >
          <span style={{ fontSize: "18px" }}>{friend.name}</span>
          <button
            onClick={() => handleNudge(friend.friend_id)}
            style={{
              marginLeft: "10px",
              backgroundColor: "#ffcc00",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Quack
          </button>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
