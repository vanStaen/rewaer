import React from "react";
import { observer } from "mobx-react";

import { itemsStore } from "../itemsStore.ts";
import { userStore } from "@stores/userStore/userStore.js";
import { DetailView } from "@components/DetailView/DetailView";

import { ItemDetailContainer } from "./ItemDetailContainer/ItemDetailContainer";

import "./ItemDetail.less";
export const ItemDetail = observer(() => {
  const isLoading = itemsStore.isLoading;
  const page = "items";
  const isSharedItem =
    parseInt(itemsStore.selectedItem.user.id) !== userStore.id;
  const selectedElement = itemsStore.selectedItem;
  const showPrivate = itemsStore.showPrivateItems;

  return (
    <DetailView
      isLoading={isLoading}
      page={page}
      canEdit={!isSharedItem}
      selectedElement={selectedElement}
      setSelectedElement={itemsStore.setSelectedItem}
      showPrivate={showPrivate}
    >
      <ItemDetailContainer isSharedItem={isSharedItem} />
    </DetailView>
  );
});
