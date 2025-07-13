import React, { useEffect, useState, useRef } from "react";
import { Spin } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { ItemDetailFormDropDown } from "./ItemDetailFormElement/ItemDetailFormDropDown";
import { ItemDetailFormStringElement } from "./ItemDetailFormElement/ItemDetailFormStringElement";
import { ItemDetailFormRadio } from "./ItemDetailFormElement/ItemDetailFormRadio";
import { itemsStore } from "../itemsStore.js";
import { userStore } from "../../../stores/userStore/userStore.js";
import { ItemSharedWithFriends } from "./ItemSharedWithFriends/ItemSharedWithFriends";
import { switchItem } from "./switchItem";
import { DetailReturnArrow } from "../../../components/DetailReturnArrow/DetailReturnArrow";
import { ImageEditBar } from "../../../components/ImageEditBar/ImageEditBar";
import {getPictureUrl} from "../../../helpers/picture/getPictureUrl";

import {
  itemCategoryMen,
  itemCategoryWomen,
  itemCategoryNB,
} from "../../../lib/data/categories";
import { colors } from "../../../lib/data/colors";
import { pattern } from "../../../lib/data/pattern";
import { itemStatus } from "../../../lib/data/itemStatus";

import "./ItemDetail.css";

// the required distance between touchStart and touchEnd to be detected as a swipe
const MIN_SWIPE_DISTANCE = 100;

export const ItemDetail = observer(() => {
  const { t } = useTranslation();
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const throttling = useRef(false);
  const [mediaUrl, setMediaUrl] = useState(null);
  const [loadingMediaError, setLoadingMediaError] = useState(false);
  const [isLoadingMedia, setIsLoadingMedia] = useState(true);
  const isSharedItem = parseInt(itemsStore.selectedItem.user.id) !== userStore.id;

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


  const imageLoadingHander = async () => {
      setIsLoadingMedia(true);
      try {
          const url = await getPictureUrl(itemsStore.selectedItem.mediaId, 'items');
          const isloaded = new Promise((resolve, reject) => {
            const loadImg = new Image();
            loadImg.src = url;
            loadImg.onload = () => resolve(url);
            loadImg.onerror = (err) => reject(err);
          });
          await isloaded;
          console.log('url', url)
          setMediaUrl(url);
      } catch (e) {
        setLoadingMediaError(true);
        console.log(e);
      }
      setIsLoadingMedia(false);
    };

  useEffect(() => {
    imageLoadingHander();
  }, [itemsStore.selectedItem.mediaId]);

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

  // TODO: improve spinner/loader

  return (
    <div
      className="itemdetail__container"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <DetailReturnArrow page="item" />

      <div className="itemdetail__imageWrap">
        <ImageEditBar page="item" />
        { isLoadingMedia ? 
        <div
          className="itemdetail__picture"
          id={`selected_item_picture_${itemsStore.selectedItem.id}`}
        > <div
              className="item__spinner"
              onClick={() => {
                if (props.item.active) {
                  props.showDetailView(props.item);
                }
              }}
            >
              <Spin size="middle" />
            </div> 
          </div>
         :
        <div
          className="itemdetail__picture"
          id={`selected_item_picture_${itemsStore.selectedItem.id}`}
          style={{
            background: `url(${mediaUrl})`,
          }}
        ></div> 
      }
      </div>

      {itemsStore.isLoading ? (
        <div className="itemDetail__itemContainer">
          <div className="itemDetail__spinner">
            <Spin size="large" />
          </div>
        </div>
      ) : (
        <div className="itemDetail__itemContainer">
          <div className="itemDetail__itemContainerDivisor">
            Item's description and informations
          </div>
          <ItemDetailFormStringElement
            element="title"
            title="title"
            value={itemsStore.selectedItem.title}
            selectedItem={itemsStore.selectedItem}
            disabled={!itemsStore.selectedItem.active || isSharedItem}
          />
          <ItemDetailFormDropDown
            title="category"
            element="category"
            data={
              userStore.gender === 1
                ? itemCategoryMen
                : userStore.gender === 2
                  ? itemCategoryWomen
                  : itemCategoryNB
            }
            value={itemsStore.selectedItem.category}
            selectedItem={itemsStore.selectedItem}
            multiSelect={false}
            disabled={!itemsStore.selectedItem.active || isSharedItem}
          />
          <ItemDetailFormStringElement
            element="brand"
            title="brand"
            value={itemsStore.selectedItem.brand}
            selectedItem={itemsStore.selectedItem}
            disabled={!itemsStore.selectedItem.active || isSharedItem}
          />
          <ItemDetailFormDropDown
            title="color"
            element="colors"
            data={colors}
            value={
              itemsStore.selectedItem.colors && itemsStore.selectedItem.colors
            }
            selectedItem={itemsStore.selectedItem}
            multiSelect={true}
            disabled={!itemsStore.selectedItem.active || isSharedItem}
          />
          <ItemDetailFormDropDown
            title="pattern"
            element="pattern"
            data={pattern}
            value={itemsStore.selectedItem.pattern}
            selectedItem={itemsStore.selectedItem}
            multiSelect={false}
            disabled={!itemsStore.selectedItem.active || isSharedItem}
          />
          <br />
          <div className="itemDetail__itemContainerDivisor">
            The status of this item
          </div>
          <ItemDetailFormRadio
            title="status"
            element="status"
            data={itemStatus}
            value={itemsStore.selectedItem.status}
            selectedItem={itemsStore.selectedItem}
            multiSelect={false}
            disabled={!itemsStore.selectedItem.active || isSharedItem}
            tooltip={t("items.statusTooltip")}
          />
          <ItemDetailFormRadio
            title="private"
            element="private"
            data={[
              { code: false, en: "Public", de: "Öffentlich", fr: "Publique" },
              { code: true, en: "Private", de: "Privat", fr: "Privé" },
            ]}
            value={itemsStore.selectedItem.private}
            selectedItem={itemsStore.selectedItem}
            whatShouldBeRed={true}
            multiSelect={false}
            disabled={!itemsStore.selectedItem.active || isSharedItem}
            tooltip={t("items.makePrivateItem")}
          />
          <ItemDetailFormRadio
            title="active"
            element="active"
            data={[
              { code: true, en: "Active", de: "Aktiv", fr: "Actif" },
              { code: false, en: "Archived", de: "Archiviert", fr: "Archivé" },
            ]}
            value={itemsStore.selectedItem.active}
            selectedItem={itemsStore.selectedItem}
            whatShouldBeRed={false}
            multiSelect={false}
            disabled={isSharedItem}
            tooltip={t("items.archiveItem")}
          />
          <br />
          <div className="itemDetail__itemContainerDivisor">
            Details on the where about of this item
          </div>
          <ItemDetailFormStringElement
            element="location"
            title="location"
            value={itemsStore.selectedItem.location}
            selectedItem={itemsStore.selectedItem}
            disabled={!itemsStore.selectedItem.active || isSharedItem}
            tooltip={t("items.notesTooltip")}
          />
          <ItemDetailFormStringElement
            element="notes"
            title="notes"
            value={itemsStore.selectedItem.notes}
            selectedItem={itemsStore.selectedItem}
            disabled={!itemsStore.selectedItem.active || isSharedItem}
            tooltip={t("items.notesTooltip")}
          />
          <br />
          {!isSharedItem && (
            <>
              <div className="itemDetail__itemContainerDivisor">
                Friends who can access this item
              </div>
              <ItemSharedWithFriends />
            </>
          )}
        </div>
      )}
    </div>
  );
});
