import React, { useEffect, useState } from "react";

import "./Notifications.css";
import { getNotifications } from "./getNotifications";

export const Notifications = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const result = await getNotifications();
      setNotifications(result);
    } catch (e) {
      console.log("error", e);
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    console.log("notifications", notifications);
  }, [notifications]);

  const notificationsFormated = notifications.map((notification) => {
    const type = notification.type;

    return (
      <div>
        <div
          style={{
            width: "50px",
            height: "50px",
            background: `url(${notification.media_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        {type === 1 && (
          <div>{notification.title} sent you a friend request!</div>
        )}
        {type === 2 && <div>{notification.title} started following you!</div>}
        {type === 3 && <div>You got mail from {notification.title}!</div>}
        {type === 4 && (
          <div>{notification.title} added a new item to the garderobe.</div>
        )}
        {type === 5 && (
          <div>{notification.title} added a new look to the garderobe.</div>
        )}

        <div> createdAt : {notification.createdAt}</div>
      </div>
    );
  });

  return (
    <div className="notifications__container">
      {isError ? "Error" : isLoading ? "Loading" : notificationsFormated}
    </div>
  );
};
