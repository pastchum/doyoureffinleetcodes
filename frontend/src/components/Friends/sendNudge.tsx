import { supabase } from "../../lib/supabaseClient";

export const sendNudge = async (receiverId) => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  const { data, error: nudgeError } = await supabase.from("nudges").insert({
    sender_id: user.id,
    receiver_id: receiverId,
  });

  if (nudgeError) {
    console.error("Error sending nudge:", nudgeError.message);
  }

  return data;
};
