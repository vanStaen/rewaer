import React from "react";
import { itemsStore } from "../../../pages/Items/itemsStore";
import { userStore } from "../../../stores/userStore/userStore";
import { StringElement } from "../../FormElement/StringElement";
import { DropDownElement } from "../../FormElement/DropDownElement";
import {
  itemCategoryMen,
  itemCategoryWomen,
  itemCategoryNB,
} from "../../../lib/data/categories";
import { colors } from "../../../lib/data/colors";
import { pattern } from "../../../lib/data/pattern";

import "./ItemForm.less";

export const ItemForm = () => {
  const selectedItem = itemsStore.selectedItem || {
    id: 0,
    title: "",
    brand: "",
    category: null,
    colors: [],
    pattern: null,
    size: null,
    active: false,
  }

  const isSharedItem =
    itemsStore.selectedItem &&
    parseInt(itemsStore.selectedItem.user.id.toString()) !== userStore.id;

  return (
    <div className="itemform__container">
      <StringElement
        element="title"
        title="title"
        value={selectedItem.title}
        selectedItem={selectedItem}
        disabled={!selectedItem.active || isSharedItem}
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
        value={selectedItem.category}
        selectedItem={selectedItem}
        multiSelect={false}
        disabled={!selectedItem.active || isSharedItem}
      />
      <StringElement
        element="brand"
        title="brand"
        value={selectedItem.brand}
        selectedItem={selectedItem}
        disabled={!selectedItem.active || isSharedItem}
      />
      <DropDownElement
        title="color"
        element="colors"
        data={colors}
        value={selectedItem.colors && selectedItem.colors}
        selectedItem={selectedItem}
        multiSelect={true}
        disabled={!selectedItem.active || isSharedItem}
      />
      <DropDownElement
        title="pattern"
        element="pattern"
        data={pattern}
        value={selectedItem.pattern}
        selectedItem={selectedItem}
        multiSelect={false}
        disabled={!selectedItem.active || isSharedItem}
      />
      <StringElement
        element="size"
        title="size"
        value={selectedItem.size}
        selectedItem={selectedItem}
        disabled={!selectedItem.active || isSharedItem}
      />
    </div>
  );
};
