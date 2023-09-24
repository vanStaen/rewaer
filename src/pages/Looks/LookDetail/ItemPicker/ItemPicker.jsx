import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Spin } from "antd";
import { useTranslation } from "react-i18next";

import { itemsStore } from "../../../Items/itemsStore";
import { looksStore } from "../../looksStore";
import { updateItemsLook } from "../../actions/updateItemsLook";

import "./ItemPicker.less";

export const ItemPicker = observer((props) => {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(looksStore.selectedLook.active);
  const [selectedItems, setSelectedItems] = useState(
    looksStore.selectedLook.items ? looksStore.selectedLook.items : []
  );

  useEffect(() => {
    setIsActive(looksStore.selectedLook.active);
    setSelectedItems(looksStore.selectedLook.items);
  }, [looksStore.selectedLook]);

  const itemClickHandler = (value) => {
    const valueAsInt = parseInt(value);
    const indexOfValue = selectedItems.indexOf(valueAsInt);
    if (!isActive) {
      return null;
    }
    if (indexOfValue < 0) {
      setSelectedItems([...selectedItems, valueAsInt]);
      updateItemsLook(looksStore.selectedLook._id, [
        ...selectedItems,
        valueAsInt,
      ]);
    } else {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== valueAsInt));
      updateItemsLook(
        looksStore.selectedLook._id,
        selectedItems.filter((itemId) => itemId !== valueAsInt)
      );
    }
    looksStore.setIsOutOfDate(true);
  };

  const itemList = itemsStore.items.map((item) => {
    const isSelected = selectedItems.indexOf(parseInt(item._id)) >= 0;
    if (!isSelected) {
      if (!item.active) {
        return null;
      } else {
        if (item.private && !looksStore.showPrivateLooks) {
          return null;
        } else {
          return (
            <div
              className={"itemPicker__item"}
              onClick={() => itemClickHandler(item._id)}
              key={item._id}
              style={{
                background: `url(${item.mediaUrlMedium})`,
              }}
            ></div>
          );
        }
      }
    }
    return null;
  });

  const selectedItemList = itemsStore.items.map((item) => {
    const isSelected = selectedItems.indexOf(parseInt(item._id)) >= 0;
    if (isSelected) {
      return (
        <div
          className={"itemPicker__itemSelected"}
          onClick={() => itemClickHandler(item._id)}
          key={item._id}
          style={{
            background: `url(${item.mediaUrlMedium})`,
          }}
        ></div>
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
