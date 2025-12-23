import React, { useState } from "react";
import { observer } from "mobx-react";
import { notification, Radio, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { RadioChangeEvent } from "antd";

import { updateGenericBooleanLook } from "../../actions/updateGenericBooleanLook";
import { looksStore } from "../../looksStore.js";
import { userStore } from "../../../../stores/userStore/userStore.js";
import { capitalizeFirstLetter } from "../../../../helpers/capitalizeFirstLetter";

import "./LookDetailFormElement.less";

interface DataItem {
  code: boolean | string;
  en: string;
  de: string;
  fr: string;
}

interface Look {
  id: number | string;
  [key: string]: any;
}

interface LookDetailFormRadioProps {
  value: boolean | string;
  element: string;
  data: DataItem[];
  selectedLook: Look;
  flipValueTo: (value: boolean | string) => void;
  disabled?: boolean;
  whatShouldBeRed?: boolean | string;
  tooltip?: string;
}

export const LookDetailFormRadio: React.FC<LookDetailFormRadioProps> = observer((props) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<boolean | string>(props.value);

  const changeHandler = async (event: RadioChangeEvent): Promise<void> => {
    try {
      await updateGenericBooleanLook(
        props.selectedLook.id,
        props.element,
        event.target.value,
      );
      setValue(event.target.value);
      props.flipValueTo(event.target.value);
      notification.success({
        message: (
          <>
            <b>{capitalizeFirstLetter(props.element)}</b> -{" "}
            {t("main.changeSaved")}
          </>
        ),
        placement: "bottomRight",
      });
      looksStore.setIsOutOfDate(true);
    } catch (error: any) {
      notification.error({
        message: error.message,
        placement: "bottomRight",
      });
    }
  };

  const DataRadio = props.data.map((look) => {
    return (
      <Radio.Button
        key={String(look.code)}
        value={look.code}
        disabled={props.disabled}
        style={{
          background:
            look.code === props.whatShouldBeRed && look.code === value
              ? "rgba(191, 64, 64, .75)"
              : undefined,
          borderColor:
            look.code === props.whatShouldBeRed && look.code === value
              ? "rgba(191, 64, 64, 1)"
              : undefined,
        }}
      >
        {look[userStore.language as keyof DataItem]}
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
