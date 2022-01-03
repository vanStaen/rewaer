import React, { useState } from "react";
import { notification, Radio } from "antd";
import { useTranslation } from "react-i18next";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { updateGenericBooleanItem } from "../../actions/updateGenericBooleanItem";
import { itemsStore } from "../../itemsStore";

import "./ItemDetailFormElement.css";

export const ItemDetailFormRadio = (props) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(props.value);

  const changeHandler = (event) => {
    try {
      updateGenericBooleanItem(
        props.selectedItem._id,
        props.element,
        event.target.value
      );
      setValue(event.target.value);
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

  const DataRadio = props.data.map((item) => {
    return (
      <Radio.Button
        key={item.code}
        value={item.code}
        style={{
          background:
            item.code === props.whatShouldBeRed &&
            item.code === value &&
            "rgba(191, 64, 64, .75)",
          borderColor:
            item.code === props.whatShouldBeRed &&
            item.code === value &&
            "rgba(191, 64, 64, 1)",
        }}
      >
        {item.en}
      </Radio.Button>
    );
  });

  return (
    <div className="ItemDetailFormElement__container">
      <Radio.Group
        defaultValue={value}
        buttonStyle="solid"
        onChange={changeHandler}
      >
        {DataRadio}
      </Radio.Group>
    </div>
  );
};
