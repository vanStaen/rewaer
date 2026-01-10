import React, { useEffect, useState, useRef, useCallback } from "react";
import { observer } from "mobx-react";

import { itemsStore } from "../itemsStore";
import { pageStore } from "@stores/pageStore/pageStore";
import { userStore } from "@stores/userStore/userStore.js";
import { GhostCard } from "@components/GhostCard/GhostCard";
import { ElementCard } from "@components/ElementCard/ElementCard";
import { UploadModal } from "@components/UploadModal/UploadModal";
import { calculateMissingCardsForFullRow } from "@helpers/calculateMissingCardsForFullRow";
import { Item } from "@type/itemTypes";
import { Look } from "@type/lookTypes";

export const ItemList: React.FC = observer(() => {
  const containerElement = useRef<HTMLDivElement>(null);
  const [missingCardForFullRow, setMissingCardForFullRow] = useState<number>(0);

  const scrollEventHandler = (): void => {
    itemsStore.setLastKnownScrollPosition(window.scrollY);
  };

  const calculateMissingCards = useCallback((): void => {
    const displayArchived = userStore.profilSettings?.displayArchived ?? false;
    const containerWidth = containerElement.current?.offsetWidth ?? 0;
    
    const numberItemsArchived = displayArchived ? 0 : itemsStore.numberOfArchivedItem;
    const numberItemsPrivates = itemsStore.showPrivateItems ? 0 : itemsStore.numberOfPrivateItem;
    const countForm = pageStore.showOnlyFloatingUploadForm ? 0 : 1;
    
    const totalItems =
      itemsStore.items.length + countForm - numberItemsArchived - numberItemsPrivates;
    
    const missingCards = calculateMissingCardsForFullRow(containerWidth, totalItems);
    setMissingCardForFullRow(missingCards);
  }, [
    itemsStore.showPrivateItems,
    userStore.profilSettings,
    pageStore.showOnlyFloatingUploadForm,
    itemsStore.numberOfPrivateItem,
    itemsStore.numberOfArchivedItem,
    itemsStore.items.length,
  ]);

  useEffect(() => {
    window.addEventListener("scroll", scrollEventHandler);
    window.addEventListener("resize", calculateMissingCards);
    return () => {
      window.removeEventListener("scroll", scrollEventHandler);
      window.removeEventListener("resize", calculateMissingCards);
    };
  }, [calculateMissingCards]);

  const showDetailView = (item: Item | Look): void => {
    itemsStore.setSelectedItem(item as Item);
    itemsStore.setOriginalScrollPosition(itemsStore.lastKnownScrollPosition);
  };

  useEffect(() => {
    calculateMissingCards();
  }, [
    calculateMissingCards,
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
            <ElementCard
              element={item}
              showDetailView={showDetailView}
              type="items"
            />
          </div>
        );
      }
    }
    return null;
  });

  return (
    <>
      <div ref={containerElement} className="items__container">
        <UploadModal page="items" />
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
