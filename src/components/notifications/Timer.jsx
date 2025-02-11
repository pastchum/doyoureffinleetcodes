import React, { useState, useEffect } from "react";
import { getRandomNotification } from "./notifications";

import leetcodeLogo from "../../icons/leetcode.png";

const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [totalMinutes, setTotalMinutes] = useState(0);

  useEffect(() => {
    setTotalMinutes(hours * 60 + minutes);
  }, [minutes, hours]);

  useEffect(() => {
    // Check if chrome.alarms is available
    if (chrome.alarms) {
      chrome.alarms.onAlarm.addListener((alarm) => {
        function sendNotification() {
          if (alarm.name === "timerAlarm") {
            // Show notification when timer is done
            if (chrome.notifications) {
              return getRandomNotification();
            }
          }
        }
        setInterval(sendNotification, totalMinutes * 1000);
      });
    }

    return () => {
      if (chrome.alarms) {
        chrome.alarms.clear("timerAlarm");
      }
    };
  }, []);

  const startTimer = () => {
    if (totalMinutes > 0) {
      chrome.runtime.sendMessage({
        type: "START_TIMER",
        minutes: totalMinutes,
      });
      chrome.alarms.create("timerAlarm", {
        delayInMinutes: totalMinutes,
      });
      setIsActive(true);
    }
  };

  const stopTimer = () => {
    chrome.alarms.clear("timerAlarm");
    chrome.runtime.sendMessage({
      type: "STOP_TIMER",
    });
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
          max="23"
          value={hours}
          onChange={(e) => setHours(parseInt(e.target.value) || 0)}
          disabled={isActive}
          placeholder="Hours"
        />
        <input
          type="number"
          min="0"
          max="59"
          value={minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
          disabled={isActive}
          placeholder="minutes"
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
