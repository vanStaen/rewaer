import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Spin } from "antd";
import { useTranslation } from "react-i18next";

import { itemsStore } from "../../../Items/itemsStore";
import { looksStore } from "../../looksStore.js";
import { updateItemsLook } from "../../actions/updateItemsLook";
import { ItemPickerCard } from "./ItemPickerCard";

import "./ItemPicker.less";

export const ItemPicker: React.FC = observer(() => {
  const { t } = useTranslation();

  const selectedLook = looksStore.selectedLook || { id: 0, items: [], active: false };

  const [isActive, setIsActive] = useState<boolean>(selectedLook.active);
  const [selectedItems, setSelectedItems] = useState<number[]>(
    selectedLook.items ? selectedLook.items : [],
  );

  useEffect(() => {
    if (!looksStore.selectedLook) return;
    setIsActive(selectedLook.active);
    setSelectedItems(selectedLook.items);
  }, [looksStore.selectedLook]);

  const itemClickHandler = (value: number | string): void => {
    const valueAsInt = parseInt(value.toString());
    const indexOfValue = selectedItems.indexOf(valueAsInt);
    if (!isActive) {
      return;
    }
    if (indexOfValue < 0) {
      setSelectedItems([...selectedItems, valueAsInt]);
      updateItemsLook(selectedLook.id, [
        ...selectedItems,
        valueAsInt,
      ]);
    } else {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== valueAsInt));
      updateItemsLook(
        selectedLook.id,
        selectedItems.filter((itemId) => itemId !== valueAsInt),
      );
    }
    looksStore.setIsOutOfDate(true);
  };

  const itemList = itemsStore.items.map((item) => {
    const isSelected = selectedItems.indexOf(parseInt(item.id.toString())) >= 0;
    if (!isSelected) {
      if (!item.active) {
        return null;
      } else {
        if (item.private && !looksStore.showPrivateLooks) {
          return null;
        } else {
          return (
            <ItemPickerCard
              key={item.id}
              item={item}
              isSelected={false}
              onClick={() => itemClickHandler(item.id)}
            />
          );
        }
      }
    }
    return null;
  });

  const selectedItemList = itemsStore.items.map((item) => {
    const isSelected = selectedItems.indexOf(parseInt(item.id.toString())) >= 0;
    if (isSelected) {
      return (
        <ItemPickerCard
          key={item.id}
          item={item}
          isSelected={true}
          onClick={() => itemClickHandler(item.id)}
        />
      );
    }
    return null;
  });

  return (
    <div className="itemPicker__container">
      {itemsStore.isLoading ? (
        <div className="itemPicker__spinner">
          <Spin size="large" />
        </div>
      ) : (
        <div className="itemPicker__itemContainer">
          {selectedItems.length > 0 && (
            <div className="itemPicker__itemContainerSelected">
              <div className="itemPicker__itemContainerDivisor">
                {t("looks.itemPartOfThisLook")}
              </div>
              <div>{selectedItemList}</div>
              <div className="itemPicker__itemSpacer"></div>
            </div>
          )}
          {isActive && (
            <div>
              <div className="itemPicker__itemContainerDivisorAllItems">
                {t("looks.yourItems")}
              </div>
              <div>{itemList}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});
