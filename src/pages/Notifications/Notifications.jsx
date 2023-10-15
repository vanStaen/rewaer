import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CloseOutlined, DeleteFilled } from '@ant-design/icons';
import * as dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

import { pageStore } from "../../stores/pageStore/pageStore";
import { postNotificationsSeen } from "./postNotificationsSeen";
import { deleteNotification } from "./deleteNotification";

import "./Notifications.less";

dayjs.extend(relativeTime)

// the required distance between touchStart and touchEnd to be detected as a swipe
const MIN_SWIPE_DISTANCE = 20;

export const Notifications = observer(() => {
  const navigate = useNavigate();
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const throttling = useRef(false);

  useEffect(() => {
    //postNotificationsSeen();
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

  const notificationClickHandler = (type, title, action_data) => {
    if (type === 1) { navigate(`/${title}`) } //Friend request
    else if (type === 2) { navigate(`/${title}`) } //New Follower
    else if (type === 14) { navigate(`/${title}`) } //Friend new avatar
    else if (type === 3) { /*TODO*/ } //New Mail
    else if (type === 4) { /*TODO*/ } //friends new item
    else if (type === 5) { /*TODO*/ } //friends new Look
    else if (type === 12) { navigate(`/item/${action_data}`) } //Item liked
    else if (type === 15) { navigate(`/item/${action_data}`) } //Item disliked
    else if (type === 13) { navigate(`/look/${action_data}`) } //Look liked
    else if (type === 16) { navigate(`/look/${action_data}`) } //Look disliked
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
    const { _id, type, seen, title, createdAt, media_url, action_data } = notification;
    const notificationAge = dayjs(createdAt).fromNow();

    const linkToUserPage = <Link to={`/${title}`}>{title}</Link>

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
            className={seen ? "notifications__leftSideSeen" : "notifications__leftSide"}
            onClick={() => notificationClickHandler(type, title, action_data)}
            style={{
              background: `url(${media_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div
            className="notifications__rightSide"
            onClick={() => notificationClickHandler(type, title, action_data)}
          >
            <div className="notification__title">
              {type === 1 && <>{linkToUserPage} sent you a friend request!</>}
              {type === 2 && <>{linkToUserPage} started following you!</>}
              {type === 3 && <>You got mail from ${linkToUserPage}!</>}
              {type === 4 && <>{linkToUserPage} added a new item to the garderobe</>}
              {type === 5 && <>{linkToUserPage} added a new look to the garderobe</>}
              {type === 12 && <>{linkToUserPage} liked this Item</>}
              {type === 13 && <>{linkToUserPage} liked this Look</>}
              {type === 14 && <>{linkToUserPage} added a new profile picture</>}
              {type === 15 && <>{linkToUserPage} disliked this Item</>}
              {type === 16 && <>{linkToUserPage} disliked this Look</>}
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
