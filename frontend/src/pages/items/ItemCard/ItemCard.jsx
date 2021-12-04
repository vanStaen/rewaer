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
import { itemsStore } from "../itemsStore";
import { deleteItem } from "./deleteItem";

import "./ItemCard.css";

export const ItemCard = (props) => {
  const { t } = useTranslation();
  const spinnerFormated = (
    <div className="item__spinner">
      <Spin size="middle" />
    </div>
  );

  const handleDelete = () => {
    // delete Item
    deleteItem(props.item._id)
      .then(() => {
        notification.success({
          message: t("items.deletedSuccess"),
          placement: "bottomRight",
          icon: <DeleteOutlined style={{ color: "green" }} />,
        });
        itemsStore.setIsOutOfDate(true);
        console.log("Success!");
      })
      .catch((error) => {
        notification.error({ message: `Error!`, placement: "bottomRight" });
        console.log(error.message);
      });
  };
  const elementPicture = document.getElementById(
    `item_card_picture_${props.item._id}`
  );

  const elementLogoOver = document.getElementById(
    `item_card_logoover_${props.item._id}`
  );

  const elementActionsContainer = document.getElementById(
    `item_card_actionsContainer_${props.item._id}`
  );

  const elementActionsLogo = document.getElementById(
    `item_card_actionsLogo_${props.item._id}`
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

  const createdDate = new Date(props.item.createdAt);

  return (
    <>
      <div
        className="itemcard__container"
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        <div
          className="itemcard__picture"
          id={`item_card_picture_${props.item._id}`}
          //placeholder={spinnerFormated}
          style={{
            background: `url(${props.item.mediaUrlMedium})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div
          className="itemcard__logoover"
          id={`item_card_logoover_${props.item._id}`}
        >
          <EyeOutlined />
          <div style={{ fontSize: "12px" }}>Detail View</div>
        </div>
        <div
          className="itemcard__actionsContainer"
          id={`item_card_actionsContainer_${props.item._id}`}
        >
          <div
            className="itemcard__actionsLogo"
            id={`item_card_actionsLogo_${props.item._id}`}
          >
            <Tooltip placement="left" title={t("main.markAsFAvorite")}>
              <StarOutlined className="iconGold" />
            </Tooltip>
            <Tooltip placement="left" title={t("main.edit")}>
              <EditOutlined className="iconGreen" />
            </Tooltip>
            <Tooltip placement="left" title={t("main.delete")}>
              <Popconfirm
                title={t("items.deleteConfirm")}
                onConfirm={handleDelete}
                cancelText="Cancel"
                icon={<ExclamationCircleOutlined style={{ color: "black" }} />}
              >
                <DeleteOutlined className="iconRed" />
              </Popconfirm>
            </Tooltip>
          </div>
        </div>
        <div className="itemcard__meta">
          <EditableTitle
            title={props.item.title}
            id={props.item._id}
            type={"item"}
          />
          <div className="itemcard__date">
            {createdDate.toLocaleDateString()}
          </div>
        </div>
      </div>
    </>
  );
};
