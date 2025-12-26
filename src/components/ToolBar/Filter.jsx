import React from "react";
import { Tooltip } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { FilterOutlined, FilterFilled } from "@ant-design/icons";
import { pageStore } from "@stores/pageStore/pageStore";

import "./ToolBar.css";

export const Filter = observer(() => {
  const { t } = useTranslation();

  return (
    <>
      <Tooltip
        placement="bottomRight"
        title={
          pageStore.showFilter ? t("main.hideFilter") : t("main.showFilter")
        }
      >
        {pageStore.showFilter ? (
          <FilterFilled
            className="ToolBar__toolbarIcon ToolBar__toolbarIconActive"
            onClick={() => {
              pageStore.setShowFilter(!pageStore.showFilter);
            }}
          />
        ) : (
          <FilterOutlined
            className="ToolBar__toolbarIcon"
            onClick={() => {
              pageStore.setShowFilter(!pageStore.showFilter);
            }}
          />
        )}
      </Tooltip>
    </>
  );
});
