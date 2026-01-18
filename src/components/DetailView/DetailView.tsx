import React, { useState, useRef, useEffect } from "react";
import { Spin } from "antd";

import { DetailReturnArrow } from "@components/DetailReturnArrow/DetailReturnArrow";
import { ImageEditBar } from "@components/ImageEditBar/ImageEditBar";
import { useMediaUrl } from "@hooks/useMediaUrl";
import { switchElement } from "./switchElement.js";

import "./DetailView.less";

// the required distance between touchStart and touchEnd to be detected as a swipe
const MIN_SWIPE_DISTANCE = 100;

interface DetailViewProps {
  isLoading: boolean;
  page: string;
  canEdit: boolean;
  selectedElement: any;
  setSelectedElement: (element: any) => void;
  showPrivate: boolean;
  children?: React.ReactNode;
}

export const DetailView = ({
  isLoading,
  page,
  canEdit,
  selectedElement,
  setSelectedElement,
  showPrivate,
  children,
}: DetailViewProps) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const throttling = useRef(false);
  const [mediaUrl, isLoadingMedia, loadingMediaError] = useMediaUrl(
    selectedElement.mediaId,
    "items",
    "m",
  );

  console.log("selectedElement in DetailView:", selectedElement);

  useEffect(() => {
    const url = new URL(window.location.href);
    history.pushState({}, "", url);
    window.addEventListener("keydown", keydownEventHandler);
    window.addEventListener("popstate", browserBackHandler);
    return () => {
      window.removeEventListener("keydown", keydownEventHandler);
      window.removeEventListener("popstate", browserBackHandler);
    };
  }, []);

  const browserBackHandler = (e: any) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    setSelectedElement(null);
  };

  const keydownEventHandler = (event: {
    key: string;
    preventDefault: () => void;
  }) => {
    const keyPressed = event.key.toLowerCase();
    if (keyPressed === "escape") {
      event.preventDefault();
      setSelectedElement(null);
    } else if (keyPressed === "arrowleft") {
      event.preventDefault();
      switchElement(false, showPrivate, page);
    } else if (keyPressed === "arrowright") {
      event.preventDefault();
      switchElement(true, showPrivate, page);
    }
  };

  const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchStart = (e: any) => {
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
        switchElement(false, showPrivate, page);
      } else if (isLeftSwipe) {
        switchElement(true, showPrivate, page);
      }
      setTimeout(() => {
        throttling.current = false;
      }, 500);
    }
  };

  return (
    <div
      className="detailview__container"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <DetailReturnArrow page={page} />
      <div className="itemdetail__imageWrap">
        {!canEdit && (
          <ImageEditBar
            page="items"
            loading={isLoadingMedia}
            error={!!loadingMediaError}
          />
        )}
        {isLoadingMedia ? (
          <div
            className="itemdetail__picture"
            id={`selected_item_picture_${selectedElement.id}`}
          >
            <div className="itemdetail__spinner">
              <Spin size="large" />
            </div>
          </div>
        ) : loadingMediaError ? (
          <div className="itemdetail__picture">
            <div className="itemdetail__spinner">MEDIA ERROR TODO</div>
          </div>
        ) : (
          <div
            className="itemdetail__picture"
            id={`selected_item_picture_${selectedElement.id}`}
            style={{
              background: `url(${mediaUrl})`,
            }}
          ></div>
        )}
      </div>

      {isLoading ? (
        <div className="itemdetail__itemContainer">
          <div className="itemdetail__spinner">
            <Spin size="large" />
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};
