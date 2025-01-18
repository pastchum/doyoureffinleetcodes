import { supabase } from "../../supabaseClient";

export const sendNudge = async (receiverId) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const { data, error } = await supabase.from("nudges").insert({
    sender_id: user.id,
    receiver_id: receiverId,
  });

  if (error) {
    console.error("Error sending nudge:", error.message);
  }

  return data;
};
