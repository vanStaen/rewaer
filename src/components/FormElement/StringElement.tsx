import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { Input, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { capitalizeFirstLetter } from "@helpers/capitalizeFirstLetter";

import "./FormElement.less";

interface StringElementProps {
  value: string | null;
  handleChange: (newValue: string, element: string) => void;
  element: string;
  title: string;
  disabled?: boolean;
  tooltip?: string;
}

export const StringElement: React.FC<StringElementProps> = observer(
  ({ value, handleChange, element, title, disabled, tooltip }) => {
    const originalValue = useRef<string | null | undefined>(value);
    const inputRef = useRef<any>(null);
    const [valueSelected, setValueSelected] = useState<string | null>(
      value ? value.replace("-", "/") : null,
    );
    const [isEditMode, setIsEditmode] = useState<boolean>(false);
    const [editInputValue, setEditInputValue] = useState<string | null>(
      value ? value.replace("-", "/") : null,
    );

    useEffect(() => {
      setValueSelected(value || null);
      setEditInputValue(value || null);
      originalValue.current = value;
    }, [value]);

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setEditInputValue(e.target.value);
    };

    const handleEditConfirm = (): void => {
      if (editInputValue) {
        const newValue = capitalizeFirstLetter(
          editInputValue.replace("/", "-"),
        );
        handleChangeInternal(newValue, element);
        setValueSelected(newValue);
      }
      setIsEditmode(false);
    };

    const handleChangeInternal = (newValue: string, element: string): void => {
      setValueSelected(newValue);
      handleChange(newValue, element);
    };

    useEffect(() => {
      if (isEditMode && inputRef.current) {
        inputRef.current.focus({
          cursor: "end",
        });
      }
    }, [isEditMode]);

    return (
      <div className="formElement__container">
        <div className="formElement__title">{title}:</div>
        <div className="formElement__input">
          {isEditMode ? (
            <Input
              ref={inputRef}
              key={`title_input`}
              size="small"
              className="formElement__element"
              style={{ height: "25px", maxHeight: "25px" }}
              value={editInputValue || ""}
              onChange={handleEditChange}
              onBlur={handleEditConfirm}
              onPressEnter={handleEditConfirm}
            />
          ) : (
            <div
              className={
                valueSelected
                  ? `formElement__element ${disabled}`
                  : `formElement__selectElement textCursor ${disabled}`
              }
              onClick={() => {
                if (!disabled) {
                  setIsEditmode(true);
                }
              }}
            >
              {valueSelected || "Enter a value"}
            </div>
          )}
        </div>

        {tooltip && (
          <div className="formElement__helpIcon">
            <Tooltip placement="right" title={tooltip}>
              <QuestionCircleOutlined />
            </Tooltip>
          </div>
        )}
      </div>
    );
  },
);
