import React, { useEffect, useState, useRef, useCallback } from "react";
import { observer } from "mobx-react";

import { looksStore } from "../looksStore.js";
import { pageStore } from "../../../stores/pageStore/pageStore";
import { userStore } from "../../../stores/userStore/userStore.js";
import { ElementCard } from "../../../components/ElementCard/ElementCard";
import { UploadForm } from "../../../components/UploadForm/UploadForm";
import { GhostCard } from "../../../components/GhostCard/GhostCard";

export const LookList = observer(() => {
  const containerElement = useRef(null);
  const [missingCardForFullRow, setMissingCardForFullRow] = useState(0);

  const calculateMissingCardsForFullRow = useCallback(() => {
    const displayArchived = userStore.profilSettings
      ? userStore.profilSettings.displayArchived
      : false;
    const containerWidth =
      containerElement.current === null
        ? 0
        : containerElement.current.offsetWidth;
    const cardWidth = 238 + 40; // card width + min gap
    const numberPerRow = Math.floor(containerWidth / cardWidth, 1);
    const countForm = pageStore.showOnlyFloatingUploadForm ? 0 : 1;
    const numberLooks = looksStore.showPrivateLooks
      ? displayArchived
        ? looksStore.looks.length + countForm
        : looksStore.looks.length + countForm - looksStore.numberOfArchivedLook
      : displayArchived
        ? looksStore.looks.length + countForm - looksStore.numberOfPrivateLook
        : looksStore.looks.length +
          countForm -
          looksStore.numberOfPrivateLook -
          looksStore.numberOfArchivedLook;
    const numberFullRow = Math.floor(numberLooks / numberPerRow);
    const missingCards =
      numberPerRow - (numberLooks - numberFullRow * numberPerRow);
    setMissingCardForFullRow(missingCards === numberPerRow ? 0 : missingCards);
  }, [
    containerElement.current,
    looksStore.showPrivateLooks,
    userStore.profilSettings,
  ]);

  useEffect(() => {
    calculateMissingCardsForFullRow();
  }, [
    containerElement.current,
    missingCardForFullRow,
    calculateMissingCardsForFullRow,
    looksStore.numberOfPrivateLook,
    looksStore.numberOfArchivedLook,
    looksStore.showPrivateLooks,
    looksStore.looks,
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

  const scrollEventHandler = () => {
    looksStore.setLastKnownScrollPosition(window.scrollY);
  };

  const showDetailView = (look) => {
    looksStore.setSelectedLook(look);
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
      <UploadForm page="looks" />
      {lookList}
      <GhostCard
        numberOfCards={missingCardForFullRow}
        width="240px"
        height="385px"
      />
    </div>
  );
});
