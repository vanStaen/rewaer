import React, { useEffect, useState, useRef, useCallback } from "react";
import { observer } from "mobx-react";
import { Col, Row, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { MehOutlined } from "@ant-design/icons";

import { itemsStore } from "./itemsStore";
import { userStore } from "../../stores/userStore/userStore";
import { ItemCard } from "./ItemCard/ItemCard";
import { ItemForm } from "./ItemForm/ItemForm";
import { Banner } from "../../components/Banner/Banner";
import { ToolBar } from "../../components/ToolBar/ToolBar";
import { GhostCard } from "../../components/GhostCard/GhostCard";
import { ItemDetail } from "./ItemDetail/ItemDetail";

import "./Items.css";

export const Items = observer(() => {
  const containerElement = useRef(null);
  const [missingCardForFullRow, setMissingCardForFullRow] = useState(0);
  const [quickEdit, setQuickEdit] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [originalScrollPosition, setOriginalScrollPosition] = useState(null);
  const [lastKnownScrollPosition, setLastKnownScrollPosition] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    itemsStore.loadItems();
    userStore.setMenuSelected("items");
    userStore.profilSettings &&
      itemsStore.setShowPrivate(userStore.profilSettings.displayPrivate);
  }, [itemsStore.isOutOfDate, userStore.profilSettings]);

  useEffect(() => {
    calculateMissingCardsForFullRow();
  }, [
    containerElement.current,
    missingCardForFullRow,
    calculateMissingCardsForFullRow,
    itemsStore.numberOfPrivateItem,
    itemsStore.numberOfArchivedItem,
    itemsStore.items,
    itemsStore.showPrivate,
    userStore.profilSettings,
  ]);

  useEffect(() => {
    window.addEventListener("resize", calculateMissingCardsForFullRow);
    window.addEventListener("scroll", scrollEventHandler);
    return () => {
      window.removeEventListener("resize", calculateMissingCardsForFullRow);
      window.removeEventListener("scroll", scrollEventHandler);
    };
  }, []);

  const showDetailView = (id) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "auto",
    });
    setSelectedItemId(id);
    setOriginalScrollPosition(lastKnownScrollPosition);
    console.log("originalScrollPosition", originalScrollPosition);
  };

  const hideDetailView = () => {
    window.scroll({
      top: originalScrollPosition,
      left: 0,
      behavior: "smooth",
    });
    setSelectedItemId(null);
  };

  const scrollEventHandler = () => {
    setLastKnownScrollPosition(window.scrollY);
    console.log("scrollPosition", window.scrollY);
    console.log("lastKnownScrollPosition", lastKnownScrollPosition);
  };

  const calculateMissingCardsForFullRow = useCallback(() => {
    const displayArchived = userStore.profilSettings
      ? userStore.profilSettings.displayArchived
      : false;
    const containerWidth =
      containerElement.current === null
        ? 0
        : containerElement.current.offsetWidth;
    const cardWidth = 240;
    const numberPerRow = Math.floor(containerWidth / cardWidth, 1);
    const numberItems = itemsStore.showPrivate
      ? displayArchived
        ? itemsStore.items.length + 1
        : itemsStore.items.length + 1 - itemsStore.numberOfArchivedItem
      : displayArchived
      ? itemsStore.items.length + 1 - itemsStore.numberOfPrivateItem
      : itemsStore.items.length +
        1 -
        itemsStore.numberOfPrivateItem -
        itemsStore.numberOfArchivedItem;
    const numberFullRow = Math.floor(numberItems / numberPerRow);
    const missingCards =
      numberPerRow - (numberItems - numberFullRow * numberPerRow);
    setMissingCardForFullRow(missingCards === numberPerRow ? 0 : missingCards);
  }, [
    containerElement.current,
    itemsStore.showPrivate,
    userStore.profilSettings,
  ]);

  const itemList = itemsStore.items.map((item) => {
    if (!item.private || itemsStore.showPrivate) {
      if (!item.active && !userStore.profilSettings?.displayArchived) {
        return null;
      } else {
        return (
          <Col key={item._id}>
            <ItemCard item={item} showDetailView={showDetailView} />
          </Col>
        );
      }
    }
    return null;
  });

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
          <div ref={containerElement} className="items__container">
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
            <Row justify={"space-around"}>
              <Col>
                <ItemForm />
              </Col>
              {itemList}
              <GhostCard
                numberOfCards={missingCardForFullRow}
                width="240px"
                height="385px"
              />
            </Row>
          </div>
        </>
      )}
    </div>
  );
});
