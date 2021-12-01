import React from "react";

import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import {
  EditOutlined,
  EditFilled,
  FilterOutlined,
  FilterFilled,
} from "@ant-design/icons";

import "./ToolBar.css";

export const ToolBar = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <Tooltip
        placement="topRight"
        title={
          props.quickEdit ? t("main.hideQuickEdit") : t("main.showQuickEdit")
        }
      >
        {props.quickEdit ? (
          <EditFilled
            className="ToolBar__toolbarIcon ToolBar__toolbarIconActive"
            onClick={() => {
              props.setQuickEdit(!props.quickEdit);
            }}
          />
        ) : (
          <EditOutlined
            className="ToolBar__toolbarIcon"
            onClick={() => {
              props.setQuickEdit(!props.quickEdit);
            }}
          />
        )}
      </Tooltip>
      <Tooltip
        placement="topRight"
        title={props.showFilter ? t("main.hideFilter") : t("main.showFilter")}
      >
        {props.showFilter ? (
          <FilterFilled
            className="ToolBar__toolbarIcon ToolBar__toolbarIconActive"
            onClick={() => {
              props.setShowFilter(!props.showFilter);
            }}
          />
        ) : (
          <FilterOutlined
            className="ToolBar__toolbarIcon"
            onClick={() => {
              props.setShowFilter(!props.showFilter);
            }}
          />
        )}
      </Tooltip>
    </>
  );
};
