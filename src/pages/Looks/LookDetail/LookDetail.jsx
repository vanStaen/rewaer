import React, { useEffect, useState, useRef } from "react";
import { Spin } from "antd";
import { observer } from "mobx-react";

import { itemsStore } from "../../Items/itemsStore";
import { looksStore } from "../looksStore.js";
import { switchLook } from "./switchLook";
import { ItemPicker } from "./ItemPicker/ItemPicker";
import { LookDetailHeader } from "./LookDetailHeader/LookDetailHeader";
import { ImageEditBar } from "../../../components/ImageEditBar/ImageEditBar";
import { useMediaUrl } from "../../../hooks/useMediaUrl";

import "./LookDetail.css";

// the required distance between touchStart and touchEnd to be detected as a swipe
const MIN_SWIPE_DISTANCE = 100;

export const LookDetail = observer(() => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const throttling = useRef(false);
  const [mediaUrl, isLoadingMedia, loadingMediaError] = useMediaUrl(
    looksStore.selectedLook.mediaId,
    "looks",
    "m"
  );

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

  useEffect(() => {
    itemsStore.loadItems();
  }, [itemsStore.isOutOfDate]);

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

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
        <ImageEditBar page="looks" />
        {isLoadingMedia ? (
          <div
            className="lookdetail__picture"
            id={`selected_look_picture_${looksStore.selectedLook.id}`}
          >
            <div className="lookdetail__spinner">
              <Spin size="large" />
            </div>
          </div>
        ) : loadingMediaError ? (
          <div className="lookdetail__picture">
            <div className="lookdetail__spinner">MEDIA ERROR TODO</div>
          </div>
        ) : (
          <>
            <div
              className="lookdetail__pictureBlur"
              id={`selected_look_picture_blur_${looksStore.selectedLook.id}`}
              style={{
                background: `url(${mediaUrl})`,
              }}
            ></div>
            <div
              className="lookdetail__picture"
              id={`selected_look_picture_${looksStore.selectedLook.id}`}
              style={{
                background: `url(${mediaUrl})`,
              }}
            ></div>
          </>
        )}
      </div>
      <ItemPicker />
    </div>
  );
});
