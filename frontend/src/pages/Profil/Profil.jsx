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

  return (
    <div className="profil__main">
      <MenuBar />
      <div className="profil__container">
        <Avatar />
        <div className="profil__hello">
          Hello{userStore.firstName && " " + userStore.firstName},
        </div>
      </div>
    </div>
  );
});
