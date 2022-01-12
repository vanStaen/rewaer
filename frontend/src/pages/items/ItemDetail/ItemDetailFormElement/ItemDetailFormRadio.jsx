import React, { useState } from "react";
import { observer } from "mobx-react";
import { notification, Radio } from "antd";
import { useTranslation } from "react-i18next";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { updateGenericBooleanItem } from "../../actions/updateGenericBooleanItem";
import { itemsStore } from "../../itemsStore";
import { userStore } from "../../../../stores/userStore/userStore";

import "./ItemDetailFormElement.css";

export const ItemDetailFormRadio = observer((props) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(props.value);

  const changeHandler = async (event) => {
    try {
      await updateGenericBooleanItem(
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
    } catch (error) {
      notification.error({
        message: error.message,
        placement: "bottomRight",
      });
    }
  };

  const DataRadio = props.data.map((item) => {
    return (
      <Radio.Button
        key={item.code}
        value={item.code}
        disabled={props.disabled}
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
        {item[userStore.language]}
      </Radio.Button>
    );
  });

  return (
    <div className={`ItemDetailFormElement__container`}>
      <Radio.Group
        defaultValue={value}
        buttonStyle="solid"
        onChange={changeHandler}
      >
        {DataRadio}
      </Radio.Group>
      <div className="ItemDetailFormElement__helpIcon">
        <QuestionCircleOutlined />
      </div>
    </div>
  );
});
