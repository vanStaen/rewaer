import React, { useState } from "react";
import { notification, Spin, Popconfirm, Tooltip } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { EditableTitle } from "../../../components/EditableTitle/EditableTitle";

import "./LookDetail.css";

export const LookDetail = (props) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="lookdetail__header">
        <ArrowLeftOutlined
          className="lookdetail__arrowIcon"
          onClick={() => {
            props.setSelectedLook(null);
          }}
        />
        <div className="lookdetail__headerTitle">
          <span className="lookdetail__headerTitleId">
            {props.selectedLook._id}
          </span>
          &nbsp;
          <EditableTitle
            title={props.selectedLook.title}
            id={props.selectedLook._id}
            type={"look"}
            active={props.selectedLook.active}
          />
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
