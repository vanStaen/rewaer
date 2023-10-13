import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import { pageStore } from "../../stores/pageStore/pageStore";
import { profileStore } from "../../stores/profileStore/profileStore";
import { postNotificationsSeen } from "./postNotificationsSeen";

import "./Notifications.less";

export const Notifications = observer(() => {
  useEffect(() => {
    postNotificationsSeen();
    pageStore.setUnseenNotificationsCount(0);
  }, []);

  const notificationsFormated = pageStore.notifications.map((notification) => {
    const { type, seen, title, createdAt, media_url } = notification;
    return (
      <Link
        to={`/${title}`}
        onClick={() => {
          profileStore.fetchProfileData(title);
        }}
      >
        <div className={`notifications__notification ${seen ? "seen" : "new"}`}>
          <div
            className="notifications__leftSide"
            style={{
              background: `url(${media_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="notifications__rightSide">
            <div className="notification__title">
              {type === 1 && `${title} sent you a friend request!`}
              {type === 2 && `${title} started following you!`}
              {type === 3 && `You got mail from ${title}!`}
              {type === 4 && `${title} added a new item to the garderobe`}
              {type === 5 && `${title} added a new look to the garderobe`}
            </div>
            <div className="notifications__date"> {createdAt}</div>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div className="notifications__container">
      {pageStore.notifications.length === 0
        ? "nothing here yet"
        : notificationsFormated}
    </div>
  );
});
