import React, { useEffect } from "react";
import { observer } from "mobx-react";

import { MenuBar } from "../../components/MenuBar/MenuBar";
import { userStore } from "../../stores/userStore/userStore";
import { Avatar } from "./Avatar/Avatar";

import "./Profil.css";

export const Profil = observer(() => {
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
      <div className="profil__container">
        <Avatar />
        <div className="profil__hello">
          Hello{userStore.firstName && " " + userStore.firstName},
          <br />
          {showLastSeenOnline && (
            <div className="profil__lastSeenOnline">
              Last seen online the {dateLastActive.toLocaleDateString()} at{" "}
              {dateLastActive.toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
