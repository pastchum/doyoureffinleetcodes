import React, { useState, useEffect } from "react";
import { getRandomNotification } from "./notifications";

import leetcodeLogo from "../../icons/leetcode.png";

const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Check if chrome.alarms is available
    if (chrome.alarms) {
      chrome.alarms.onAlarm.addListener((alarm) => {
        if (alarm.name === "timerAlarm") {
          // Show notification when timer is done
          if (chrome.notifications) {
            return getRandomNotification();
          }
        }
      });
    }

    return () => {
      if (chrome.alarms) {
        chrome.alarms.clear("timerAlarm");
      }
    };
  }, []);

  const startTimer = () => {
    const totalMinutes = minutes + seconds / 60;
    if (totalMinutes > 0) {
      chrome.alarms.create("timerAlarm", {
        delayInMinutes: totalMinutes,
      });
      setIsActive(true);
    }
  };

  const stopTimer = () => {
    chrome.alarms.clear("timerAlarm");
    new Notification("Really?", {
      body: "You gonna not finish your leetcodes? Guess you really love being broke",
      icon: leetcodeLogo,
    });
    setIsActive(false);
  };

  return (
    <div className="timer-container">
      <h2>Set Timer</h2>
      <div className="timer-inputs">
        <input
          type="number"
          min="0"
          value={minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
          disabled={isActive}
          placeholder="Minutes"
        />
        <input
          type="number"
          min="0"
          max="59"
          value={seconds}
          onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
          disabled={isActive}
          placeholder="Seconds"
        />
      </div>
      <div className="timer-controls">
        {!isActive ? (
          <button onClick={startTimer}>Start Timer</button>
        ) : (
          <button onClick={stopTimer}>Stop Timer</button>
        )}
      </div>
      {isActive && <p>Timer is running...</p>}
    </div>
  );
};

export default Timer;
