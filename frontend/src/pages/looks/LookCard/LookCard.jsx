import React from "react";
import { notification, Spin, Popconfirm, Tooltip } from "antd";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  HeartOutlined,
  EditOutlined,
  EyeOutlined,
  StarOutlined,
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

  const elementPicture = document.getElementById(
    `card_look_picture_${props.look._id}`
  );

  const elementLogoOver = document.getElementById(
    `card_look_logoover_${props.look._id}`
  );

  const elementActionsContainer = document.getElementById(
    `card_look_actionsContainer_${props.look._id}`
  );

  const elementActionsLogo = document.getElementById(
    `card_look_actionsLogo_${props.look._id}`
  );

  const onMouseEnterHandler = () => {
    elementPicture.style.filter = "brightness(50%)";
    elementLogoOver.style.display = "block";
    elementActionsContainer.style.width = "34px";
    elementActionsContainer.style.opacity = ".85";
    elementActionsLogo.style.display = "block";
  };

  const onMouseLeaveHandler = () => {
    elementPicture.style.filter = "brightness(100%)";
    elementLogoOver.style.display = "none";
    elementActionsContainer.style.width = "0px";
    setTimeout(() => {
      elementActionsLogo.style.display = "none";
      elementActionsContainer.style.opacity = "0";
    }, 100);
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
          className="lookcard__actionsContainer"
          id={`card_look_actionsContainer_${props.look._id}`}
        >
          <div
            className="lookcard__actionsLogo"
            id={`card_look_actionsLogo_${props.look._id}`}
          >
            <Tooltip placement="left" title="Mark as favorite">
              <StarOutlined className="iconGold" />
            </Tooltip>
            <Tooltip placement="left" title="Edit this Look">
              <EditOutlined className="iconGreen" />
            </Tooltip>
            <Tooltip placement="left" title="Delete this Look">
              <Popconfirm
                title={t("looks.deleteConfirm")}
                onConfirm={handleDelete}
                okText="Delete"
                cancelText="Cancel"
                icon={<ExclamationCircleOutlined style={{ color: "black" }} />}
              >
                <DeleteOutlined className="iconRed" />
              </Popconfirm>
            </Tooltip>
          </div>
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
