import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { Input, notification, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { updateGenericStringItem } from "../../pages/Items/actions/updateGenericStringItem";
import { itemsStore } from "../../pages/Items/itemsStore";
import { capitalizeFirstLetter } from "@helpers/capitalizeFirstLetter";

import "./FormElement.css";

export const StringElement = observer((props) => {
  const { t } = useTranslation();
  const originalValue = useRef(props.value);
  const inputRef = useRef(null);
  const [value, setValue] = useState(
    props.value ? props.value.replace("-", "/") : null,
  );
  const [isEditMode, setIsEditmode] = useState(false);
  const [editInputValue, setEditInputValue] = useState(
    props.value ? props.value.replace("-", "/") : null,
  );

  useEffect(() => {
    setValue(props.value);
    setEditInputValue(props.value);
    originalValue.current = props.value;
  }, [props.value]);

  const changeHandler = async (newValue) => {
    console.log("changeHandler", newValue, originalValue.current);
    if (newValue !== originalValue.current) {
      try {
        await updateGenericStringItem(
          props.selectedItem.id,
          props.element,
          newValue,
        );
        setValue(newValue);
        itemsStore.setIsOutOfDate(true);
        notification.success({
          message: (
            <>
              <b>{capitalizeFirstLetter(props.element)}</b> -{" "}
              {t("main.changeSaved")}
            </>
          ),
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
    if (props.value) {
      setEditInputValue(props.value.replace("-", "/"));
    }
  };

  const handleEditConfirm = () => {
    if (editInputValue) {
      changeHandler(editInputValue.replace("/", "-"));
      setValue(editInputValue.replace("-", "/"));
    }
    setIsEditmode(false);
  };

  useEffect(() => {
    if (isEditMode) {
      inputRef.current.focus({
        cursor: "end",
      });
    }
  }, [isEditMode]);

  return (
    <div className="formElement__container">
      <div className="formElement__title">{props.title}:</div>
      <div className="formElement__input">
        {isEditMode ? (
          <Input
            ref={inputRef}
            key={`title_input_${props.selectedItem.id}`}
            size="small"
            className="formElement__element"
            value={editInputValue}
            onChange={handleEditChange}
            onBlur={handleEditCancel}
            onPressEnter={handleEditConfirm}
          />
        ) : (
          <div
            className={
              value
                ? `formElement__element ${props.disabled}`
                : `formElement__selectElement textCursor ${props.disabled}`
            }
            onClick={() => {
              !props.disabled && setIsEditmode(true);
            }}
          >
            {value || "Enter a value"}
          </div>
        )}
      </div>

      {props.tooltip && (
        <div className="formElement__helpIcon">
          <Tooltip placement="right" title={props.tooltip}>
            <QuestionCircleOutlined />
          </Tooltip>
        </div>
      )}
      {/*
        <div className="formElement__missingIcon">
            < ExclamationCircleOutlined />
        </div>
        */}
    </div>
  );
});
