import React from "react";
import { notification, Spin, Popconfirm } from "antd";
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  HeartOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { EditableTitle } from "../../../components/EditableTitle/EditableTitle";
import { looksStore } from "../looksStore";
import { deleteLook } from "./deleteLook";

import "./LookCard.css";

export const LookCard = (props) => {
  const { t } = useTranslation();
  const spinnerFormated = (
    <div className="card__spinner">
      <Spin size="middle" />
    </div>
  );

  const handleDelete = () => {
    deleteLook(props.look._id)
      .then(() => {
        notification.success({
          message: t("looks.deletedSuccess"),
          placement: "bottomRight",
          icon: <DeleteOutlined style={{ color: "green" }} />,
        });
        looksStore.setIsOutOfDate(true);
        console.log("Success!");
      })
      .catch((error) => {
        notification.error({ message: `Error!`, placement: "bottomRight" });
        console.log(error.message);
      });
  };

  const onMouseEnterHandler = () => {
    document.getElementById(
      `card_look_picture_${props.look._id}`
    ).style.filter = "brightness(50%)";
    document.getElementById(
      `card_look_logoover_${props.look._id}`
    ).style.display = "block";
    setTimeout(() => {
      document.getElementById(
        `card_look_actions_${props.look._id}`
      ).style.display = "block";
    }, 300);
  };

  const onMouseLeaveHandler = () => {
    document.getElementById(
      `card_look_actions_${props.look._id}`
    ).style.display = "none";
    document.getElementById(
      `card_look_picture_${props.look._id}`
    ).style.filter = "brightness(100%)";
    document.getElementById(
      `card_look_logoover_${props.look._id}`
    ).style.display = "none";
  };

  const createdDate = new Date(props.look.createdAt);

  return (
    <>
      <div
        className="lookcard__container"
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        <div
          className="lookcard__picture"
          id={`card_look_picture_${props.look._id}`}
          //placeholder={spinnerFormated}
          style={{
            background: `url(${props.look.mediaUrlMedium})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div
          className="lookcard__logoover"
          id={`card_look_logoover_${props.look._id}`}
        >
          <EyeOutlined />
          <div style={{ fontSize: "12px" }}>Detail View</div>
        </div>
        <div
          className="lookcard__actions"
          id={`card_look_actions_${props.look._id}`}
        >
          <HeartOutlined />
          <EditOutlined />
          <Popconfirm
            title={t("looks.deleteConfirm")}
            onConfirm={handleDelete}
            okText="Delete"
            cancelText="Cancel"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <DeleteOutlined />
          </Popconfirm>
        </div>
        <div className="lookcard__meta">
          <EditableTitle
            title={props.look.title}
            id={props.look._id}
            type={"look"}
          />
          <div className="lookcard__date">
            {createdDate.toLocaleDateString()}
          </div>
        </div>
      </div>
    </>
  );
};
