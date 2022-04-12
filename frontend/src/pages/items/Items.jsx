import React, { useEffect, useState, useRef } from "react";
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
  const [selectedItemId, setSelectedItemId] = useState(null);
  const originalScrollPosition = useRef(null);
  const lastKnownScrollPosition = useRef(null);
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
    if (!selectedItemId) {
      window.scroll({
        top: originalScrollPosition.current,
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
  }, [selectedItemId]);

  useEffect(() => {
    window.addEventListener("scroll", scrollEventHandler);
    window.addEventListener("keydown", keydownEventHandler);
    window.addEventListener("popstate", browserBackHandler);
    return () => {
      window.removeEventListener("scroll", scrollEventHandler);
      window.removeEventListener("keydown", keydownEventHandler);
      window.removeEventListener("popstate", browserBackHandler);
    };
  }, [selectedItemId]);

  const showDetailView = (id) => {
    setSelectedItemId(id);
    originalScrollPosition.current = lastKnownScrollPosition.current;
  };

  const hideDetailView = () => {
    setSelectedItemId(null);
  };

  const scrollEventHandler = () => {
    lastKnownScrollPosition.current = window.scrollY;
  };

  const browserBackHandler = (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    setSelectedItemId(null);
  };

  const keydownEventHandler = (event) => {
    /* 
        // Use index of, to find position in array, and increment
        //  decrement to the next items in array
        // take in consideration private hidden or not.  
        // itemsStore.showPrivate)
        const selectedItem = itemsStore.items.find(
          (item) => item._id === props.selectedItemId
        );
      */
    event.preventDefault();
    const keyPressed = event.key.toLowerCase();
    if (keyPressed === "escape") {
      setSelectedItemId(null);
    } else if (keyPressed === "arrowleft") {
      const indexOfResult = itemsStore.items
        .map(function (e) {
          return e._id;
        })
        .indexOf(selectedItemId);
      setSelectedItemId(itemsStore.items[indexOfResult - 1]._id);
    } else if (keyPressed === "arrowright") {
      const indexOfResult = itemsStore.items
        .map(function (e) {
          return e._id;
        })
        .indexOf(selectedItemId);
      setSelectedItemId(itemsStore.items[indexOfResult + 1]._id);
    }
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
      ) : selectedItemId ? (
        <div className="looks__container">
          <ItemDetail
            selectedItemId={selectedItemId}
            hideDetailView={hideDetailView}
          />
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
            <ItemList showDetailView={showDetailView} />
          </div>
        </>
      )}
    </div>
  );
});
