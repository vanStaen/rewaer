import React, { useState } from "react";
import { observer } from "mobx-react";
import { Badge } from "antd";
import { useTranslation } from "react-i18next";
import { MailOutlined, UserAddOutlined, EyeOutlined } from "@ant-design/icons";

import { profileStore } from "../../../stores/profileStore/profileStore";
import { ProfileFriends } from "../ProfileFriends/ProfileFriends";
import "./ProfileActions.css";

export const ProfileActions = observer(() => {
  const [showProfileFriends, setShowProfileFriends] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <div
        className="profil__friendsActionContainer"
        onClick={() => setShowProfileFriends(!showProfileFriends)}
      >
        <div>
          <Badge count={5} color="#8e9e95" /> {t("profile.friends")}
        </div>
        <div>
          <Badge count={3} color="#92ad9e" /> {t("profile.followers")}
        </div>
        <div>
          <Badge count={9} color="#a4baae" /> {t("profile.following")}
        </div>
      </div>
      <div className="profil__actionContainer">
        <div className="profil__action">
          <MailOutlined /> {t("profile.sendMessage")}
        </div>
        <div className="profil__action">
          <UserAddOutlined /> {t("profile.sendFriendRequest")}
        </div>
        <div className="profil__action">
          <EyeOutlined /> {t("profile.follow")}{" "}
          {profileStore.firstName || "user"}
        </div>
      </div>
      {showProfileFriends && <ProfileFriends />}
    </>
  );
});
