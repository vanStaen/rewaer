import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Spin } from "antd";
import { MehOutlined } from "@ant-design/icons";

import { looksStore } from "./looksStore";
import { authStore } from "../../stores/authStore/authStore";
import { userStore } from "../../stores/userStore/userStore";
import { LookDetail } from "./LookDetail/LookDetail";
import { LookList } from "./LookList/LookList";

import "./Looks.css";

export const Looks = observer(() => {
  useEffect(() => {
    looksStore.loadLooks();
    userStore.setMenuSelected("looks");
    userStore.profilSettings &&
      looksStore.setShowPrivate(userStore.profilSettings.displayPrivate);
  }, [looksStore.isOutOfDate, userStore.profilSettings]);

  useEffect(() => {
    if (authStore.hasAccess === false) {
      console.log("authStore.hasAccess:", authStore.hasAccess);
      window.location.href = "../";
    }
  }, [authStore.hasAccess]);

  useEffect(() => {
    if (!looksStore.selectedLook) {
      window.scroll({
        top: looksStore.originalScrollPosition,
        left: 0,
        behavior: "smooth",
      });
    } else {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [looksStore.selectedLook]);

  return (
    <div className="looks__main">
      {looksStore.error !== null ? (
        <div className="spinner">
          {looksStore.error}
          <br />
          <br />
          <MehOutlined style={{ fontSize: "120px", color: "#b6c8bf" }} />
        </div>
      ) : looksStore.isLoading || userStore.isLoading ? (
        <div className="spinner">
          <Spin size="large" />
        </div>
      ) : looksStore.selectedLook ? (
        <div className="looks__container">
          <LookDetail />
        </div>
      ) : (
        <LookList />
      )}
    </div>
  );
});
