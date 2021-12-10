import React from "react";
import { useState } from "react";
import { Input, notification } from "antd";
import { useTranslation } from "react-i18next";

import { patchTitle } from "./patchTitle";

export const EditableTitle = (props) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState(
    props.title.replace(/ /g, "_").length > 20
      ? `${props.title.replace("-", "/").replace(/ /g, "_").slice(0, 20)}...`
      : props.title.replace("-", "/").replace(/ /g, "_")
  );
  const [isEditMode, setIsEditmode] = useState(false);
  const [editInputValue, setEditInputValue] = useState(
    props.title.replace("-", "/")
  );

  const patchTitleInDB = (title) => {
    // fetch Entries
    patchTitle(title, props.id, props.type)
      .then(() => {
        notification.success({
          message: t("main.changeSaved"),
          placement: "bottomRight",
        });
      })
      .catch((error) => {
        notification.error({ description: `Unauthorized! Please login.` });
        console.log("error", error.message);
      });
  };

  const handleEditChange = (e) => {
    setEditInputValue(e.target.value);
  };

  const handleEditCancel = () => {
    setIsEditmode(false);
    setEditInputValue(props.title.replace("-", "/"));
    console.log("cancel");
  };

  const handleEditConfirm = () => {
    patchTitleInDB(editInputValue.replace("/", "-"));
    setTitle(
      editInputValue.replace(/ /g, "_").length > 23
        ? `${editInputValue
            .replace("-", "/")
            .replace(/ /g, "_")
            .slice(0, 23)}...`
        : editInputValue.replace("-", "/").replace(/ /g, "_")
    );
    setIsEditmode(false);
  };

  return (
    <div>
      {isEditMode ? (
        <Input
          key={`title_input_${props.id}`}
          size="small"
          className="title__input"
          value={editInputValue}
          onChange={handleEditChange}
          onBlur={handleEditCancel}
          onPressEnter={handleEditConfirm}
        />
      ) : (
        <div
          className={props.active ? "Page__title" : "Page__title striked"}
          onDoubleClick={() => {
            props.active && setIsEditmode(true);
          }}
        >
          {title}
        </div>
      )}
    </div>
  );
};
