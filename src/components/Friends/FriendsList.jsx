import { useEffect, useState } from "react";
import { fetchFriends } from "../../lib/friendsService";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetchFriends().then(setFriends);
  }, []);

  return (
    <div>
      <ul>
        {friends.map((friend) => (
          <li key={friend.friend_id}>{friend.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
