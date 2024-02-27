import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "antd";
import {
  CameraOutlined,
  CloseOutlined,
  DeleteFilled,
  LikeOutlined,
  DislikeOutlined,
  UserAddOutlined,
  PictureOutlined,
  SkinOutlined,
  MailOutlined,
} from "@ant-design/icons";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { pageStore } from "../../stores/pageStore/pageStore";
import { userStore } from "../../stores/userStore/userStore";
import { itemsStore } from "../Items/itemsStore";
import { looksStore } from "../Looks/looksStore";
import { postNotificationsSeen } from "./postNotificationsSeen";
import { deleteNotification } from "./deleteNotification";
import { postFollow } from "../Profile/ProfileActions/postFollow";
import { postAcceptRequest } from "../Profile/ProfileActions/postAcceptRequest";

import "./Notifications.less";

dayjs.extend(relativeTime);

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
  };

  const closeNotificationHandlerMobile = (id) => {
    const subContainer = document.getElementById(`subContainer${id}`);
    subContainer.style.display = "none";
    deleteNotification(id);
  };

  const notificationClickHandler = async (type, title, action_data) => {
    // Friend request
    if (type === 1 || type === 17) {
      navigate(`/${title}`);
    }
    // New Follower
    else if (type === 2) {
      navigate(`/${title}`);
    }
    // Friend new avatar
    else if (type === 14) {
      navigate(`/${title}`);
    }
    // New Mail
    else if (type === 3) {
      /* TODO */
    }
    // friends new item
    else if (type === 4) {
      /* TODO */
    }
    // friends new Look
    else if (type === 5) {
      /* TODO */
    }
    // Item liked/disliked, or item shared
    else if (type === 12 || type === 15 || type === 6) {
      if (itemsStore.isLoading === true) {
        await itemsStore.loadItems();
      }
      const selectedItem = itemsStore.items.filter(
        (item) => parseInt(item._id) === action_data,
      );
      itemsStore.setSelectedItem(selectedItem[0]);
      navigate(`/items/`);
    }
    // Look liked || disliked
    else if (type === 13 || type === 16) {
      if (looksStore.isLoading === true) {
        await looksStore.loadLooks();
      }
      const selectedLook = looksStore.looks.filter(
        (look) => parseInt(look._id) === action_data,
      );
      looksStore.setSelectedLook(selectedLook[0]);
      navigate(`/looks/`);
    }
  };

  const showDeleteHandler = (id) => {
    const elementNotification = document.getElementById(`notification${id}`);
    const elementDeleteButtonIcon = document.getElementById(
      `deleteButtonIcon${id}`,
    );
    const newHeight = `${elementNotification.offsetHeight}px`;
    elementDeleteButtonIcon.style.height = newHeight;
    elementDeleteButtonIcon.style.background = "rgba(160, 0, 0, 0.5)";
    elementNotification.style.left = "-50px";
  };

  const hideDeleteHandler = (id) => {
    const element = document.getElementById(`notification${id}`);
    const elementDeleteButtonIcon = document.getElementById(
      `deleteButtonIcon${id}`,
    );
    element.style.left = "0";
    setTimeout(() => {
      elementDeleteButtonIcon.style.background = "transparent";
    }, "300");
  };

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
    const { _id, type, seen, title, createdAt, media_url, action_data } =
      notification;
    const notificationAge = dayjs(createdAt).fromNow();

    const linkToUserPage = (
      <Link to={`/${title}`} onClick={(e) => e.stopPropagation()}>
        {title}
      </Link>
    );

    const isNotFollowed =
      userStore.followed.findIndex(
        (followed) => followed.userName === title,
      ) === -1;

    const isNotFriend =
      userStore.friends.findIndex((friend) => friend.userName === title) === -1;

    const followBackHandler = async (event) => {
      event.stopPropagation();
      try {
        await postFollow(action_data);
        userStore.fetchUserData(false);
        const element = document.getElementById(`followback${_id}`);
        const elementMobile = document.getElementById(`followbackMobile${_id}`);
        element.style.opacity = 0;
        elementMobile.style.opacity = 0;
        setTimeout(() => {
          elementMobile.style.display = "none";
        }, 300);
      } catch (e) {}
    };

    const acceptRequestHandler = async (event) => {
      event.stopPropagation();
      try {
        await postAcceptRequest(action_data);
        userStore.fetchUserData(false);
        const element = document.getElementById(`acceptRequest${_id}`);
        const elementMobile = document.getElementById(
          `acceptRequestMobile${_id}`,
        );
        element.style.opacity = 0;
        elementMobile.style.opacity = 0;
        setTimeout(() => {
          elementMobile.style.display = "none";
        }, 300);
      } catch (e) {}
    };

    return (
      <div className="notification__subContainer" id={`subContainer${_id}`}>
        <div className="notifications__deleteButton">
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
            className={
              seen ? "notifications__leftSideSeen" : "notifications__leftSide"
            }
            onClick={() => notificationClickHandler(type, title, action_data)}
            style={{
              background: `url(${media_url}) center center / cover no-repeat`,
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
              {type === 4 && (
                <>{linkToUserPage} added a new item to the garderobe</>
              )}
              {type === 5 && (
                <>{linkToUserPage} added a new look to the garderobe</>
              )}
              {type === 6 && <>{linkToUserPage} shared an item with you</>}
              {type === 12 && <>{linkToUserPage} liked this Item</>}
              {type === 13 && <>{linkToUserPage} liked this Look</>}
              {type === 14 && <>{linkToUserPage} added a new profile picture</>}
              {type === 15 && <>{linkToUserPage} disliked this Item</>}
              {type === 16 && <>{linkToUserPage} disliked this Look</>}
              {type === 17 && (
                <>{linkToUserPage} accepted your friend request!</>
              )}
              &nbsp;
              <span className="notifications__dateMobile">
                {notificationAge}
              </span>
            </div>
            {!userStore.isLoading &&
              type === 1 &&
              (isNotFriend ? (
                <div className="notification__actionsButtons">
                  <Button
                    type="primary"
                    onClick={(e) => acceptRequestHandler(e)}
                  >
                    Accept
                  </Button>
                </div>
              ) : (
                <div className="notification__actionsButtons">
                  <Button disabled type="primary">
                    Accepted
                  </Button>
                </div>
              ))}
            {!userStore.isLoading &&
              type === 2 &&
              (isNotFollowed ? (
                <div className="notification__actionsButtons">
                  <Button type="primary" onClick={(e) => followBackHandler(e)}>
                    Follow Back
                  </Button>
                </div>
              ) : (
                <div className="notification__actionsButtons">
                  <Button type="primary" disabled>
                    Following back
                  </Button>
                </div>
              ))}
            <div className="notification__icon">
              {type === 3 && <MailOutlined />}
              {(type === 4 || type === 6) && <SkinOutlined />}
              {type === 5 && <CameraOutlined />}
              {type === 12 && <LikeOutlined />}
              {type === 13 && <LikeOutlined />}
              {type === 14 && <PictureOutlined />}
              {type === 15 && <DislikeOutlined />}
              {type === 16 && <UserAddOutlined />}
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
        <div className="notifications__actionsButtonsMobile">
          {!userStore.isLoading && type === 1 && isNotFriend && (
            <div
              className="notification__actionsButtons"
              id={`acceptRequestMobile${_id}`}
            >
              <Button
                className="actionsButton"
                type="primary"
                block={true}
                onClick={(e) => acceptRequestHandler(e)}
              >
                Accept
              </Button>
            </div>
          )}
          {!userStore.isLoading && type === 2 && isNotFollowed && (
            <div
              className="notification__actionsButtons"
              id={`followbackMobile${_id}`}
            >
              <Button
                className="actionsButton"
                type="primary"
                block={true}
                onClick={(e) => followBackHandler(e)}
              >
                Follow Back
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  });

  return (
    <div className="notifications__container">
      {pageStore.notifications.length === 0 ? (
        <div className="notification__nothing">No notification for now</div>
      ) : (
        notificationsFormated
      )}
    </div>
  );
});
