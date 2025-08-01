import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Spin } from "antd";
import { MehOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { looksStore } from "./looksStore";
import { authStore } from "../../stores/authStore/authStore.js";
import { pageStore } from "../../stores/pageStore/pageStore.js";
import { userStore } from "../../stores/userStore/userStore.js";
import { LookDetail } from "./LookDetail/LookDetail";
import { LookList } from "./LookList/LookList";
import { ToolBar } from "../../components/ToolBar/ToolBar";

import "./Looks.css";

export const Looks = observer(() => {
  const { t } = useTranslation();

  useEffect(() => {
    looksStore.loadLooks();
    pageStore.setMenuSelected("looks");
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
          <MehOutlined style={{ fontSize: "120px", color: "#b6c8bf" }} />
          <div className="errorText">
            {t("main.pleaseReload")}
            <br />({looksStore.error})
          </div>
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
