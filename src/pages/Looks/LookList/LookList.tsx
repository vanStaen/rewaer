import React, { useEffect, useState, useRef, useCallback } from "react";
import { observer } from "mobx-react";

import { looksStore } from "../looksStore";
import { pageStore } from "@stores/pageStore/pageStore";
import { userStore } from "@stores/userStore/userStore.js";
import { ElementCard } from "@components/ElementCard/ElementCard";
import { UploadModal } from "@components/UploadModal/UploadModal";
import { GhostCard } from "@components/GhostCard/GhostCard";
import { calculateMissingCardsForFullRow } from "@helpers/calculateMissingCardsForFullRow";
import { Look } from "@type/lookTypes";
import { Item } from "@type/itemTypes";

export const LookList: React.FC = observer(() => {
  const containerElement = useRef<HTMLDivElement>(null);
  const [missingCardForFullRow, setMissingCardForFullRow] = useState<number>(0);

  const scrollEventHandler = (): void => {
    looksStore.setLastKnownScrollPosition(window.scrollY);
  };

  const calculateMissingCards = useCallback((): void => {
    const displayArchived = userStore.profilSettings?.displayArchived ?? false;
    const containerWidth = containerElement.current?.offsetWidth ?? 0;
    const countForm = pageStore.showOnlyFloatingUploadForm ? 0 : 1;
    
    const numberLooks = looksStore.showPrivateLooks
      ? displayArchived
        ? looksStore.looks.length + countForm
        : looksStore.looks.length + countForm - looksStore.numberOfArchivedLook
      : displayArchived
        ? looksStore.looks.length + countForm - looksStore.numberOfPrivateLook
        : looksStore.looks.length + countForm - looksStore.numberOfPrivateLook - looksStore.numberOfArchivedLook;
    
    const missingCards = calculateMissingCardsForFullRow(containerWidth, numberLooks);
    setMissingCardForFullRow(missingCards);
  }, [
    looksStore.showPrivateLooks,
    userStore.profilSettings,
    pageStore.showOnlyFloatingUploadForm,
    looksStore.numberOfPrivateLook,
    looksStore.numberOfArchivedLook,
    looksStore.looks.length,
  ]);

  useEffect(() => {
    window.addEventListener("resize", calculateMissingCards);
    window.addEventListener("scroll", scrollEventHandler);
    return () => {
      window.removeEventListener("resize", calculateMissingCards);
      window.removeEventListener("scroll", scrollEventHandler);
    };
  }, [calculateMissingCards]);

  useEffect(() => {
    calculateMissingCards();
  }, [
    calculateMissingCards,
    looksStore.numberOfPrivateLook,
    looksStore.numberOfArchivedLook,
    looksStore.showPrivateLooks,
    looksStore.looks,
    userStore.profilSettings,
  ]);

  const showDetailView = (look: Look | Item): void => {
    looksStore.setSelectedLook(look as Look);
    looksStore.setOriginalScrollPosition(looksStore.lastKnownScrollPosition);
  };

  const lookList = looksStore.looks.map((look) => {
    if (!look.private || looksStore.showPrivateLooks) {
      if (!look.active && !userStore.profilSettings?.displayArchived) {
        return null;
      } else {
        return (
          <div key={look.id}>
            <ElementCard
              element={look}
              showDetailView={showDetailView}
              type="looks"
            />
          </div>
        );
      }
    }
    return null;
  });

  return (
    <div ref={containerElement} className="looks__container">
      <UploadModal page="looks" />
      {lookList}
      <GhostCard
        numberOfCards={missingCardForFullRow}
        width="240px"
        height="385px"
      />
    </div>
  );
});
