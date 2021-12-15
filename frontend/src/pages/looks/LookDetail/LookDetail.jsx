import React, { useState } from "react";
import { notification, Spin, Popconfirm, Tooltip } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export const LookDetail = (props) => {
  const { t } = useTranslation();
  return (
    <ArrowLeftOutlined
      onClick={() => {
        props.setSelectedLookId(null);
      }}
    />
  );
};
