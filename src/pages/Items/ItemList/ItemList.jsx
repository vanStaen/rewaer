import React, { useEffect, useState, useRef, useCallback } from "react";
import { observer } from "mobx-react";

import { itemsStore } from "../itemsStore";
import { pageStore } from "../../../stores/pageStore/pageStore";
import { userStore } from "../../../stores/userStore/userStore";
import { GhostCard } from "../../../components/GhostCard/GhostCard";
import { ItemCard } from "../ItemCard/ItemCard";
import { UploadForm } from "../../../components/UploadForm/UploadForm";

export const ItemList = observer(() => {
  const containerElement = useRef(null);
  const [missingCardForFullRow, setMissingCardForFullRow] = useState(0);

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
    const countForm = pageStore.showOnlyFloatingForm ? 0 : 1;
    const numberItems = itemsStore.showPrivateItems
      ? displayArchived
        ? itemsStore.items.length + countForm
        : itemsStore.items.length + countForm - itemsStore.numberOfArchivedItem
      : displayArchived
      ? itemsStore.items.length + countForm - itemsStore.numberOfPrivateItem
      : itemsStore.items.length +
        countForm -
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
    pageStore.showFloatingForm,
    pageStore.showOnlyFloatingForm,
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
          <div>
            <ItemCard item={item} showDetailView={showDetailView} />
          </div>
        );
      }
    }
    return null;
  });

  return (
    <>
      <div ref={containerElement} className="items__container">
        <UploadForm page="items" />
        {itemList}
        <GhostCard
          numberOfCards={missingCardForFullRow}
          width="240px"
          height="385px"
        />
      </div>
    </>
  );
});
