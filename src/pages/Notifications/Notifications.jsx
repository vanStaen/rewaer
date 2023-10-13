import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import * as dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { CloseOutlined } from '@ant-design/icons';
dayjs.extend(relativeTime)

import { pageStore } from "../../stores/pageStore/pageStore";
import { postNotificationsSeen } from "./postNotificationsSeen";
import { deleteNotification } from "./deleteNotification";

import "./Notifications.less";

export const Notifications = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    postNotificationsSeen();
    pageStore.setUnseenNotificationsCount(0);
  }, []);

  const closeNotificationHandler = (id) => {
    const element = document.getElementById(`notification${id}`);
    element.style.left = "100vw";
    setTimeout(() => {
      element.style.display = "none";
      deleteNotification(id);
    }, 300);
  }

  const notificationClickHandlerRedirectToProfile = (username) => {
    navigate(`/${username}`);
  }

  const notificationsFormated = pageStore.notifications.map((notification) => {
    const { _id, type, seen, title, createdAt, media_url } = notification;
    const notificationAge = dayjs(createdAt).fromNow();

    return (
      <div
        className={`notifications__notification ${seen ? "seen" : "new"}`}
        id={`notification${_id}`}
      >
        <div
          className="notifications__leftSide"
          onClick={() => notificationClickHandlerRedirectToProfile(title)}
          style={{
            background: `url(${media_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div
          className="notifications__rightSide"
          onClick={() => notificationClickHandlerRedirectToProfile(title)}
        >
          <div className="notification__title">
            {type === 1 && `${title} sent you a friend request!`}
            {type === 2 && `${title} started following you!`}
            {type === 3 && `You got mail from ${title}!`}
            {type === 4 && `${title} added a new item to the garderobe`}
            {type === 5 && `${title} added a new look to the garderobe`}
          </div>
          <div className="notifications__date"> {notificationAge}</div>
        </div>
        <div
          className="closeDelete"
          onClick={() => closeNotificationHandler(_id)}
        >
          <CloseOutlined />
        </div>
      </div>
    );
  });

  return (
    <div className="notifications__container">
      {pageStore.notifications.length === 0
        ? <div className="notification__nothing">
          No notification for now
        </div>
        : notificationsFormated}
    </div>
  );
});
