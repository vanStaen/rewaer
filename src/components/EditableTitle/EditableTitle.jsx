import React, { useState, useEffect } from "react";
import { Input, notification } from "antd";
import { useTranslation } from "react-i18next";

import { patchTitle } from "./patchTitle";
import { itemsStore } from "../../pages/Items/itemsStore";

import "./EditableTitle.css";

export const EditableTitle = (props) => {
  const { t } = useTranslation();
  const [originalTitle, setOriginalTitle] = useState(props.title);
  const [title, setTitle] = useState(
    props.title.replace(/ /g, "_").length > 20
      ? `${props.title.replace("-", "/").replace(/ /g, "_").slice(0, 20)}...`
      : props.title.replace("-", "/").replace(/ /g, "_")
  );
  const [isEditMode, setIsEditmode] = useState(false);
  const [editInputValue, setEditInputValue] = useState(
    props.title.replace("-", "/")
  );

  useEffect(() => {
    setTitle(
      props.title.replace(/ /g, "_").length > 20
        ? `${props.title.replace("-", "/").replace(/ /g, "_").slice(0, 20)}...`
        : props.title.replace("-", "/").replace(/ /g, "_")
    );
    setEditInputValue(props.title.replace("-", "/"));
    setOriginalTitle(props.value);
  }, [props.title]);

  const patchTitleInDB = (title) => {
    if (title !== originalTitle) {
      patchTitle(title, props.id, props.type)
        .then(() => {
          notification.success({
            message: `[TITLE] ${t("main.changeSaved")}`,
            placement: "bottomRight",
          });
          setOriginalTitle(title);
          itemsStore.setIsOutOfDate(true);
        })
        .catch((error) => {
          notification.error({ description: `Unauthorized! Please login.` });
          console.log("error", error.message);
        });
    }
  };

  const handleEditChange = (e) => {
    setEditInputValue(e.target.value);
  };

  const handleEditCancel = () => {
    setIsEditmode(false);
    setEditInputValue(props.title.replace("-", "/"));
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
    <div className={props.type === 'item' ? "title__containerItem" : "title__container"} >
      {
        isEditMode ? (
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
              setIsEditmode(true);
            }}
          >
            {title}
          </div>
        )
      }
    </div >
  );
};
