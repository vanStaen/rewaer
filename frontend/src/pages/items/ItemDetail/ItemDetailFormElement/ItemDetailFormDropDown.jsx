import React, { useState } from "react";
import { observer } from "mobx-react";
import { Dropdown, Menu, notification, Tooltip } from "antd";
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
  const [value, setValue] = useState(props.value);

  const clickHandler = async (newValue) => {
    try {
      if (props.multiSelect) {
        await updateGenericArrayStringItem(
          props.selectedItem._id,
          props.element,
          [newValue]
        );
      } else {
        await updateGenericStringItem(
          props.selectedItem._id,
          props.element,
          newValue
        );
      }

      setValue(newValue);
      notification.success({
        message: t("main.changeSaved"),
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

  const DataDropDown = props.data.map((item) => {
    let isSelected = false;
    if (item.code === value) {
      isSelected = true;
    }

    return (
      <Menu.Item
        key={item.code}
        style={isSelected && { backgroundColor: "fcfcfc" }}
        onClick={() => {
          clickHandler(item.code);
        }}
      >
        {item[userStore.language]}
      </Menu.Item>
    );
  });

  return (
    <div className="ItemDetailFormElement__container">
      <div className="ItemDetailFormElement__title">{props.title}:</div>
      <Dropdown
        className="ItemDetailFormElement__dropdown"
        overlay={<Menu>{DataDropDown}</Menu>}
        placement="bottomLeft"
        disabled={props.disabled}
      >
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
      </Dropdown>
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
