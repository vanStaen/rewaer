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
        <Tooltip placement="bottomRight" title={t("main.back")}>
          <ArrowLeftOutlined
            className="lookdetail__arrowIcon"
            onClick={() => {
              props.setSelectedLook(null);
            }}
          />
        </Tooltip>
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

      <div class="lookdetail__imageWrap">
        <div
          className="lookdetail__pictureBlur"
          id={`selected_look_picture_${props.selectedLook._id}`}
          style={{
            background: `url(${props.selectedLook.mediaUrlMedium})`,
          }}
        ></div>
        <div
          className="lookdetail__picture"
          id={`selected_look_picture_${props.selectedLook._id}`}
          style={{
            background: `url(${props.selectedLook.mediaUrlMedium})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
    </>
  );
};
