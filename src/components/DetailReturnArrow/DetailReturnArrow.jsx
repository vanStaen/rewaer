import React from "react";
import { Tooltip } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { looksStore } from "../../pages/Looks/looksStore";
import { itemsStore } from "../../pages/Items/itemsStore";

import "./DetailReturnArrow.less";

export const DetailReturnArrow = ({ page }) => {
  const { t } = useTranslation();

  return (
    <div className="detail__backArrowItem">
      <Tooltip
        placement="bottomRight"
        title={
          page === "items" ? t("items.backToItems") : t("looks.backToLooks")
        }
      >
        <ArrowLeftOutlined
          className="detail__arrowIcon"
          onClick={() => {
            page === "items"
              ? itemsStore.setSelectedItem(null)
              : looksStore.setSelectedLook(null);
          }}
        />
      </Tooltip>
    </div>
  );
};
