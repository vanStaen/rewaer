import React, { useState, useEffect, useRef } from "react";
import { Input, notification } from "antd";
import { useTranslation } from "react-i18next";

import { patchTitle } from "./patchTitle";
import { itemsStore } from "../../pages/Items/itemsStore";

import "./EditableTitle.css";

export const EditableTitle = (props) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const [originalTitle, setOriginalTitle] = useState(props.title);
  const [title, setTitle] = useState(
    props.title
      ? props.title.length > 20
        ? `${props.title.slice(0, 20)}...`
        : props.title
      : null,
  );
  const [isEditMode, setIsEditmode] = useState(false);
  const [editInputValue, setEditInputValue] = useState(
    props.title ? props.title : null,
  );

  useEffect(() => {
    setTitle(
      props.title
        ? props.title.length > 20
          ? `${props.title.slice(0, 20)}...`
          : props.title
        : null,
    );
    setEditInputValue(props.title ? props.title : null);
    setOriginalTitle(props.value);
  }, [props.title]);

  const patchTitleInDB = (title) => {
    if (title !== originalTitle) {
      patchTitle(title, props.id, props.type)
        .then(() => {
          notification.success({
            message: (
              <>
                <b>Title</b> - {t("main.changeSaved")}
              </>
            ),
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
        : editInputValue.replace("-", "/"),
    );
    setIsEditmode(false);
  };

  useEffect(() => {
    if (isEditMode) {
      inputRef.current.focus({
        cursor: "end",
      });
    }
  }, [isEditMode]);

  return props.disabled ? (
    <div style={{ color: "#999" }}>{title}</div>
  ) : (
    <div
      className={
        props.type === "item" ? "title__containerItem" : "title__container"
      }
    >
      {isEditMode ? (
        <Input
          ref={inputRef}
          key={`title_input_${props.id}`}
          size="small"
          value={editInputValue}
          onChange={handleEditChange}
          onBlur={handleEditCancel}
          onPressEnter={handleEditConfirm}
          bordered={false}
        />
      ) : (
        <div
          className={props.active ? "Page__title" : "Page__title striked"}
          onClick={() => {
            setIsEditmode(true);
          }}
        >
          {title}
        </div>
      )}
    </div>
  );
};
