import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { MailOutlined, UserAddOutlined, EyeOutlined } from "@ant-design/icons";

import { profileStore } from "../../../stores/profileStore/profileStore";

import "./ProfileActions.css";

export const ProfileActions = observer(() => {
  const { t } = useTranslation();

  return (
    <>
      <div className="profil__friendsActionContainer"></div>
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
    </>
  );
});
