import React, { useState, useEffect } from "react";
import { Dropdown, Menu, notification } from "antd";
import { useTranslation } from "react-i18next";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { updateGenericStringItem } from "../../actions/updateGenericStringItem";
import { itemsStore } from "../../itemsStore";

import "./ItemDetailFormElement.css";

export const ItemDetailFormDropDown = (props) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    props.value === null
      ? setValue(props.value)
      : !props.value.isArray
      ? setValue(props.value)
      : props.value.length === 0
      ? setValue(null)
      : setValue(props.value);

    console.log("props.value.isArray", props.value.isArray);
    console.log("props.value.length", props.value.length);
    console.log("ran");
  }, [props.value]);

  console.log("value", value);

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
          clickHandler(item.en);
        }}
      >
        {item.en}
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
      >
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          {value ? (
            <span className="ItemDetailFormElement__element">{value}</span>
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
