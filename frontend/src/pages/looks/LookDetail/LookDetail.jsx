import React, { useState } from "react";
import { notification, Spin, Popconfirm, Tooltip } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export const LookDetail = (props) => {
  const { t } = useTranslation();
  return (
    <>
      <ArrowLeftOutlined
        style={{ fontSize: "30px", padding: "14px" }}
        onClick={() => {
          props.setSelectedLook(null);
        }}
      />
      {props.selectedLook._id}

      <div
        className="lookcard__picture"
        id={`selected_look_picture_${props.selectedLook._id}`}
        style={{
          background: `url(${props.selectedLook.mediaUrlMedium})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </>
  );
};
