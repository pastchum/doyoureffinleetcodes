import { supabase } from "./supabaseClient";

export const fetchFriends = async () => {
  const { data, error } = await supabase
    .from("friends")
    .select("friend_id, users!friends_friend_id_fkey(name, email)")
    .eq("user_id", supabase.auth.getUser().id);

  if (error) throw new Error("Error fetching friends");
  return data;
};

export const addFriend = async (name) => {
  const { data: friend, error: friendError } = await supabase
    .from("users")
    .select("id")
    .eq("name", name)
    .single();

  if (friendError) throw new Error("Friend not found");

  const { data, error } = await supabase.from("friends").insert({
    user_id: supabase.auth.getUser().id,
    friend_id: friend.id,
  });

  if (error) throw new Error("Error adding friend");
  return data;
};

export const sendReminder = async (friendId, message) => {
  const { data, error } = await supabase.from("reminders").insert({
    sender_id: supabase.auth.getUser().id,
    recipient_id: friendId,
    message,
  });

  if (error) throw new Error("Error sending reminder");
  return data;
};
