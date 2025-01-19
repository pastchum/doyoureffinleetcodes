import leetcodeLogo from "../../icons/leetcode.png";

export const getRandomNotification = () => {
  const notifications = [
    {
      title: "Hey there future unemployed fella",
      body: "Do u wanna stay jobless?",
      icon: leetcodeLogo,
    },
    {
      title: "Time to grind loser",
      body: "You gonna be living in yo mamas house at this rate",
      icon: leetcodeLogo,
    },
    {
      title: "Stop being a bum",
      body: "Do some leetcodes before I bang your mum",
      icon: leetcodeLogo,
    },
  ];
  const randomIndex = Math.floor(Math.random() * notifications.length);
  return new Notification(notifications[randomIndex].title, {
    body: notifications[randomIndex].body,
    icon: notifications[randomIndex].icon,
  });
};
export const requestNotificationPermission = () => {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      alert("Notifications enabled! You will receive reminders.");
    } else if (permission === "denied") {
      alert(
        "Notifications are blocked. You can enable them in your browser settings."
      );
    } else {
      alert("Notification permission request was dismissed.");
    }
  });
};

export const notificationTest = () => {
  // Set up interval to send notification every 12 hours
  // const intervalId = setInterval(() => {
  //   if (Notification.permission === "granted") {
  //     new Notification("Reminder", {
  //       body: "Don't forget to complete your LeetCode assignments!",
  //       icon: leetcodeLogo,
  //     });
  //   }
  // }, 12 * 60 * 60 * 1000); // 12 hours in milliseconds

  // Function to generate notifications at specific times
  const generateNotifications = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    console.log(`Current time: ${hours}:${minutes}`);

    if (Notification.permission === "granted") {
    }
  };

  const notificationIntervalId = setInterval(generateNotifications, 60 * 1000); // 1 minute in milliseconds
  return () => clearInterval(notificationIntervalId);
};
