import React, { useState } from "react";
import { notification, Spin, Popconfirm, Tooltip } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import "./LookDetail.css";

export const LookDetail = (props) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="lookdetail__header">
        <ArrowLeftOutlined
          style={{ fontSize: "30px" }}
          onClick={() => {
            props.setSelectedLook(null);
          }}
        />
        <div className="lookdetail__headerTitle">
          {props.selectedLook._id} - {props.selectedLook.title}
        </div>
      </div>

      <div
        className="lookdetail__picture"
        id={`selected_look_picture_${props.selectedLook._id}`}
        style={{
          background: `url(${props.selectedLook.mediaUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </>
  );
};
