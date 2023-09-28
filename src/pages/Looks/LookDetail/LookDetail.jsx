import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";

import { itemsStore } from "../../Items/itemsStore";
import { looksStore } from "../looksStore";
import { switchLook } from "./switchLook";
import { ItemPicker } from "./ItemPicker/ItemPicker";
import { LookDetailHeader } from "./LookDetailHeader/LookDetailHeader";
import { LookImageEditBar } from "./LookImageEditBar/LookImageEditBar";

import "./LookDetail.css";

// the required distance between touchStart and touchEnd to be detected as a swipe
const MIN_SWIPE_DISTANCE = 100;

export const LookDetail = observer(() => {
  const [displayPictureUrl, setDisplayPictureUrl] = useState(
    looksStore.selectedLook.mediaUrlMedium
  );
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const throttling = useRef(false);

  const browserBackHandler = (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    looksStore.setSelectedLook(null);
  };

  useEffect(() => {
    const url = new URL(window.location);
    history.pushState({}, "", url);
    window.addEventListener("keydown", keydownEventHandler);
    window.addEventListener("popstate", browserBackHandler);
    return () => {
      window.removeEventListener("popstate", browserBackHandler);
      window.removeEventListener("keydown", keydownEventHandler);
    };
  }, []);

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  useEffect(() => {
    setDisplayPictureUrl(looksStore.selectedLook.mediaUrlMedium);
  }, [looksStore.selectedLook]);

  useEffect(() => {
    itemsStore.loadItems();
  }, [itemsStore.isOutOfDate]);

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;
    if (throttling.current === false) {
      throttling.current = true;
      if (isRightSwipe) {
        switchLook(false, looksStore.showPrivateLooks);
      } else if (isLeftSwipe) {
        switchLook(true, looksStore.showPrivateLooks);
      }
      setTimeout(() => {
        throttling.current = false;
      }, 500);
    }
  };

  const keydownEventHandler = (event) => {
    const keyPressed = event.key.toLowerCase();
    if (keyPressed === "escape") {
      event.preventDefault();
      looksStore.setSelectedLook(null);
    } else if (keyPressed === "arrowleft") {
      event.preventDefault();
      switchLook(false, looksStore.showPrivateLooks);
    } else if (keyPressed === "arrowright") {
      event.preventDefault();
      switchLook(true, looksStore.showPrivateLooks);
    }
  };

  return (
    <div
      className="lookdetail__container"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <LookDetailHeader />
      <div className="lookdetail__imageWrap">
        <LookImageEditBar />
        <div
          className="lookdetail__pictureBlur"
          id={`selected_look_picture_blur_${looksStore.selectedLook._id}`}
          style={{
            background: `url(${displayPictureUrl})`,
          }}
        ></div>
        <div
          className="lookdetail__picture"
          id={`selected_look_picture_${looksStore.selectedLook._id}`}
          style={{
            background: `url(${displayPictureUrl})`,
          }}
        ></div>
      </div>
      {/*
        <div className="lookDetail__actionContainer">
          <LookDetailFormRadio
            title="private"
            element="private"
            data={[
              { code: false, en: "Public", de: "Öffentlich", fr: "Publique" },
              { code: true, en: "Private", de: "Privat", fr: "Privé" },
            ]}
            value={isPrivate}
            flipValueTo={setIsPrivate}
            selectedLook={looksStore.selectedLook}
            whatShouldBeRed={true}
            multiSelect={false}
            disabled={!looksStore.selectedLook.active}
            tooltip={t("looks.makePrivateLook")}
          />
          <LookDetailFormRadio
            title="active"
            element="active"
            data={[
              { code: true, en: "Active", de: "Aktiv", fr: "Actif" },
              { code: false, en: "Archived", de: "Archiviert", fr: "Archivé" },
            ]}
            value={isActive}
            flipValueTo={setIsActive}
            selectedLook={looksStore.selectedLook}
            whatShouldBeRed={false}
            multiSelect={false}
            disabled={false}
            tooltip={t("looks.archiveLook")}
          />
        </div>
        */}

      <ItemPicker />
    </div>
  );
});
