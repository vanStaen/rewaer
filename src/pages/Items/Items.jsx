import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Spin } from "antd";
import { MehOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { itemsStore } from "./itemsStore";
import { authStore } from "../../stores/authStore/authStore.js";
import { userStore } from "../../stores/userStore/userStore.js";
import { pageStore } from "../../stores/pageStore/pageStore.js";
import { ItemDetail } from "./ItemDetail/ItemDetail";
import { ItemList } from "./ItemList/ItemList";
import { Banner } from "../../components/Banner/Banner";
import { ToolBar } from "../../components/ToolBar/ToolBar";

import "./Items.css";

export const Items = observer(() => {
  const { t } = useTranslation();

  useEffect(() => {
    itemsStore.loadItems();
    pageStore.setMenuSelected("items");
    userStore.profilSettings &&
      itemsStore.setShowPrivateItems(userStore.profilSettings.displayPrivate);
  }, [itemsStore.isOutOfDate, userStore.profilSettings]);

  useEffect(() => {
    if (authStore.hasAccess === false) {
      console.log("authStore.hasAccess:", authStore.hasAccess);
      window.location.href = "../";
    }
  }, [authStore.hasAccess]);

  useEffect(() => {
    if (!itemsStore.selectedItem) {
      window.scroll({
        top: itemsStore.originalScrollPosition,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [itemsStore.selectedItem]);

  const totalItems = () => {
    if (userStore.profilSettings.displayArchived) {
      if (itemsStore.showPrivateItems) {
        return itemsStore.items.length;
      } else {
        return itemsStore.items.length - itemsStore.numberOfPrivateItem;
      }
    } else {
      if (itemsStore.showPrivateItems) {
        return itemsStore.items.length - itemsStore.numberOfArchivedItem;
      } else {
        return (
          itemsStore.items.length -
          itemsStore.numberOfArchivedItem -
          itemsStore.numberOfPrivateItem
        );
      }
    }
  };

  return (
    <div className="items__main">
      {itemsStore.error !== null ? (
        <div className="spinner">
          <MehOutlined style={{ fontSize: "120px", color: "#b6c8bf" }} />
          <div className="errorText">
            {t("main.pleaseReload")}
            <br />({itemsStore.error})
          </div>
        </div>
      ) : itemsStore.isLoading || userStore.isLoading ? (
        <div className="spinner">
          <Spin size="large" />
        </div>
      ) : itemsStore.selectedItem ? (
        <ItemDetail />
      ) : (
        <>
          <Banner
            id="missingTag"
            desc={t("items.missingTagsAlert")}
            show={true}
          />
          <ToolBar total={totalItems()} page="items" />
          <ItemList />
        </>
      )}
    </div>
  );
});
