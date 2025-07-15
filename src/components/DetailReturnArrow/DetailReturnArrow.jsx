import React from "react";
import { Tooltip } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { looksStore } from "../../pages/Looks/looksStore";
import { itemsStore } from "../../pages/Items/itemsStore";

import "./DetailReturnArrow.less";

export const DetailReturnArrow = (props) => {
  const { t } = useTranslation();

  return props.page === "look" ? (
    <div className="detail__backArrowLook">
      <Tooltip placement="bottomRight" title={t("looks.backToLooks")}>
        <ArrowLeftOutlined
          className="detail__arrowIcon"
          onClick={() => {
            looksStore.setSelectedLook(null);
          }}
        />
      </Tooltip>
    </div>
  ) : (
    <div className="detail__backArrowItem">
      <Tooltip placement="bottomRight" title={t("items.backToItems")}>
        <ArrowLeftOutlined
          className="detail__arrowIcon"
          onClick={() => {
            itemsStore.setSelectedItem(null);
          }}
        />
      </Tooltip>
    </div>
  );
};
