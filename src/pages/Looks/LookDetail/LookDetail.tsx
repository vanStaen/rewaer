import React, { useEffect, useState, useRef } from "react";
import { Spin } from "antd";
import { observer } from "mobx-react";

import { FileImageOutlined } from "@ant-design/icons";

import { itemsStore } from "../../Items/itemsStore";
import { looksStore } from "../looksStore";
import { switchLook } from "./switchLook";
import { ItemPicker } from "./ItemPicker/ItemPicker";
import { LookDetailHeader } from "./LookDetailHeader/LookDetailHeader";
import { ImageEditBar } from "@components/ImageEditBar/ImageEditBar";
import { useMediaUrl } from "@hooks/useMediaUrl";

import "./LookDetail.less";

// the required distance between touchStart and touchEnd to be detected as a swipe
const MIN_SWIPE_DISTANCE = 100;

export const LookDetail: React.FC = observer(() => {
  const selectedLook = looksStore.selectedLook || {
    id: 0,
    items: [],
    active: false,
    mediaId: "",
  };
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const throttling = useRef<boolean>(false);
  const [mediaUrl, isLoadingMedia, loadingMediaError] = useMediaUrl(
    selectedLook.mediaId,
    "looks",
    "m",
  );

  const browserBackHandler = (e: PopStateEvent): void => {
    e.preventDefault();
    e.stopImmediatePropagation();
    looksStore.setSelectedLook(null);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    history.pushState({}, "", url.toString());
    window.addEventListener("keydown", keydownEventHandler);
    window.addEventListener("popstate", browserBackHandler as any);
    return () => {
      window.removeEventListener("popstate", browserBackHandler as any);
      window.removeEventListener("keydown", keydownEventHandler);
    };
  }, []);

  useEffect(() => {
    itemsStore.loadItems();
  }, [itemsStore.isOutOfDate]);

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>): void =>
    setTouchEnd(e.touches[0].clientX);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.touches[0].clientX);
  };

  const onTouchEnd = (): void => {
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

  const keydownEventHandler = (event: KeyboardEvent): void => {
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
        <ImageEditBar
          page="looks"
          loading={isLoadingMedia}
          error={!!loadingMediaError}
        />
        {isLoadingMedia ? (
          <div
            className="lookdetail__picture"
            id={`selected_look_picture_${selectedLook.id}`}
          >
            <div className="lookdetail__spinner">
              <Spin size="large" />
            </div>
          </div>
        ) : loadingMediaError ? (
          <div className="lookdetail__picture">
            <div className="lookdetail__error">
              <FileImageOutlined />
              <div style={{ fontSize: "15px", marginTop: 18 }}>
                File not found
              </div>
            </div>
          </div>
        ) : (
          <>
            <div
              className="lookdetail__pictureBlur"
              id={`selected_look_picture_blur_${selectedLook.id}`}
              style={{
                background: `url(${mediaUrl})`,
              }}
            ></div>
            <div
              className="lookdetail__picture"
              id={`selected_look_picture_${selectedLook.id}`}
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
