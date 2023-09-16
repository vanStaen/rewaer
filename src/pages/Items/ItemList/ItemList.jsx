import React, { useEffect, useState, useRef, useCallback } from "react";
import { observer } from "mobx-react";
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";

import { itemsStore } from "../itemsStore";
import { userStore } from "../../../stores/userStore/userStore";
import { GhostCard } from "../../../components/GhostCard/GhostCard";
import { ItemCard } from "../ItemCard/ItemCard";
import { ItemForm } from "../ItemForm/ItemForm";
import { Banner } from "../../../components/Banner/Banner";
import { ToolBar } from "../../../components/ToolBar/ToolBar";

export const ItemList = observer(() => {
  const [quickEdit, setQuickEdit] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const containerElement = useRef(null);
  const [missingCardForFullRow, setMissingCardForFullRow] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    window.addEventListener("scroll", scrollEventHandler);
    window.addEventListener("resize", calculateMissingCardsForFullRow);
    return () => {
      window.removeEventListener("scroll", scrollEventHandler);
      window.removeEventListener("resize", calculateMissingCardsForFullRow);
    };
  }, []);

  useEffect(() => {
    calculateMissingCardsForFullRow();
  }, [
    containerElement.current,
    missingCardForFullRow,
    calculateMissingCardsForFullRow,
    itemsStore.numberOfPrivateItem,
    itemsStore.numberOfArchivedItem,
    itemsStore.items,
    itemsStore.showPrivateItems,
    userStore.profilSettings,
  ]);

  const scrollEventHandler = () => {
    itemsStore.setLastKnownScrollPosition(window.scrollY);
  };

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
    const numberItems = itemsStore.showPrivateItems
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
    itemsStore.showPrivateItems,
    userStore.profilSettings,
  ]);

  const showDetailView = (item) => {
    itemsStore.setSelectedItem(item);
    itemsStore.setOriginalScrollPosition(itemsStore.lastKnownScrollPosition);
  };

  const itemList = itemsStore.items.map((item) => {
    if (!item.private || itemsStore.showPrivateItems) {
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

  return (
    <>
      <Banner id="missingTag" desc={t("items.missingTagsAlert")} show={true} />
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
                    itemsStore.setShowPrivateItems(
                      !itemsStore.showPrivateItems
                    );
                  }}
                >
                  &nbsp;
                  {itemsStore.showPrivateItems
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
        <div ref={containerElement}>
          <Row justify={"space-around"}>
            <ItemForm />
            {itemList}
            <GhostCard
              numberOfCards={missingCardForFullRow}
              width="240px"
              height="385px"
            />
          </Row>
        </div>
      </div>
    </>
  );
});
