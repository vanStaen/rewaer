import React, { useEffect, useState, useRef, useCallback } from "react";
import { observer } from "mobx-react";

import { itemsStore } from "../itemsStore.js";
import { pageStore } from "../../../stores/pageStore/pageStore";
import { userStore } from "../../../stores/userStore/userStore.js";
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

  // TODO: implement lazy loading for items

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
    const cardWidth = 238 + 40; // row width + min gap
    const numberPerRow = Math.floor(containerWidth / cardWidth, 1);
    const countForm = pageStore.showOnlyFloatingUploadForm ? 0 : 1;
    const numberItemsArchived = displayArchived
      ? 0
      : itemsStore.numberOfArchivedItem;
    const numberItemsPrivates = itemsStore.showPrivateItems
      ? 0
      : itemsStore.numberOfPrivateItem;
    const numberItems =
      itemsStore.items.length +
      countForm -
      numberItemsArchived -
      numberItemsPrivates;
    const numberFullRow = Math.floor(numberItems / numberPerRow);
    const missingCards =
      numberPerRow - (numberItems - numberFullRow * numberPerRow);
    setMissingCardForFullRow(missingCards === numberPerRow ? 0 : missingCards);
  }, [
    containerElement.current,
    itemsStore.showPrivateItems,
    userStore.profilSettings,
    pageStore.showFloatingUploadForm,
    pageStore.showOnlyFloatingUploadForm,
  ]);

  const showDetailView = (item) => {
    itemsStore.setSelectedItem(item);
    itemsStore.setOriginalScrollPosition(itemsStore.lastKnownScrollPosition);
  };

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

  const itemList = itemsStore.items.map((item) => {
    if (!item.private || itemsStore.showPrivateItems) {
      if (!item.active && !userStore.profilSettings?.displayArchived) {
        return null;
      } else {
        return (
          <div key={item.id}>
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
