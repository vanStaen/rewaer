import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import * as dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { CloseOutlined, DeleteFilled } from '@ant-design/icons';
dayjs.extend(relativeTime)

import { pageStore } from "../../stores/pageStore/pageStore";
import { postNotificationsSeen } from "./postNotificationsSeen";
import { deleteNotification } from "./deleteNotification";

import "./Notifications.less";

// the required distance between touchStart and touchEnd to be detected as a swipe
const MIN_SWIPE_DISTANCE = 20;

export const Notifications = observer(() => {
  const navigate = useNavigate();
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const throttling = useRef(false);

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

  const closeNotificationHandlerMobile = (id) => {
    const elementNotification = document.getElementById(`notification${id}`);
    const elementDeleteButton = document.getElementById(`deleteButton${id}`);
    elementNotification.style.display = "none";
    elementDeleteButton.style.display = "none";
    deleteNotification(id);
  }

  const notificationClickHandlerRedirectToProfile = (username) => {
    navigate(`/${username}`);
  }

  const showDeleteHandler = (id) => {
    const elementNotification = document.getElementById(`notification${id}`);
    const elementDeleteButtonIcon = document.getElementById(`deleteButtonIcon${id}`);
    const newHeight = `${elementNotification.offsetHeight}px`;
    elementDeleteButtonIcon.style.height = newHeight;
    elementNotification.style.left = "-50px";
  }

  const hideDeleteHandler = (id) => {
    const element = document.getElementById(`notification${id}`);
    element.style.left = "0";
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (id) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;
    if (throttling.current === false) {
      throttling.current = true;
      if (isRightSwipe) {
        hideDeleteHandler(id);
      } else if (isLeftSwipe) {
        showDeleteHandler(id);
      }
      setTimeout(() => {
        throttling.current = false;
      }, 500);
    }
  };

  const notificationsFormated = pageStore.notifications.map((notification) => {
    const { _id, type, seen, title, createdAt, media_url } = notification;
    const notificationAge = dayjs(createdAt).fromNow();

    return (
      <>
        <div className="notifications__deleteButton" id={`deleteButton${_id}`}>
          <div
            className="icon"
            onClick={() => closeNotificationHandlerMobile(_id)}
            id={`deleteButtonIcon${_id}`}
          >
            <DeleteFilled />
          </div>
        </div>
        <div
          className={`notifications__notification ${seen ? "seen" : "new"}`}
          id={`notification${_id}`}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={() => onTouchEnd(_id)}
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
      </>
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
