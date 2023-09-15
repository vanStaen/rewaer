import React, { useEffect, useState } from "react";
import { Spin, Tooltip } from "antd";
import { observer } from "mobx-react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { ItemDetailFormDropDown } from "./ItemDetailFormElement/ItemDetailFormDropDown";
import { ItemDetailFormStringElement } from "./ItemDetailFormElement/ItemDetailFormStringElement";
import { ItemDetailFormRadio } from "./ItemDetailFormElement/ItemDetailFormRadio";
import { itemsStore } from "../itemsStore";
import { userStore } from "../../../stores/userStore/userStore";
import { ItemShareWithFriends } from "./ItemShareWithFriends/itemShareWithFriends";
import { switchItem } from "./switchItem";

import {
  itemCategoryMen,
  itemCategoryWomen,
  itemCategoryNB,
} from "../../../lib/data/categories";
import { colors } from "../../../lib/data/colors";
import { pattern } from "../../../lib/data/pattern";
import { itemStatus } from "../../../lib/data/itemStatus";

import "./ItemDetail.css";

export const ItemDetail = observer(() => {
  const { t } = useTranslation();

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

  return (
    <div className="itemdetail__container">
      <div className="itemdetail__backArrow">
        <Tooltip placement="bottomRight" title={t("items.backToItems")}>
          <ArrowLeftOutlined
            className="itemdetail__arrowIcon"
            onClick={() => {
              itemsStore.setSelectedItem(null);
            }}
          />
        </Tooltip>
      </div>

      <div className="itemdetail__imageWrap">
        <div
          className="itemdetail__pictureBlur"
          id={`selected_item_picture_${itemsStore.selectedItem._id}`}
          style={{
            background: `url(${itemsStore.selectedItem.mediaUrlMedium})`,
          }}
        ></div>
        <div
          className="itemdetail__picture"
          id={`selected_item_picture_${itemsStore.selectedItem._id}`}
          style={{
            background: `url(${itemsStore.selectedItem.mediaUrlMedium})`,
          }}
        ></div>
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
            disabled={!itemsStore.selectedItem.active}
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
            disabled={!itemsStore.selectedItem.active}
          />
          <ItemDetailFormStringElement
            element="brand"
            title="brand"
            value={itemsStore.selectedItem.brand}
            selectedItem={itemsStore.selectedItem}
            disabled={!itemsStore.selectedItem.active}
          />
          <ItemDetailFormDropDown
            title="colors"
            element="colors"
            data={colors}
            value={
              itemsStore.selectedItem.colors &&
              itemsStore.selectedItem.colors[0]
            }
            selectedItem={itemsStore.selectedItem}
            multiSelect={true}
            disabled={!itemsStore.selectedItem.active}
          />
          <ItemDetailFormDropDown
            title="pattern"
            element="pattern"
            data={pattern}
            value={itemsStore.selectedItem.pattern}
            selectedItem={itemsStore.selectedItem}
            multiSelect={false}
            disabled={!itemsStore.selectedItem.active}
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
            disabled={!itemsStore.selectedItem.active}
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
            disabled={!itemsStore.selectedItem.active}
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
            disabled={false}
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
            disabled={!itemsStore.selectedItem.active}
            tooltip={t("items.notesTooltip")}
          />
          <ItemDetailFormStringElement
            element="notes"
            title="notes"
            value={itemsStore.selectedItem.notes}
            selectedItem={itemsStore.selectedItem}
            disabled={!itemsStore.selectedItem.active}
            tooltip={t("items.notesTooltip")}
          />
          <br />
          <div className="itemDetail__itemContainerDivisor">
            Friends who can access this item
          </div>
          <ItemShareWithFriends />
        </div>
      )}
    </div>
  );
});
