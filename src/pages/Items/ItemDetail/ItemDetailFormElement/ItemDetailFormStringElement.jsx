import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { Input, notification, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import {
  QuestionCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import { updateGenericStringItem } from "../../actions/updateGenericStringItem";
import { itemsStore } from "../../itemsStore";

import "./ItemDetailFormElement.css";

export const ItemDetailFormStringElement = observer((props) => {
  const { t } = useTranslation();
  const originalValue = useRef(props.value);
  const [value, setValue] = useState(
    props.value ? props.value.replace("-", "/") : null
  );
  const [isEditMode, setIsEditmode] = useState(false);
  const [editInputValue, setEditInputValue] = useState(
    props.value ? props.value.replace("-", "/") : null
  );

  useEffect(() => {
    setValue(props.value);
    setEditInputValue(props.value);
    originalValue.current = props.value;
  }, [props.value]);

  const changeHandler = async (newValue) => {
    if (newValue !== originalValue.current) {
      try {
        await updateGenericStringItem(
          props.selectedItem._id,
          props.element,
          newValue
        );
        setValue(newValue);
        itemsStore.setIsOutOfDate(true);
        notification.success({
          message: `[${props.element.toUpperCase()}] ${t("main.changeSaved")}`,
          placement: "bottomRight",
        });
      } catch (error) {
        notification.error({
          message: error.message,
          placement: "bottomRight",
        });
      }
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
    changeHandler(editInputValue.replace("/", "-"));
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
          />
        ) : (
          <div
            className={
              value
                ? `ItemDetailFormElement__element ${
                    props.disabled && "striked"
                  }`
                : `ItemDetailFormElement__selectElement textCursor ${
                    props.disabled && "striked"
                  }`
            }
            onClick={() => {
              !props.disabled && setIsEditmode(true);
            }}
          >
            {value ? value : "Enter a value"}
          </div>
        )}
      </div>

      {props.tooltip && (
        <div className="ItemDetailFormElement__helpIcon">
          <Tooltip placement="right" title={props.tooltip}>
            <QuestionCircleOutlined />
          </Tooltip>
        </div>
      )}
      {/*
        <div className="ItemDetailFormElement__missingIcon">
            < ExclamationCircleOutlined />
        </div>
        */}
    </div>
  );
});