import { supabase } from "./supabaseClient";

export const fetchFriends = async () => {
  const { data, error } = await supabase
    .from("friends")
    .select("friend_id, users!friends_friend_id_fkey(username, email)")
    .eq("user_id", supabase.auth.user().id);

  if (error) throw new Error("Error fetching friends");
  return data;
};

export const addFriend = async (email) => {
  const { data: friend, error: friendError } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (friendError) throw new Error("Friend not found");

  const { data, error } = await supabase.from("friends").insert({
    user_id: supabase.auth.user().id,
    friend_id: friend.id,
  });

  if (error) throw new Error("Error adding friend");
  return data;
};

export const sendReminder = async (friendId, message) => {
  const { data, error } = await supabase.from("reminders").insert({
    sender_id: supabase.auth.user().id,
    recipient_id: friendId,
    message,
  });

  if (error) throw new Error("Error sending reminder");
  return data;
};
