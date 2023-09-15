import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { notification, Radio, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { updateGenericBooleanItem } from "../../actions/updateGenericBooleanItem";
import { updateGenericStringItem } from "../../actions/updateGenericStringItem";

import { itemsStore } from "../../itemsStore";
import { userStore } from "../../../../stores/userStore/userStore";

import "./ItemDetailFormElement.css";

export const ItemDetailFormRadio = observer((props) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const changeHandler = async (event) => {
    try {
      if (typeof event.target.value === "boolean") {
        await updateGenericBooleanItem(
          props.selectedItem._id,
          props.element,
          event.target.value
        );
      } else {
        await updateGenericStringItem(
          props.selectedItem._id,
          props.element,
          event.target.value
        );
      }

      setValue(event.target.value);
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

  const DataRadio = props.data.map((item) => {
    const backgroundColor =
      item.code === props.whatShouldBeRed && item.code === value
        ? "rgba(191, 64, 64, .75)"
        : null;
    const borderColor =
      item.code === props.whatShouldBeRed && item.code === value
        ? "rgba(191, 64, 64, 1)"
        : null;
    return (
      <Radio.Button
        key={item.code}
        value={item.code}
        disabled={props.disabled}
        style={{
          background: backgroundColor,
          borderColor: borderColor,
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
