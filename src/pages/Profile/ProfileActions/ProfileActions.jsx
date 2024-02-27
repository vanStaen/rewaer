import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Badge } from "antd";
import { useTranslation } from "react-i18next";
import {
  MailOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

import { profileStore } from "../../../stores/profileStore/profileStore";
import { userStore } from "../../../stores/userStore/userStore";
import { ProfileFriends } from "../ProfileFriends/ProfileFriends";
import { deleteFriend } from "./deleteFriend";
import { deleteFollow } from "./deleteFollow";
import { deleteFriendRequest } from "./deleteFriendRequest";
import { postFollow } from "./postFollow";
import { postFriendRequest } from "./postFriendRequest";

import "./ProfileActions.css";

export const ProfileActions = observer(() => {
  const { t } = useTranslation();
  const [showProfileFriends, setShowProfileFriends] = useState(false);

  const [isFollowed, setIsFollowed] = useState(
    !(
      userStore.followed.findIndex(
        (followed) => parseInt(followed._id) === profileStore._id,
      ) < 0
    ),
  );
  const [isFriend, setIsFriend] = useState(
    !(
      userStore.friends.findIndex(
        (friend) => parseInt(friend._id) === profileStore._id,
      ) < 0
    ),
  );
  const [isPending, setIsPending] = useState(
    !(
      userStore.friendsPending.findIndex(
        (pending) => parseInt(pending.friend_id) === profileStore._id,
      ) < 0
    ),
  );

  const thisIsMe = userStore._id === profileStore._id;

  const handleClick = async (action) => {
    if (thisIsMe) {
      return;
    }
    try {
      if (action === "follow") {
        await postFollow(profileStore._id);
        setIsFollowed(true);
      } else if (action === "unfollow") {
        await deleteFollow(profileStore._id);
        setIsFollowed(false);
      } else if (action === "request") {
        await postFriendRequest(profileStore._id);
        setIsPending(true);
      } else if (action === "unrequest") {
        await deleteFriendRequest(profileStore._id);
        setIsPending(false);
      } else if (action === "unfriend") {
        await deleteFriend(profileStore._id);
        setIsPending(false);
        setIsFriend(false);
      }
      profileStore.fetchProfileData(profileStore.userName, false);
    } catch (e) {
      console.log("error:", e);
    }
  };

  return (
    <>
      <div
        className="profil__friendsActionContainer"
        onClick={() => setShowProfileFriends(!showProfileFriends)}
      >
        <div>
          <Badge showZero count={profileStore.friends.length} color="#526d5f" />{" "}
          {t("profile.friends")}
        </div>
        <div>
          <Badge
            showZero
            count={profileStore.followers.length}
            color="#7f9f8e"
          />{" "}
          {t("profile.followers")}
        </div>
        <div>
          <Badge
            showZero
            count={profileStore.followed.length}
            color="#b6c8bf"
          />{" "}
          {t("profile.following")}
        </div>
      </div>
      <div className="profil__actionContainer">
        <div className={thisIsMe ? "profil__actionDisabled" : "profil__action"}>
          <MailOutlined /> {t("profile.sendMessage")}
        </div>
        {
          // Friend/Unfriend action
          isPending ? (
            <div
              className={thisIsMe ? "profil__actionDisabled" : "profil__action"}
              onClick={() => handleClick("unrequest")}
            >
              <UserDeleteOutlined /> {t("profile.deletePendingRequest")}
            </div>
          ) : isFriend ? (
            <div
              className={thisIsMe ? "profil__actionDisabled" : "profil__action"}
              onClick={() => handleClick("unfriend")}
            >
              <UserDeleteOutlined /> {t("profile.unfriendRequest")}
            </div>
          ) : (
            <div
              className={thisIsMe ? "profil__actionDisabled" : "profil__action"}
              onClick={() => handleClick("request")}
            >
              <UserAddOutlined /> {t("profile.sendFriendRequest")}
            </div>
          )
        }
        {
          // Follow/Unfollow action
          isFollowed ? (
            <div
              className={thisIsMe ? "profil__actionDisabled" : "profil__action"}
              onClick={() => handleClick("unfollow")}
            >
              <EyeInvisibleOutlined /> {t("profile.unfollow")}{" "}
              {profileStore.firstName || "user"}
            </div>
          ) : (
            <div
              className={thisIsMe ? "profil__actionDisabled" : "profil__action"}
              onClick={() => handleClick("follow")}
            >
              <EyeOutlined /> {t("profile.follow")}{" "}
              {profileStore.firstName || "user"}
            </div>
          )
        }
      </div>
      {showProfileFriends && <ProfileFriends />}
    </>
  );
});
