import React, { useEffect, useState, useRef, useCallback } from "react";
import { observer } from "mobx-react";
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";

import { itemsStore } from "../itemsStore";
import { userStore } from "../../../stores/userStore/userStore";
import { GhostCard } from "../../../components/GhostCard/GhostCard";
import { ItemCard } from "../ItemCard/ItemCard";
import { ItemForm } from "../ItemForm/ItemForm";

export const ItemList = observer((props) => {
  const containerElement = useRef(null);
  const [missingCardForFullRow, setMissingCardForFullRow] = useState(0);
  const { t } = useTranslation();

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
    return () => {
      window.removeEventListener("resize", calculateMissingCardsForFullRow);
    };
  }, []);

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

  const showDetailView = (id) => {
    itemsStore.setSelectedItemId(id);
    itemsStore.setOriginalScrollPosition(itemsStore.lastKnownScrollPosition);
  };

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

  return (
    <div ref={containerElement}>
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
  );
});
