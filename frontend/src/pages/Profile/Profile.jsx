import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import { Spin } from "antd";
import { CameraOutlined, SkinOutlined, MehOutlined } from "@ant-design/icons";

import { userStore } from "../../stores/userStore/userStore";
import { profileStore } from "../../stores/profileStore/profileStore";
import { Avatar } from "./Avatar/Avatar";
import { ProfileFriends } from "./ProfileFriends/ProfileFriends";
import { ProfileItems } from "./ProfileItems/ProfileItems";
import { ProfileLooks } from "./ProfileLooks/ProfileLooks";
import { ProfileDetails } from "./ProfileDetails/ProfileDetails";
import { ProfileActions } from "./ProfileActions/ProfileActions";
import { ProfileFilters } from "./ProfileFilters/ProfileFilters";

import "./Profile.css";

export const Profile = observer(() => {
  const params = useParams();
  const { t } = useTranslation();
  const [contentToDisplay, setContentToDisplay] = useState("looks");

  useEffect(() => {
    const username = params.username ? params.username : userStore.userName;
    profileStore.fetchProfileData(username);
  }, [userStore.isLoading, userStore.userName]);

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
            <ProfileDetails />
            <ProfileActions />
          </div>
          <div className="profil__containerCenter">
            <div className="profil__subMenuContainer">
              <div
                className={`profil__subMenuItem ${
                  contentToDisplay === "looks" && "profil__subMenuItemSelected"
                }`}
                onClick={() => {
                  setContentToDisplay("looks");
                  profileStore.setFilterIsPopingUp(true);
                }}
              >
                <CameraOutlined />
                <span className="profil__counter">
                  {profileStore.looks && profileStore.looks.length}&nbsp;
                  {t("menu.looks")}
                </span>
              </div>
              <div
                className={`profil__subMenuItem ${
                  contentToDisplay === "items" && "profil__subMenuItemSelected"
                }`}
                onClick={() => {
                  setContentToDisplay("items");
                  profileStore.setFilterIsPopingUp(true);
                }}
              >
                <SkinOutlined />
                <span className="profil__counter">
                  {profileStore.items && profileStore.items.length}&nbsp;
                  {t("menu.items")}
                </span>
              </div>
            </div>
            <div className="profil__containerCenterContent">
              {contentToDisplay === "items" && <ProfileItems />}
              {contentToDisplay === "looks" && <ProfileLooks />}
            </div>
          </div>
          <div className="profil__containerRight">
            <ProfileFilters contentToDisplay={contentToDisplay} />
            <ProfileFriends />
          </div>
        </div>
      )}
    </div>
  );
});
