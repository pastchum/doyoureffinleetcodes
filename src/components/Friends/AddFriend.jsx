import { useState } from "react";
import { addFriend } from "../../lib/friendsService";

const AddFriend = () => {
  const [username, setUsername] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleAddFriend = async (e) => {
    e.preventDefault();
    try {
      await addFriend(username);
      setStatusMessage(`Friend with username ${username} added successfully!`);
      setUsername(""); // Reset input field
    } catch (error) {
      setStatusMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Add a Friend</h2>
      <form onSubmit={handleAddFriend}>
        <input
          type="username"
          placeholder="Enter friend's username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Add Friend</button>
      </form>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default AddFriend;
