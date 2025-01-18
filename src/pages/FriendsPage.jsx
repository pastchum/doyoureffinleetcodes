import FriendsList from "../components/Friends/FriendsList";
import AddFriendForm from "../components/Friends/AddFriend";
import SendReminder from "../components/Friends/SendReminder";

const FriendsPage = () => (
  <div>
    <h1>Friends Feature</h1>
    <AddFriendForm />
    <FriendsList />
    <SendReminder />
  </div>
);

export default FriendsPage;
