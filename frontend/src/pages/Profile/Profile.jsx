import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Spin, notification } from "antd";
import { MehOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import {
  CameraOutlined,
  SkinOutlined,
  TeamOutlined,
  MailOutlined,
  UserAddOutlined,
  EyeOutlined
} from "@ant-design/icons";

import { userStore } from "../../stores/userStore/userStore";
import { Avatar } from "./Avatar/Avatar";
import { archiveAccount } from "./EditSettings/DeleteAccountButton/archiveAccount";

import "./Profile.css";

export const Profile = observer(() => {
  const { t } = useTranslation();
  const [contentToDisplay, setContentToDisplay] = useState("looks");

  useEffect(() => {
    // Check if account was archived
    if (userStore.archived) {
      archiveAccount(false);
      notification.success({
        message: (
          <>
            <b>{t("profile.accountReactivated")}</b>
            <br />
            {t("profile.gladToHaveYouBack")}
          </>
        ),
        placement: "bottomRight",
      });
    }
  }, [userStore.archived]);

  const showLastSeenOnline = userStore.profilSettings
    ? userStore.profilSettings.showLastSeenOnline
    : false;

  const dateLastActive = new Date(userStore.lastActive);

  return (
    <div className="profil__main">
      {userStore.isLoading ? (
        <div className="spinner">
          <Spin size="large" />
        </div>
      ) : userStore.error ? (
        <div className="spinner">
          Connection error!
          <br />
          <br />
          <MehOutlined style={{ fontSize: "120px", color: "#b6c8bf" }} />
        </div>
      ) : (
            <div className="profil__container">
              <div className="profil__containerLeft">
                <Avatar />
                <div className="profil__hello">
                  {userStore.firstName && userStore.firstName}
                  <br />
                  {showLastSeenOnline && (
                    <div className="profil__lastSeenOnline">
                      {t("profile.lastSeenOnline")}{" "}
                      {dateLastActive.toLocaleDateString()} {t("profile.at")}{" "}
                      {dateLastActive.toLocaleTimeString()}
                    </div>
                  )}
                  <br />
                  <div className="profil__action"><MailOutlined /> Send message</div>
                  <div className="profil__action"><UserAddOutlined /> Friend Request</div>
                  <div className="profil__action"><EyeOutlined /> Follow {userStore.firstName}</div>
                </div>
              </div>
              <div className="profil__containerCenter">
                <div className="profil__subMenuContainer">
                  <div
                    className={`profil__subMenuItem ${contentToDisplay === "looks" && "profil__subMenuItemSelected"}`}
                    onClick={() => { setContentToDisplay("looks") }}
                  >
                    <CameraOutlined />
                  </div>
                  <div
                    className={`profil__subMenuItem ${contentToDisplay === "items" && "profil__subMenuItemSelected"}`}
                    onClick={() => { setContentToDisplay("items") }}
                  >
                    <SkinOutlined />
                  </div>
                  <div
                    className={`profil__subMenuItem ${contentToDisplay === "friends" && "profil__subMenuItemSelected"}`}
                    onClick={() => { setContentToDisplay("friends") }}
                  >
                    <TeamOutlined />
                  </div>
                </div>
                <div className="profil__containerCenterContent">
                  {contentToDisplay}
                </div>
              </div>
              <div className="profil__containerRight">{null}</div>
            </div>
          )}
    </div>
  );
});
