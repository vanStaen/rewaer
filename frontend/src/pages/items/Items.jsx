import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Spin } from "antd";
import { useTranslation } from "react-i18next";
import { MehOutlined } from "@ant-design/icons";

import { itemsStore } from "./itemsStore";
import { authStore } from "../../stores/authStore/authStore";
import { userStore } from "../../stores/userStore/userStore";
import { Banner } from "../../components/Banner/Banner";
import { ToolBar } from "../../components/ToolBar/ToolBar";
import { ItemDetail } from "./ItemDetail/ItemDetail";
import { ItemList } from "./ItemList/ItemList";

import "./Items.css";

export const Items = observer(() => {
  const [quickEdit, setQuickEdit] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const { t } = useTranslation();

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
    window.addEventListener("scroll", scrollEventHandler);
    window.addEventListener("popstate", browserBackHandler);
    return () => {
      window.removeEventListener("scroll", scrollEventHandler);
      window.removeEventListener("popstate", browserBackHandler);
    };
  }, []);

  const scrollEventHandler = () => {
    itemsStore.setLastKnownScrollPosition(window.scrollY);
  };

  const browserBackHandler = (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    itemsStore.setSelectedItemId(null);
  };

  const totalItems = () => {
    if (userStore.profilSettings.displayArchived) {
      if (itemsStore.showPrivate) {
        return itemsStore.items.length;
      } else {
        return itemsStore.items.length - itemsStore.numberOfPrivateItem;
      }
    } else {
      if (itemsStore.showPrivate) {
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
        <div className="looks__container">
          <ItemDetail />
        </div>
      ) : (
        <>
          <Banner
            id="missingTag"
            desc={t("items.missingTagsAlert")}
            show={true}
          />
          <div className="items__container">
            <div className="items__toolbar">
              <div className="items__toolbarLeft">
                {totalItems()}&nbsp;{t("menu.items")}
                {itemsStore.numberOfPrivateItem > 0 && (
                  <>
                    {" "}
                    |
                    <span
                      className="link"
                      onClick={() => {
                        itemsStore.setShowPrivate(!itemsStore.showPrivate);
                      }}
                    >
                      &nbsp;
                      {itemsStore.showPrivate
                        ? t("items.hidePrivateItems")
                        : t("items.showPrivateItems")}
                    </span>
                  </>
                )}
              </div>
              <div className="items__toolbarRight">
                <ToolBar
                  quickEdit={quickEdit}
                  setQuickEdit={setQuickEdit}
                  showFilter={showFilter}
                  setShowFilter={setShowFilter}
                />
              </div>
            </div>
            <ItemList />
          </div>
        </>
      )}
    </div>
  );
});
