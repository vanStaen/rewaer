import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Spin } from "antd";
import { MehOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";

import { MenuBar } from "../../components/MenuBar/MenuBar";
import { userStore } from "../../stores/userStore/userStore";
import { Avatar } from "./Avatar/Avatar";

import "./Profil.css";

export const Profil = observer(() => {
  const { t } = useTranslation();

  useEffect(() => {
    userStore.fetchuserData();
  }, []);

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
      ) : userStore.isError ? (
        <div className="spinner">
          Connection error!
          <br />
          <br />
          <MehOutlined style={{ fontSize: "120px", color: "#b6c8bf" }} />
        </div>
      ) : (
        <div className="profil__container">
          <Avatar />
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
      )}
    </div>
  );
});
