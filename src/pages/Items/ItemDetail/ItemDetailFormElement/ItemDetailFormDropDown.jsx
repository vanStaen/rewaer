import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { Select, notification, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { updateGenericStringItem } from "../../actions/updateGenericStringItem";
import { updateGenericArrayStringItem } from "../../actions/updateGenericArrayStringItem";
import { itemsStore } from "../../itemsStore";
import { userStore } from "../../../../stores/userStore/userStore";
import { convertCodeToObjectString } from "../../../../helpers/convertCodeTo";

import "./ItemDetailFormElement.css";

export const ItemDetailFormDropDown = observer((props) => {
  const { t } = useTranslation();
  const [options, setOptions] = useState(null);
  const [optionsSelected, setOptionsSelected] = useState(null);

  useEffect(() => {
    loadSelectedForSelect();
  }, [props.value, itemsStore.selectedItem]);

  useEffect(() => {
    loadOptionsForSelect();
    loadSelectedForSelect();
  }, []);

  const loadOptionsForSelect = () => {
    const optionsTemp = [];
    props.data.map((item) => {
      optionsTemp.push({
        label: item[userStore.language],
        value: item.code,
      });
    });
    setOptions(optionsTemp);
  }

  const loadSelectedForSelect = () => {
    const optionsSelectedTemp = [];
    props.data.map((item) => {
      if (props.value?.includes(item.code)) {
        optionsSelectedTemp.push({
          label: item[userStore.language],
          value: item.code,
        });
      }
    });
    setOptionsSelected(optionsSelectedTemp);
  }

  const handleChange = async (newValue) => {
    console.log('handleChange value', newValue);
    try {
      if (props.multiSelect) {
        await updateGenericArrayStringItem(
          props.selectedItem._id,
          props.element,
          newValue
        );
      } else {
        await updateGenericStringItem(
          props.selectedItem._id,
          props.element,
          newValue
        );
      }
      setOptionsSelected(newValue);
      notification.success({
        message: `[${props.element.toUpperCase()}] ${t("main.changeSaved")}`,
        placement: "bottomRight",
      });
      itemsStore.setIsOutOfDate(true);
    } catch (error) {
      notification.error({
        message: error.message,
        placement: "bottomRight",
      });
    }
  };

  return (
    <div className="ItemDetailFormElement__container">
      <div className="ItemDetailFormElement__title">{props.title}:</div>
      <Select
        className="ItemDetailFormElement__select"
        mode={props.multiSelect ? "multiple" : "default"}
        disabled={props.disabled}
        onChange={handleChange}
        value={optionsSelected}
        placeholder={`Select a ${props.title}`}
        options={options}
      />
      {props.tooltip && (
        <div className="ItemDetailFormElement__helpIcon">
          <Tooltip placement="right" title={props.tooltip}>
            <QuestionCircleOutlined />
          </Tooltip>
        </div>
      )}
    </div>
  );
});

/*
<a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          {value ? (
            <span className="ItemDetailFormElement__element">
              {convertCodeToObjectString(value, props.data)[userStore.language]}
            </span>
          ) : (
            <span
              className={`ItemDetailFormElement__selectElement ${
                props.disabled && "striked"
              }`}
            >
              Select a {props.title}
            </span>
          )}
        </a>
        */
