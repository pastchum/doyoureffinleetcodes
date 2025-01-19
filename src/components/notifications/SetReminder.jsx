import { useState } from "react";
import {
  notificationTest,
  requestNotificationPermission,
} from "./notifications";
import Timer from "./Timer";

export default function SetReminder() {
  const [notifsEnabled, setNotifsEnabled] = useState(false);
  const [showTimerPicker, setShowTimerPicker] = useState(false);

  const handlePress = () => {
    setShowTimerPicker(!showTimerPicker);
  };

  return (
    <div>
      {!notifsEnabled ? (
        <button
          className="button-timer"
          onClick={() => {
            requestNotificationPermission();
            setNotifsEnabled(true);
          }}
        >
          Enable Notifications
        </button>
      ) : (
        <div>
          <button className="button-timer" onClick={handlePress}>
            Add timer
          </button>
          {showTimerPicker && <Timer />}
        </div>
      )}
    </div>
  );
}
