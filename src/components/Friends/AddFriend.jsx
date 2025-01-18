import { useState } from "react";
import { addFriend } from "../../lib/friendsService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddFriend = () => {
  const [name, setName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleAddFriend = async (e) => {
    e.preventDefault();
    try {
      await addFriend(name);
      setStatusMessage(`Friend with name ${name} added successfully!`);
      setName(""); // Reset input field
    } catch (error) {
      setStatusMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Add Friend</h2>
      <form onSubmit={handleAddFriend}>
        <input
          type="name"
          placeholder="Enter friend's name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" className="add-friend-button">
          Add
        </button>
      </form>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default AddFriend;
