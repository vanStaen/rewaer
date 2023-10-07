import React, { useState } from "react";
import { observer } from "mobx-react";
import { Badge } from "antd";
import { useTranslation } from "react-i18next";
import { MailOutlined, UserAddOutlined, EyeOutlined } from "@ant-design/icons";

import { profileStore } from "../../../stores/profileStore/profileStore";
import { userStore } from "../../../stores/userStore/userStore";
import { ProfileFriends } from "../ProfileFriends/ProfileFriends";

import "./ProfileActions.css";

export const ProfileActions = observer(() => {
  const [showProfileFriends, setShowProfileFriends] = useState(false);
  const { t } = useTranslation();

  const thisIsMe = userStore.userName === profileStore.userName;

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
        <div className={thisIsMe ? "profil__actionDisabled" : "profil__action"}>
          <UserAddOutlined /> {t("profile.sendFriendRequest")}
        </div>
        <div className={thisIsMe ? "profil__actionDisabled" : "profil__action"}>
          <EyeOutlined /> {t("profile.follow")}{" "}
          {profileStore.firstName || "user"}
        </div>
      </div>
      {showProfileFriends && <ProfileFriends />}
    </>
  );
});
