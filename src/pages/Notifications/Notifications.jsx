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
    //Fetch new notification every minutes
    setTimeout(() => {
      fetchNotifications();
    }, 60000);
  }, []);

  const notificationsFormated = notifications.map((notification) => {
    const { type, seen, title, createdAt, media_url } = notification;

    return (
      <div className={seen ? "seen" : "new"}>
        <div
          style={{
            width: "50px",
            height: "50px",
            background: `url(${media_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        {type === 1 && <div>{title} sent you a friend request!</div>}
        {type === 2 && <div>{title} started following you!</div>}
        {type === 3 && <div>You got mail from {title}!</div>}
        {type === 4 && <div>{title} added a new item to the garderobe.</div>}
        {type === 5 && <div>{title} added a new look to the garderobe.</div>}

        <div> createdAt : {createdAt}</div>
      </div>
    );
  });

  return (
    <div className="notifications__container">
      {isError ? "Error" : isLoading ? "Loading" : notificationsFormated}
    </div>
  );
};
