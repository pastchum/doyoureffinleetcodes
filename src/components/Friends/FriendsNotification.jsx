import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const FriendsNotification = () => {
  const [activeNudges, setActiveNudges] = useState([]);

  // Poll the backend for active nudges every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const { data: user, error: authError } = await supabase.auth.getUser();
      if (!user) {
        console.error("No user found");
        return;
      }

      const { data: nudges, error: nudgesError } = await supabase
        .from("nudges")
        .select("*")
        .eq("receiver_id", user.id)
        .eq("is_active", true);

      if (nudgesError) {
        console.error("Error fetching nudges:", nudgesError.message);
      } else {
        setActiveNudges(nudges || []);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleCancelNudge = async (nudgeId) => {
    await supabase
      .from("nudges")
      .update({ is_active: false })
      .eq("id", nudgeId);

    setActiveNudges((nudges) => nudges.filter((nudge) => nudge.id !== nudgeId));
  };

  return (
    <div>
      {activeNudges.map((nudge) => (
        <div
          key={nudge.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>Quack! </p>
          <button onClick={() => handleCancelNudge(nudge.id)}>Cancel</button>
        </div>
      ))}
    </div>
  );
};

export default FriendsNotification;
