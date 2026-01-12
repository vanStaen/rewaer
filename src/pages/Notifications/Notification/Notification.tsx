import React, {
  useEffect,
  useState,
  useRef,
  TouchEvent,
  MouseEvent,
} from "react";
import { CloseOutlined, DeleteFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { postFollow } from "@pages/Profile/ProfileActions/postFollow";
import { postAcceptRequest } from "@pages/Profile/ProfileActions/postAcceptRequest";
import { userStore } from "@stores/userStore/userStore.js";
import { itemsStore } from "@pages/Items/itemsStore";
import { looksStore } from "@pages/Looks/looksStore";
import { useMediaUrl } from "@hooks/useMediaUrl";
import { authStore } from "@stores/authStore/authStore.js";
import { deleteNotification } from "./deleteNotification";
import { NotificationMessage } from "./NotificationMessage";
import { NotificationActions } from "./NotificationActions";
import { getNotificationIcon } from "./notificationIcons";
import { getNotificationBucket } from "./notificationUtils";

import "../Notifications.less";

dayjs.extend(relativeTime);

// the required distance between touchStart and touchEnd to be detected as a swipe
const MIN_SWIPE_DISTANCE = 20;

interface NotificationData {
  id: string;
  type: number;
  seen: boolean;
  title: string;
  createdAt: string;
  mediaUrl: string;
  actionData: number;
}

interface NotificationProps {
  data: NotificationData;
}

export const Notification: React.FC<NotificationProps> = ({ data }) => {
  const navigate = useNavigate();
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const throttling = useRef<boolean>(false);

  const { id, type, seen, title, createdAt, mediaUrl, actionData } = data;
  const notificationAge = dayjs(createdAt).fromNow();

  useEffect(() => {
    if (authStore.hasAccess === false && !authStore.isCheckingAccess) {
      window.location.href = "../";
    }
  }, [authStore.hasAccess]);

  const [mediaS3Url, mediaLoading, mediaError] = useMediaUrl(
    mediaUrl,
    getNotificationBucket(data.type),
    "t",
  );

  const closeNotificationHandler = (id: string): void => {
    const element = document.getElementById(`notification${id}`);
    if (element) {
      element.style.left = "100vw";
      setTimeout(() => {
        element.style.display = "none";
        deleteNotification(id);
      }, 300);
    }
  };

  const closeNotificationHandlerMobile = (id: string): void => {
    const subContainer = document.getElementById(`subContainer${id}`);
    if (subContainer) {
      subContainer.style.display = "none";
      deleteNotification(id);
    }
  };

  const handleNotificationClick = async (): Promise<void> => {
    // Navigate to user profile
    if (type === 1 || type === 2 || type === 14 || type === 17) {
      navigate(`/${title}`);
      return;
    }

    // Navigate to item
    if (type === 12 || type === 15 || type === 6) {
      if (itemsStore.isLoading === true) {
        await itemsStore.loadItems();
      }
      const selectedItem = itemsStore.items.find(
        (item) => parseInt(item.id.toString()) === actionData,
      );
      if (selectedItem) {
        itemsStore.setSelectedItem(selectedItem);
        navigate(`/items/`);
      }
      return;
    }

    // Navigate to look
    if (type === 13 || type === 16) {
      if (looksStore.isLoading === true) {
        await looksStore.loadLooks();
      }
      const selectedLook = looksStore.looks.find(
        (look) => parseInt(look.id.toString()) === actionData,
      );
      if (selectedLook) {
        looksStore.setSelectedLook(selectedLook);
        navigate(`/looks/`);
      }
    }
  };

  const fadeOutElements = (desktopId: string, mobileId: string): void => {
    const element = document.getElementById(desktopId);
    const elementMobile = document.getElementById(mobileId);
    if (element) element.style.opacity = "0";
    if (elementMobile) {
      elementMobile.style.opacity = "0";
      setTimeout(() => {
        elementMobile.style.display = "none";
      }, 300);
    }
  };

  const followBackHandler = async (
    event: MouseEvent<HTMLElement>,
  ): Promise<void> => {
    event.stopPropagation();
    try {
      await postFollow(actionData);
      userStore.fetchUserData(false);
      fadeOutElements(`followback${id}`, `followbackMobile${id}`);
    } catch (e) {
      console.error(e);
    }
  };

  const acceptRequestHandler = async (
    event: MouseEvent<HTMLElement>,
  ): Promise<void> => {
    event.stopPropagation();
    try {
      await postAcceptRequest(actionData);
      userStore.fetchUserData(false);
      fadeOutElements(`acceptRequest${id}`, `acceptRequestMobile${id}`);
    } catch (e) {
      console.error(e);
    }
  };

  const isNotFollowed =
    userStore.followed.findIndex((followed) => followed.userName === title) ===
    -1;

  const isNotFriend =
    userStore.friends.findIndex((friend) => friend.userName === title) === -1;

  const showDeleteHandler = (id: string): void => {
    const elementNotification = document.getElementById(`notification${id}`);
    const elementDeleteButtonIcon = document.getElementById(
      `deleteButtonIcon${id}`,
    );
    if (elementNotification && elementDeleteButtonIcon) {
      const newHeight = `${elementNotification.offsetHeight}px`;
      elementDeleteButtonIcon.style.height = newHeight;
      elementDeleteButtonIcon.style.background = "rgba(160, 0, 0, 0.5)";
      elementNotification.style.left = "-50px";
    }
  };

  const hideDeleteHandler = (id: string): void => {
    const element = document.getElementById(`notification${id}`);
    const elementDeleteButtonIcon = document.getElementById(
      `deleteButtonIcon${id}`,
    );
    if (element) element.style.left = "0";
    if (elementDeleteButtonIcon) {
      setTimeout(() => {
        elementDeleteButtonIcon.style.background = "transparent";
      }, 300);
    }
  };

  const handleSwipe = (id: string): void => {
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

  return (
    <div
      className="notification__subContainer"
      id={`subContainer${id}`}
      key={`subContainer${id}`}
    >
      <div className="notifications__deleteButton">
        <div
          className="icon"
          onClick={() => closeNotificationHandlerMobile(id)}
          id={`deleteButtonIcon${id}`}
        >
          <DeleteFilled />
        </div>
      </div>
      <div
        className={`notifications__notification ${seen ? "seen" : "new"}`}
        id={`notification${id}`}
        onTouchStart={(e) => {
          setTouchEnd(null);
          setTouchStart(e.targetTouches[0].clientX);
        }}
        onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
        onTouchEnd={() => handleSwipe(id)}
      >
        {mediaLoading ? (
          "loading"
        ) : mediaError ? (
          "error"
        ) : (
          <div
            className={
              seen ? "notifications__leftSideSeen" : "notifications__leftSide"
            }
            onClick={handleNotificationClick}
            style={{
              background: `url(${mediaS3Url}) center center / cover no-repeat`,
            }}
          />
        )}
        <div
          className="notifications__rightSide"
          onClick={handleNotificationClick}
        >
          <NotificationMessage
            type={type}
            title={title}
            notificationAge={notificationAge}
          />
          <NotificationActions
            id={id}
            type={type}
            isLoading={userStore.isLoading}
            isNotFriend={isNotFriend}
            isNotFollowed={isNotFollowed}
            onAcceptRequest={acceptRequestHandler}
            onFollowBack={followBackHandler}
          />
          <div className="notification__icon">{getNotificationIcon(type)}</div>
          <div className="notifications__date">{notificationAge}</div>
        </div>
        <div
          className="closeDelete"
          onClick={() => closeNotificationHandler(id)}
        >
          <CloseOutlined />
        </div>
      </div>
      <div className="notifications__actionsButtonsMobile">
        <NotificationActions
          id={id}
          type={type}
          isLoading={userStore.isLoading}
          isNotFriend={isNotFriend}
          isNotFollowed={isNotFollowed}
          onAcceptRequest={acceptRequestHandler}
          onFollowBack={followBackHandler}
          isMobile
        />
      </div>
    </div>
  );
};
