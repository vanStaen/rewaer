import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Spin, notification } from "antd";
import { MehOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";

import { MenuBar } from "../../components/MenuBar/MenuBar";
import { userStore } from "../../stores/userStore/userStore";
import { Avatar } from "./Avatar/Avatar";
import { archiveAccount } from "./EditSettings/DeleteAccountButton/archiveAccount";

import "./Profile.css";

export const Profile = observer(() => {
  const { t } = useTranslation();

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
      <MenuBar />
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
          </div>
          <div className="profil__containerCenter">
            <div className="profil__hello">
              {t("profile.hello")}
              {userStore.firstName && " " + userStore.firstName},
              <br />
              {showLastSeenOnline && (
                <div className="profil__lastSeenOnline">
                  {t("profile.lastSeenOnline")}{" "}
                  {dateLastActive.toLocaleDateString()} {t("profile.at")}{" "}
                  {dateLastActive.toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
          <div className="profil__containerRight">{null}</div>
        </div>
      )}
    </div>
  );
});