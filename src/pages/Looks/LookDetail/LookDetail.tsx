import React from "react";
import { observer } from "mobx-react";

import { looksStore } from "../looksStore";
import { DetailView } from "@components/DetailView/DetailView";
import { ItemPicker } from "./ItemPicker/ItemPicker";
import { LookDetailHeader } from "./LookDetailContainer/LookDetailContainer";

export const LookDetail: React.FC = observer(() => {
  const isLoading = looksStore.isLoading;
  const page = "looks";
  const selectedElement = looksStore.selectedLook;
  const showPrivate = looksStore.showPrivateLooks;

  return (
    <DetailView
      isLoading={isLoading}
      page={page}
      canEdit={true}
      selectedElement={selectedElement}
      setSelectedElement={looksStore.setSelectedLook}
      showPrivate={showPrivate}
    >
      <ItemPicker />
      <LookDetailHeader />
    </DetailView>
  );
});
