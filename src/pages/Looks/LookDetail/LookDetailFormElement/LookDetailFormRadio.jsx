import React, { useState } from "react";
import { observer } from "mobx-react";
import { notification, Radio, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { updateGenericBooleanLook } from "../../actions/updateGenericBooleanLook";
import { looksStore } from "../../looksStore";
import { userStore } from "../../../../stores/userStore/userStore";

import "./LookDetailFormElement.css";

export const LookDetailFormRadio = observer((props) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(props.value);

  const changeHandler = async (event) => {
    try {
      await updateGenericBooleanLook(
        props.selectedLook._id,
        props.element,
        event.target.value
      );
      setValue(event.target.value);
      props.flipValueTo(event.target.value);
      notification.success({
        message: `[${props.element.toUpperCase()}] ${t("main.changeSaved")}`,
        placement: "bottomRight",
      });
      looksStore.setIsOutOfDate(true);
    } catch (error) {
      notification.error({
        message: error.message,
        placement: "bottomRight",
      });
    }
  };

  const DataRadio = props.data.map((look) => {
    return (
      <Radio.Button
        key={look.code}
        value={look.code}
        disabled={props.disabled}
        style={{
          background:
            look.code === props.whatShouldBeRed &&
            look.code === value &&
            "rgba(191, 64, 64, .75)",
          borderColor:
            look.code === props.whatShouldBeRed &&
            look.code === value &&
            "rgba(191, 64, 64, 1)",
        }}
      >
        {look[userStore.language]}
      </Radio.Button>
    );
  });

  return (
    <div className={`LookDetailFormElement__container`}>
      <Radio.Group
        defaultValue={value}
        buttonStyle="solid"
        onChange={changeHandler}
      >
        {DataRadio}
      </Radio.Group>
      <div className="ItemDetailFormElement__helpIcon">
        <Tooltip placement="right" title={props.tooltip}>
          <QuestionCircleOutlined />
        </Tooltip>
      </div>
    </div>
  );
});
