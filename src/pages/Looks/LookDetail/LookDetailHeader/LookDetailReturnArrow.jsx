import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Tooltip } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { looksStore } from "../../looksStore";

import "./LookDetailReturnArrow.less";

export const LookDetailReturnArrow = observer(() => {
  const { t } = useTranslation();

  return (
    <div className="lookdetail__backArrow">
      <Tooltip placement="bottomRight" title={t("looks.backToLooks")}>
        <ArrowLeftOutlined
          className="lookdetail__arrowIcon"
          onClick={() => {
            looksStore.setSelectedLook(null);
          }}
        />
      </Tooltip>
    </div>
  );
});
