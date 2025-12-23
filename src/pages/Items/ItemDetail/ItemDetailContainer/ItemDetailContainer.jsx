import React from "react";
import { Spin } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { ItemDetailFormDropDown } from "../ItemDetailFormElement/ItemDetailFormDropDown";
import { ItemDetailFormStringElement } from "../ItemDetailFormElement/ItemDetailFormStringElement";
import { ItemDetailFormRadio } from "../ItemDetailFormElement/ItemDetailFormRadio";
import { itemsStore } from "../../itemsStore.js";
import { userStore } from "../../../../stores/userStore/userStore.js";
import { ItemSharedWithFriends } from "../ItemSharedWithFriends/ItemSharedWithFriends";

import {
  itemCategoryMen,
  itemCategoryWomen,
  itemCategoryNB,
} from "../../../../lib/data/categories";
import { colors } from "../../../../lib/data/colors";
import { pattern } from "../../../../lib/data/pattern";
import { itemStatus } from "../../../../lib/data/itemStatus";

import "./ItemDetailContainer.less";

export const ItemDetailContainer = observer(({ isSharedItem }) => {
  const { t } = useTranslation();

  if (itemsStore.isLoading) {
    return (
      <div className="itemdetail__itemContainer">
        <div className="itemdetail__spinner">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="itemdetail__itemContainer">
      <div className="itemdetail__itemContainerDivisor">
        Item description and informations
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
        value={itemsStore.selectedItem.colors && itemsStore.selectedItem.colors}
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
      <ItemDetailFormStringElement
        element="size"
        title="size"
        value={itemsStore.selectedItem.size}
        selectedItem={itemsStore.selectedItem}
        disabled={!itemsStore.selectedItem.active || isSharedItem}
      />
      <br />
      <div className="itemdetail__itemContainerDivisor">
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
      <div className="itemdetail__itemContainerDivisor">
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
          <div className="itemdetail__itemContainerDivisor">
            Friends who can access this item
          </div>
          <ItemSharedWithFriends />
        </>
      )}
    </div>
  );
});
