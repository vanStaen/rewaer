import React, { useEffect } from "react";
import { observer } from "mobx-react";

import { MenuBar } from "../../../components/MenuBar/MenuBar";
import { userStore } from "../../../stores/userStore/userStore";

import "./EditSettings.css";

export const EditSettings = observer(() => {
  //userStore.emailSettings
  //userStore.profilSettings
  return (
    <div className="EditSettings__main">
      <MenuBar />
      <div className="EditSettings__container">EDIT USER SETTINGS</div>
    </div>
  );
});
