import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Spin } from "antd";
import { useTranslation } from "react-i18next";
import { MehOutlined } from "@ant-design/icons";

import { itemsStore } from "./itemsStore";
import { authStore } from "../../stores/authStore/authStore";
import { userStore } from "../../stores/userStore/userStore";
import { ItemDetail } from "./ItemDetail/ItemDetail";
import { ItemList } from "./ItemList/ItemList";

import "./Items.css";

export const Items = observer(() => {
  useEffect(() => {
    itemsStore.loadItems();
    userStore.setMenuSelected("items");
    userStore.profilSettings &&
      itemsStore.setShowPrivate(userStore.profilSettings.displayPrivate);
  }, [itemsStore.isOutOfDate, userStore.profilSettings]);

  useEffect(() => {
    if (authStore.hasAccess === false) {
      console.log("authStore.hasAccess:", authStore.hasAccess);
      window.location.href = "../";
    }
  }, [authStore.hasAccess]);

  useEffect(() => {
    if (!itemsStore.selectedItemId) {
      window.scroll({
        top: itemsStore.originalScrollPosition,
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
  }, [itemsStore.selectedItemId]);

  useEffect(() => {
    window.addEventListener("popstate", browserBackHandler);
    return () => {
      window.removeEventListener("popstate", browserBackHandler);
    };
  }, []);

  const browserBackHandler = (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    itemsStore.setSelectedItemId(null);
  };

  return (
    <div className="items__main">
      {itemsStore.error !== null ? (
        <div className="spinner">
          {itemsStore.error}
          <br />
          <br />
          <MehOutlined style={{ fontSize: "120px", color: "#b6c8bf" }} />
        </div>
      ) : itemsStore.isLoading || userStore.isLoading ? (
        <div className="spinner">
          <Spin size="large" />
        </div>
      ) : itemsStore.selectedItemId ? (
        <div className="items__container">
          <ItemDetail />
        </div>
      ) : (
        <ItemList />
      )}
    </div>
  );
});
