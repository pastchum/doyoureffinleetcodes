import { useState, useEffect } from "react";
import { fetchFriends, sendReminder } from "../../lib/friendsService";

const SendReminder = () => {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState("");
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // Fetch friends when component mounts
  useEffect(() => {
    const loadFriends = async () => {
      try {
        const friendsList = await fetchFriends();
        setFriends(friendsList);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    loadFriends();
  }, []);

  const handleSendReminder = async (e) => {
    e.preventDefault();
    if (!selectedFriend || !message) {
      setStatusMessage("Please select a friend and enter a message.");
      return;
    }
    try {
      await sendReminder(selectedFriend, message);
      setStatusMessage(`Reminder sent to ${selectedFriend}!`);
      setMessage("");
    } catch (error) {
      setStatusMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Send a Reminder</h2>
      <form onSubmit={handleSendReminder}>
        <select
          value={selectedFriend}
          onChange={(e) => setSelectedFriend(e.target.value)}
          required
        >
          <option value="">Select a friend</option>
          {friends.map((friend) => (
            <option key={friend.friend_id} value={friend.friend_id}>
              {friend.users.username} ({friend.users.email})
            </option>
          ))}
        </select>
        <textarea
          placeholder="Enter your reminder message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Send Reminder</button>
      </form>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default SendReminder;
