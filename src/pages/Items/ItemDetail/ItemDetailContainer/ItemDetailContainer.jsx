import React from "react";
import { Spin, notification } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { DropDownElement } from "@components/FormElement/DropDownElement";
import { StringElement } from "@components/FormElement/StringElement";
import { RadioElement } from "@components/FormElement/RadioElement.jsx";
import { itemsStore } from "../../itemsStore.ts";
import { userStore } from "@stores/userStore/userStore.js";
import { ItemSharedWithFriends } from "../ItemSharedWithFriends/ItemSharedWithFriends";

import {
  itemCategoryMen,
  itemCategoryWomen,
  itemCategoryNB,
} from "@lib/data/categories";
import { colors } from "@lib/data/colors";
import { pattern } from "@lib/data/pattern";
import { itemStatus } from "@lib/data/itemStatus";

import { capitalizeFirstLetter } from "@helpers/capitalizeFirstLetter";
import { updateGenericStringItem } from "../../actions/updateGenericStringItem";
import { updateGenericArrayStringItem } from "../../actions/updateGenericArrayStringItem";

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

  const handleChange = async (newValue, element) => {
    try {
      if (newValue.constructor === Array) {
        await updateGenericArrayStringItem(
          itemsStore.selectedItem.id,
          element,
          newValue,
        );
      } else {
        await updateGenericStringItem(
          itemsStore.selectedItem.id,
          element,
          newValue,
        );
      }
      notification.success({
        message: (
          <>
            <b>{capitalizeFirstLetter(element)}</b> -{" "}
            {t("main.changeSaved")}
          </>
        ),
        placement: "bottomRight",
      });
      itemsStore.setIsOutOfDate(true);
    } catch (error) {
      notification.error({
        message: error.message,
        placement: "bottomRight",
      });
    }
  };

  return (
    <div className="itemdetail__itemContainer">
      <div className="itemdetail__itemContainerDivisor">
        Item description and informations
      </div>
      <StringElement
        element="title"
        title="title"
        value={itemsStore.selectedItem.title}
        disabled={!itemsStore.selectedItem.active || isSharedItem}
        handleChange={handleChange}
      />
      <DropDownElement
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
        multiSelect={false}
        disabled={!itemsStore.selectedItem.active || isSharedItem}
        handleChange={handleChange}
      />
      <StringElement
        element="brand"
        title="brand"
        value={itemsStore.selectedItem.brand}
        disabled={!itemsStore.selectedItem.active || isSharedItem}
        handleChange={handleChange}
      />
      <DropDownElement
        title="color"
        element="colors"
        data={colors}
        value={itemsStore.selectedItem.colors && itemsStore.selectedItem.colors}
        selectedItem={itemsStore.selectedItem}
        multiSelect={true}
        disabled={!itemsStore.selectedItem.active || isSharedItem}
        handleChange={handleChange}
      />
      <DropDownElement
        title="pattern"
        element="pattern"
        data={pattern}
        value={itemsStore.selectedItem.pattern}
        selectedItem={itemsStore.selectedItem}
        multiSelect={false}
        disabled={!itemsStore.selectedItem.active || isSharedItem}
        handleChange={handleChange}
      />
      <StringElement
        element="size"
        title="size"
        value={itemsStore.selectedItem.size}
        disabled={!itemsStore.selectedItem.active || isSharedItem}
        handleChange={handleChange}
      />
      <br />
      <div className="itemdetail__itemContainerDivisor">
        The status of this item
      </div>
      <RadioElement
        title="status"
        element="status"
        data={itemStatus}
        value={itemsStore.selectedItem.status}
        selectedItem={itemsStore.selectedItem}
        multiSelect={false}
        disabled={!itemsStore.selectedItem.active || isSharedItem}
        tooltip={t("items.statusTooltip")}
      />
      <RadioElement
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
      <RadioElement
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
      <StringElement
        element="location"
        title="location"
        value={itemsStore.selectedItem.location}
        handleChange={handleChange}
        disabled={!itemsStore.selectedItem.active || isSharedItem}
        tooltip={t("items.notesTooltip")}
      />
      <StringElement
        element="notes"
        title="notes"
        value={itemsStore.selectedItem.notes}
        handleChange={handleChange}
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
