import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Spin } from "antd";
import { MehOutlined } from "@ant-design/icons";

import { looksStore } from "./looksStore";
import { authStore } from "../../stores/authStore/authStore";
import { userStore } from "../../stores/userStore/userStore";
import { LookDetail } from "./LookDetail/LookDetail";
import { LookList } from "./LookList/LookList";
import { ToolBar } from "../../components/ToolBar/ToolBar";

import "./Looks.css";

export const Looks = observer(() => {
  useEffect(() => {
    looksStore.loadLooks();
    userStore.setMenuSelected("looks");
    userStore.profilSettings &&
      looksStore.setShowPrivateLooks(userStore.profilSettings.displayPrivate);
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

  const totalLooks = () => {
    if (userStore.profilSettings.displayArchived) {
      if (looksStore.showPrivateLooks) {
        return looksStore.looks.length;
      } else {
        return looksStore.looks.length - looksStore.numberOfPrivateLook;
      }
    } else {
      if (looksStore.showPrivateLooks) {
        return looksStore.looks.length - looksStore.numberOfArchivedLook;
      } else {
        return (
          looksStore.looks.length -
          looksStore.numberOfArchivedLook -
          looksStore.numberOfPrivateLook
        );
      }
    }
  };

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
        <LookDetail />
      ) : (
        <>
          <ToolBar total={totalLooks()} page="looks" />
          <LookList />
        </>
      )}
    </div>
  );
});
