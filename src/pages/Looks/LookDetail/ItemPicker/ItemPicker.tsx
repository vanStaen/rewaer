import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Spin } from "antd";
import { useTranslation } from "react-i18next";

import { itemsStore } from "../../../Items/itemsStore";
import { looksStore } from "../../looksStore";
import { updateItemsLook } from "../../actions/updateItemsLook";
import { ItemPickerCard } from "./ItemPickerCard";

import "./ItemPicker.less";

export const ItemPicker: React.FC = observer(() => {
  const { t } = useTranslation();
  const selectedLook = looksStore.selectedLook || {
    id: 0,
    items: [],
    active: false,
  };
  const [isEdit, setIsEdit] = useState<boolean>(false); // TODO (isEdit should be always false if !isActive)
  const [isActive, setIsActive] = useState<boolean>(selectedLook.active);
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>(
    selectedLook.items
      ? selectedLook.items.map((item) =>
          typeof item === "number" ? item : parseInt(item.id.toString()),
        )
      : [],
  );

  useEffect(() => {
    if (!looksStore.selectedLook) return;
    setIsActive(selectedLook.active);
    setSelectedItemIds(
      selectedLook.items
        ? selectedLook.items.map((item) =>
            typeof item === "number" ? item : parseInt(item.id.toString()),
          )
        : [],
    );
  }, [looksStore.selectedLook]);

  const itemClickHandler = (value: number | string): void => {
    if (!isEdit) {
      // TODO: Link to item
      return;
    }

    const valueAsInt = parseInt(value.toString());
    const indexOfValue = selectedItemIds.indexOf(valueAsInt);
    if (!isActive) {
      return;
    }
    if (indexOfValue < 0) {
      setSelectedItemIds([...selectedItemIds, valueAsInt]);
      updateItemsLook(selectedLook.id, [...selectedItemIds, valueAsInt]);
    } else {
      setSelectedItemIds(
        selectedItemIds.filter((itemId) => itemId !== valueAsInt),
      );
      updateItemsLook(
        selectedLook.id,
        selectedItemIds.filter((itemId) => itemId !== valueAsInt),
      );
    }
    looksStore.setIsOutOfDate(true);
  };

  const itemList = itemsStore.items.map((item) => {
    const isSelected =
      selectedItemIds.indexOf(parseInt(item.id.toString())) >= 0;
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
              isEdit={false}
            />
          );
        }
      }
    }
    return null;
  });

  const selectedItemList = itemsStore.items.map((item) => {
    const isSelected =
      selectedItemIds.indexOf(parseInt(item.id.toString())) >= 0;
    if (isSelected) {
      return (
        <ItemPickerCard
          key={item.id}
          item={item}
          isSelected={true}
          onClick={() => itemClickHandler(item.id)}
          isEdit={isEdit}
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
          {selectedItemIds.length > 0 && (
            <div className="itemPicker__itemContainerSelected">
              <div className="itemPicker__itemContainerDivisor">
                {t("looks.itemPartOfThisLook")}
              </div>
              <div>{selectedItemList}</div>
              <div className="itemPicker__itemSpacer"></div>
            </div>
          )}
          {isEdit && (
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
