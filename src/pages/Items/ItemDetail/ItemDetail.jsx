import React, { useEffect, useState, useRef } from "react";
import { Spin } from "antd";
import { observer } from "mobx-react";

import { itemsStore } from "../itemsStore.js";
import { userStore } from "../../../stores/userStore/userStore.js";
import { switchItem } from "./switchItem";
import { DetailReturnArrow } from "../../../components/DetailReturnArrow/DetailReturnArrow";
import { ImageEditBar } from "../../../components/ImageEditBar/ImageEditBar.tsx";
import { useMediaUrl } from "../../../hooks/useMediaUrl";
import { ItemDetailContainer } from "./ItemDetailContainer/ItemDetailContainer";

import "./ItemDetail.less";

// the required distance between touchStart and touchEnd to be detected as a swipe
const MIN_SWIPE_DISTANCE = 100;

export const ItemDetail = observer((props) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const throttling = useRef(false);
  const [mediaUrl, isLoadingMedia, loadingMediaError] = useMediaUrl(
    itemsStore.selectedItem.mediaId,
    "items",
    "m",
  );

  const isSharedItem =
    parseInt(itemsStore.selectedItem.user.id) !== userStore.id;

  useEffect(() => {
    const url = new URL(window.location);
    history.pushState({}, "", url);
    window.addEventListener("keydown", keydownEventHandler);
    window.addEventListener("popstate", browserBackHandler);
    return () => {
      window.removeEventListener("keydown", keydownEventHandler);
      window.removeEventListener("popstate", browserBackHandler);
    };
  }, []);

  const browserBackHandler = (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    itemsStore.setSelectedItem(null);
  };

  const keydownEventHandler = (event) => {
    const keyPressed = event.key.toLowerCase();
    if (keyPressed === "escape") {
      event.preventDefault();
      itemsStore.setSelectedItem(null);
    } else if (keyPressed === "arrowleft") {
      event.preventDefault();
      switchItem(false, itemsStore.showPrivateItems);
    } else if (keyPressed === "arrowright") {
      event.preventDefault();
      switchItem(true, itemsStore.showPrivateItems);
    }
  };

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
        switchItem(false, itemsStore.showPrivateItems);
      } else if (isLeftSwipe) {
        switchItem(true, itemsStore.showPrivateItems);
      }
      setTimeout(() => {
        throttling.current = false;
      }, 500);
    }
  };

  return (
    <div
      className="itemdetail__container"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <DetailReturnArrow page="item" />
      <div className="itemdetail__imageWrap">
        {!isSharedItem && <ImageEditBar page="items" />}
        {isLoadingMedia ? (
          <div
            className="itemdetail__picture"
            id={`selected_item_picture_${itemsStore.selectedItem.id}`}
          >
            <div
              className="itemdetail__spinner"
              onClick={() => {
                if (props.item.active) {
                  props.showDetailView(props.item);
                }
              }}
            >
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
            id={`selected_item_picture_${itemsStore.selectedItem.id}`}
            style={{
              background: `url(${mediaUrl})`,
            }}
          ></div>
        )}
      </div>

      {itemsStore.isLoading ? (
        <div className="itemdetail__itemContainer">
          <div className="itemdetail__spinner">
            <Spin size="large" />
          </div>
        </div>
      ) : (
        <ItemDetailContainer isSharedItem={isSharedItem} />
      )}
    </div>
  );
});
