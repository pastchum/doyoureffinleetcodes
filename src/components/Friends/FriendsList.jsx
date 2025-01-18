import { useEffect, useState } from "react";
import { fetchFriends } from "../../lib/friendsService";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetchFriends().then(setFriends);
  }, []);

  return (
    <div>
      <h2>Your Friends</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend.friend_id}>{friend.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
