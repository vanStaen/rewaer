import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { Spin } from "antd";
import { MehOutlined } from "@ant-design/icons";

import { userStore } from "../../stores/userStore/userStore";
import { profileStore } from "../../stores/profileStore/profileStore";
import { authStore } from "../../stores/authStore/authStore";
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

  useEffect(() => {
    const username = params.username ? params.username : userStore.userName;
    profileStore.fetchProfileData(username);
  }, [userStore.isLoading, userStore.userName]);

  useEffect(() => {
    if (authStore.hasAccess === false) {
      console.log("authStore.hasAccess:", authStore.hasAccess);
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
            Connection error!
            <br />
            <br />
            <MehOutlined style={{ fontSize: "120px", color: "#b6c8bf" }} />
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
