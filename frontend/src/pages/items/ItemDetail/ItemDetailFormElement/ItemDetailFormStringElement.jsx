import React, { useState } from "react";
import { Input, notification } from "antd";
import { useTranslation } from "react-i18next";
import {
  QuestionCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import { updateGenericStringItem } from "../../actions/updateGenericStringItem";

import "./ItemDetailFormElement.css";

export const ItemDetailFormStringElement = (props) => {
  const { t } = useTranslation();
  const [originalValue, setOriginalValue] = useState(props.value);
  const [value, setValue] = useState(
    props.value ? props.value.replace("-", "/") : null
  );
  const [isEditMode, setIsEditmode] = useState(false);
  const [editInputValue, setEditInputValue] = useState(
    props.value ? props.value.replace("-", "/") : null
  );

  const patchTitleInDB = (newValue) => {
    if (newValue !== originalValue) {
      updateGenericStringItem(props.selectedItem._id, props.element, newValue)
        .then(() => {
          notification.success({
            message: t("main.changeSaved"),
            placement: "bottomRight",
          });
          setOriginalValue(newValue);
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
    setEditInputValue(props.value.replace("-", "/"));
  };

  const handleEditConfirm = () => {
    patchTitleInDB(editInputValue.replace("/", "-"));
    setValue(editInputValue.replace("-", "/"));
    setIsEditmode(false);
  };

  return (
    <div className="ItemDetailFormElement__container">
      <div className="ItemDetailFormElement__title">{props.title}:</div>
      <div className="ItemDetailFormElement__input">
        {isEditMode ? (
          <Input
            key={`title_input_${props.selectedItem._id}`}
            size="small"
            className="ItemDetailFormElement__element"
            value={editInputValue}
            onChange={handleEditChange}
            onBlur={handleEditCancel}
            onPressEnter={handleEditConfirm}
            disabled={props.disabled}
          />
        ) : (
          <div
            className={
              value
                ? "ItemDetailFormElement__element"
                : "ItemDetailFormElement__selectElement"
            }
            onDoubleClick={() => {
              setIsEditmode(true);
            }}
          >
            {value ? value : "Enter a value"}
          </div>
        )}
      </div>
      <div className="ItemDetailFormElement__helpIcon">
        <QuestionCircleOutlined />
      </div>
      {/*
        <div className="ItemDetailFormElement__missingIcon">
            < ExclamationCircleOutlined />
        </div>
        */}
    </div>
  );
};
