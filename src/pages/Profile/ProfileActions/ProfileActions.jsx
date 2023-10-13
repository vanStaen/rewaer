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

import "./ProfileActions.css";
import { deleteFollow } from "./deleteFollow";
import { postFollow } from "./postFollow";

export const ProfileActions = observer(() => {
  const [showProfileFriends, setShowProfileFriends] = useState(false);
  const [isFollowed, setIsFollowed] = useState(
    userStore.followed.findIndex(
      (followed) => parseInt(followed._id) === profileStore._id
    ) < 0
      ? false
      : true
  );
  const isFriend =
    userStore.friends.findIndex(
      (friend) => parseInt(friend._id) === profileStore._id
    ) < 0
      ? false
      : true;
  const { t } = useTranslation();

  const thisIsMe = userStore._id === profileStore._id;

  const handleFollowClick = (action) => {
    if (thisIsMe) {
      return;
    }
    try {
      if (action === "follow") {
        postFollow(profileStore._id);
        setIsFollowed(true);
      } else if (action === "unfollow") {
        deleteFollow(profileStore._id);
        setIsFollowed(false);
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
          isFriend ? (
            <div
              className={thisIsMe ? "profil__actionDisabled" : "profil__action"}
            >
              <UserDeleteOutlined /> {t("profile.unfriendRequest")}
            </div>
          ) : (
            <div
              className={thisIsMe ? "profil__actionDisabled" : "profil__action"}
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
              onClick={() => handleFollowClick("unfollow")}
            >
              <EyeInvisibleOutlined /> {t("profile.unfollow")}{" "}
              {profileStore.firstName || "user"}
            </div>
          ) : (
            <div
              className={thisIsMe ? "profil__actionDisabled" : "profil__action"}
              onClick={() => handleFollowClick("follow")}
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
