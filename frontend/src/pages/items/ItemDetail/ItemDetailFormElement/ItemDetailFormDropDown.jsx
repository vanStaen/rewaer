import React, { useState } from "react";
import { Dropdown, Menu, notification } from "antd";
import { useTranslation } from "react-i18next";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { updateGenericStringItem } from "../../actions/updateGenericStringItem";
import { itemsStore } from "../../itemsStore";
import { userStore } from "../../../../stores/userStore/userStore";
import { convertCodeToObjectString } from "../../../../helpers/convertCodeTo";

import "./ItemDetailFormElement.css";

export const ItemDetailFormDropDown = (props) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(props.value);
  const clickHandler = (newValue) => {
    try {
      updateGenericStringItem(props.selectedItem._id, props.element, newValue);
      setValue(newValue);
      notification.success({
        message: t("main.changeSaved"),
        placement: "bottomRight",
      });
      itemsStore.setIsOutOfDate(true);
    } catch (e) {
      notification.error({
        message: e,
        placement: "bottomRight",
      });
    }
  };

  const CategoryDropDown = props.data.map((item) => {
    return (
      <Menu.Item
        key={item.code}
        //style={{ backgroundColor: item.en }}
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
        overlay={<Menu>{CategoryDropDown}</Menu>}
        placement="bottomLeft"
        disabled={props.disabled}
      >
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          {value ? (
            <span className="ItemDetailFormElement__element">
              {convertCodeToObjectString(value, props.data)[userStore.language]}
            </span>
          ) : (
            <span className="ItemDetailFormElement__selectElement">
              Select a {props.title}
            </span>
          )}
        </a>
      </Dropdown>
      <div className="ItemDetailFormElement__helpIcon">
        <QuestionCircleOutlined />
      </div>
    </div>
  );
};
