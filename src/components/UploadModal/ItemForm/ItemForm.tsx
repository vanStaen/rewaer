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

// TODO: Add private flag

export const ItemForm = ({
  setItemInput,
}: {
  setItemInput: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const selectedItem = itemsStore.selectedItem || {
    id: 0,
    title: "",
    brand: "",
    category: null,
    colors: [],
    pattern: null,
    size: null,
    active: false,
  };

  const handleItemInputChange = (value: any, element: string) => {
    setItemInput((prev: any) => ({
      ...prev,
      [element]: value,
    }));
  };

  return (
    <div className="itemform__container">
      <StringElement
        element="title"
        title="title"
        value={selectedItem.title}
        handleChange={handleItemInputChange}
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
        handleChange={handleItemInputChange}
        multiSelect={false}
      />
      <StringElement
        element="brand"
        title="brand"
        value={selectedItem.brand}
        handleChange={handleItemInputChange}
      />
      <DropDownElement
        title="color"
        element="colors"
        data={colors}
        value={selectedItem.colors && selectedItem.colors}
        handleChange={handleItemInputChange}
        multiSelect={true}
      />
      <DropDownElement
        title="pattern"
        element="pattern"
        data={pattern}
        value={selectedItem.pattern}
        handleChange={handleItemInputChange}
        multiSelect={false}
      />
      <StringElement
        element="size"
        title="size"
        value={selectedItem.size}
        handleChange={handleItemInputChange}
      />
    </div>
  );
};
