import React from "react";
import { Tooltip } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { EditOutlined, EditFilled } from "@ant-design/icons";
import { pageStore } from "../../stores/pageStore/pageStore";

import "./ToolBar.css";

export const Edit = observer(() => {
  const { t } = useTranslation();

  return (
    <>
      <Tooltip
        placement="bottomRight"
        title={
          pageStore.quickEdit
            ? t("main.hideQuickEdit")
            : t("main.showQuickEdit")
        }
      >
        {pageStore.quickEdit ? (
          <EditFilled
            className="ToolBar__toolbarIcon ToolBar__toolbarIconActive"
            onClick={() => {
              pageStore.setQuickEdit(!pageStore.quickEdit);
            }}
          />
        ) : (
          <EditOutlined
            className="ToolBar__toolbarIcon"
            onClick={() => {
              pageStore.setQuickEdit(!pageStore.quickEdit);
            }}
          />
        )}
      </Tooltip>
    </>
  );
});
