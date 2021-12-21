import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { Spin } from "antd";
import { useTranslation } from "react-i18next";
import {
  CameraOutlined,
  SkinOutlined,
  TeamOutlined,
  MailOutlined,
  UserAddOutlined,
  EyeOutlined,
  MehOutlined,
} from "@ant-design/icons";

import { userStore } from "../../stores/userStore/userStore";
import { profileStore } from "../../stores/profileStore/profileStore";
import { Avatar } from "./Avatar/Avatar";

import "./Profile.css";

export const Profile = observer(() => {
  const params = useParams();
  const { t } = useTranslation();
  const [contentToDisplay, setContentToDisplay] = useState("looks");
  const [showLastSeenOnline, setShowLastSeenOnline] = useState(false);

  useEffect(() => {
    const username = params.username ? params.username : userStore.userName;
    profileStore.fetchProfileData(username);
  }, [userStore.isLoading])

  useEffect(() => {
    if (!profileStore.isLoading && profileStore.profilSettings) {
      setShowLastSeenOnline(profileStore.profilSettings.showLastSeenOnline);
    }
  }, [profileStore.isLoading, profileStore.profilSettings])

  const dateLastActive = new Date(profileStore.lastActive);

  return (
    <div className="profil__main">
      {profileStore.isLoading ? (
        <div className="spinner">
          <Spin size="large" />
        </div>
      ) : profileStore.error ? (
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
                  <div>{profileStore.firstName}</div>
                  <div className="profil__username">@{profileStore.userName}</div>
                  {showLastSeenOnline && (
                    <div className="profil__lastSeenOnline">
                      {t("profile.lastSeenOnline")}{" "}
                      {dateLastActive.toLocaleDateString()} {t("profile.at")}{" "}
                      {dateLastActive.toLocaleTimeString()}
                    </div>
                  )}
                  <br />
                  <div className="profil__action"><MailOutlined /> Send message</div>
                  <div className="profil__action"><UserAddOutlined /> Send friend Request</div>
                  <div className="profil__action"><EyeOutlined /> Follow {profileStore.firstName}</div>
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
                </div>
                <div className="profil__containerCenterContent">
                  {contentToDisplay}
                </div>
              </div>
              <div className="profil__containerRight">
                <div className="profil__friendsfollowersContainer">
                  <div className="profil__friendsfollowersTitle">
                    Friends (5)
                  </div>
                  <div className="profil__friendsfollowersAvatar"></div>
                  <div className="profil__friendsfollowersAvatar"></div>
                  <div className="profil__friendsfollowersAvatar"></div>
                  <div className="profil__friendsfollowersAvatar"></div>
                  <div className="profil__friendsfollowersAvatar"></div>
                </div>
                <div className="profil__friendsfollowersContainer">
                  <div className="profil__friendsfollowersTitle">
                    Followers (3)
                  </div>
                  <div className="profil__friendsfollowersAvatar"></div>
                  <div className="profil__friendsfollowersAvatar"></div>
                  <div className="profil__friendsfollowersAvatar"></div>
                </div>
                <div className="profil__friendsfollowersContainer">
                  <div className="profil__friendsfollowersTitle">
                    Following (9)
                  </div>
                  <div className="profil__friendsfollowersAvatar"></div>
                  <div className="profil__friendsfollowersAvatar"></div>
                  <div className="profil__friendsfollowersAvatar"></div>
                  <div className="profil__friendsfollowersAvatar"></div>
                  <div className="profil__friendsfollowersAvatar"></div>
                  <div className="profil__friendsfollowersAvatar"></div>
                  <div className="profil__friendsfollowersAvatar"></div>
                  <div className="profil__friendsfollowersAvatar"></div>
                  <div className="profil__friendsfollowersAvatar"></div>
                </div>
              </div>
            </div>
          )}
    </div>
  );
});
