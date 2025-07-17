import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { Spin } from "antd";
import { MehOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { userStore } from "../../stores/userStore/userStore.js";
import { profileStore } from "../../stores/profileStore/profileStore";
import { authStore } from "../../stores/authStore/authStore.js";
import { Avatar } from "./Avatar/Avatar";
import { ProfileFriends } from "./ProfileFriends/ProfileFriends";
import { ProfileDetails } from "./ProfileDetails/ProfileDetails";
import { ProfileActions } from "./ProfileActions/ProfileActions";
import { ProfileMain } from "./ProfileMain/ProfileMain";
import { MenuBar } from "../../components/MenuBar/MenuBar";

import "./Profile.css";

export const Profile = observer(() => {
  const [contentToDisplay, setContentToDisplay] = useState("looks");
  const params = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    const username = params.username ? params.username : userStore.userName;
    profileStore.fetchProfileData(username);
  }, [userStore.isLoading, userStore.userName]);

  useEffect(() => {
    if (authStore.hasAccess === false) {
      window.location.href = "../";
    }
  }, [authStore.hasAccess]);

  return (
    <>
      {!authStore.hasAccess && <MenuBar visitor={true} />}
      <div className="profil__main">
        {profileStore.isLoading ? (
          <div className="spinner">
            <Spin size="large" />
          </div>
        ) : profileStore.error ? (
          <div className="spinner">
            <MehOutlined style={{ fontSize: "120px", color: "#b6c8bf" }} />
            <div className="errorText">{t("main.pleaseReload")}</div>
          </div>
        ) : (
          <>
            <div className="profil__containerLeft">
              <Avatar />
              <ProfileDetails />
              <ProfileActions />
            </div>
            <div className="profil__containerCenter">
              <ProfileMain
                contentToDisplay={contentToDisplay}
                setContentToDisplay={setContentToDisplay}
              />
            </div>
            <div className="profil__containerRight">
              <ProfileFriends />
            </div>
          </>
        )}
      </div>
    </>
  );
});
