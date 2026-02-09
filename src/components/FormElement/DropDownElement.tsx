import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Select, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { itemsStore } from "../../pages/Items/itemsStore";
import { userStore } from "@stores/userStore/userStore.js";

import "./FormElement.less";

interface DataItem {
  code: string;
  [key: string]: string;
}

interface OptionType {
  label: string;
  value: string;
}

interface DropDownElementProps {
  value?: string | string[] | null;
  data: DataItem[];
  title: string;
  disabled?: boolean;
  multiSelect: boolean;
  tooltip?: string;
  handleChange: (newValue: string | string[], element: string) => void;
  element: string;
}

export const DropDownElement: React.FC<DropDownElementProps> = observer(
  ({
    value,
    data,
    title,
    disabled,
    multiSelect,
    tooltip,
    handleChange,
    element,
  }) => {
    const [options, setOptions] = useState<OptionType[] | null>(null);
    const [optionsSelected, setOptionsSelected] = useState<
      string | string[] | null
    >(null);

    useEffect(() => {
      loadSelectedForSelect();
    }, [itemsStore.selectedItem]);

    useEffect(() => {
      loadOptionsForSelect();
      loadSelectedForSelect();
    }, []);

    useEffect(() => {
      loadSelectedForSelect();
    }, [value]);

    const loadOptionsForSelect = (): void => {
      const optionsTemp: OptionType[] = [];
      data.forEach((item) => {
        optionsTemp.push({
          label: item[userStore.language],
          value: item.code,
        });
      });
      setOptions(optionsTemp);
    };

    const loadSelectedForSelect = (): void => {
      if (multiSelect) {
        // For multiselect, handle array of values
        const optionsSelectedTemp: string[] = [];
        data.forEach((item) => {
          if (Array.isArray(value) && value.includes(item.code)) {
            optionsSelectedTemp.push(item.code);
          }
        });
        setOptionsSelected(optionsSelectedTemp);
      } else {
        // For single select, handle string value
        setOptionsSelected(value || null);
      }
    };

    const handleChangeInternal = (newValue: string | string[]): void => {
      setOptionsSelected(newValue);
      handleChange(newValue, element);
    };

    return (
      <div className="formElement__container">
        <div className="formElement__title">{title}:</div>
        <Select
          className={
            disabled ? "formElement__selectDisabled" : "formElement__select"
          }
          mode={multiSelect ? "multiple" : undefined}
          disabled={disabled}
          onChange={handleChangeInternal}
          value={optionsSelected}
          placeholder={`Select a ${title}`}
          options={options || []}
        />
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
