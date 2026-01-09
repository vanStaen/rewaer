import React from "react";
import { looksStore } from "../../../pages/Looks/looksStore";
import { seasons } from "../../../lib/data/seasons";
import { StringElement } from "../../FormElement/StringElement";
import { DropDownElement } from "../../FormElement/DropDownElement";
import { lookCategory } from "../../../lib/data/categories";

import "./LookForm.less";

// TODO: Add private flag

export const LookForm = ({
  setLookInput,
}: {
  setLookInput: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const selectedLook = looksStore.selectedLook || {
    id: 0,
    title: "",
    mediaId: "",
    category: "",
    season: "",
  };

  const handleLookInputChange = (value: any, element: string) => {
    setLookInput((prev: any) => ({
      ...prev,
      [element]: value,
    }));
  };

  return (
    <div className="lookform__container">
      <StringElement
        element="title"
        title="title"
        value={selectedLook.title}
        handleChange={handleLookInputChange}
      />
      <DropDownElement
        title="category"
        element="category"
        data={lookCategory}
        value={selectedLook.category}
        handleChange={handleLookInputChange}
        multiSelect={false}
      />
      <DropDownElement
        title="season"
        element="season"
        data={seasons}
        value={selectedLook.category}
        handleChange={handleLookInputChange}
        multiSelect={false}
      />
    </div>
  );
};
