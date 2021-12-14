import React, { useState } from "react";
import { notification, Spin, Popconfirm, Tooltip } from "antd";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  UndoOutlined,
  StopOutlined,
  EditOutlined,
  EyeOutlined,
  HeartOutlined,
  HeartFilled,
  HeartTwoTone,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { EditableTitle } from "../../../components/EditableTitle/EditableTitle";
import { itemsStore } from "../itemsStore";
import { archiveItem } from "../actions/archiveItem";
import { deleteItem } from "../actions/deleteItem";
import { updateFavoriteItem } from "../actions/updateFavoriteItem";

import "./ItemCard.css";

export const ItemCard = (props) => {
  const { t } = useTranslation();
  const [isFavorited, setIsFavorited] = useState(props.item.favorite);
  const spinnerFormated = (
    <div className="item__spinner">
      <Spin size="middle" />
    </div>
  );
  const handleArchive = (value) => {
    archiveItem(props.item._id, value)
      .then(() => {
        notification.success({
          message: value
            ? t("items.restoreSuccess")
            : t("items.archiveSuccess"),
          placement: "bottomRight",
          icon: value ? (
            <UndoOutlined style={{ color: "green" }} />
          ) : (
            <StopOutlined style={{ color: "green" }} />
          ),
        });
        itemsStore.setIsOutOfDate(true);
      })
      .catch((error) => {
        notification.error({ message: `Error!`, placement: "bottomRight" });
        console.log(error.message);
      });
  };

  const handleDelete = () => {
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
    `card_item_picture_${props.item._id}`
  );

  const elementLogoOver = document.getElementById(
    `card_item_logoover_${props.item._id}`
  );

  const elementActionsContainer = document.getElementById(
    `card_item_actionsContainer_${props.item._id}`
  );

  const elementActionsLogo = document.getElementById(
    `card_item_actionsLogo_${props.item._id}`
  );

  const onMouseEnterHandler = () => {
    elementPicture.style.filter = "brightness(50%)";
    elementLogoOver.style.display = "block";
    elementActionsContainer.style.width = "34px";
    elementActionsContainer.style.opacity = ".85";
    elementActionsLogo.style.display = "block";
  };

  const onMouseLeaveHandler = () => {
    if (props.item.active) {
      elementPicture.style.filter = "brightness(100%)";
      elementLogoOver.style.display = "none";
      elementActionsContainer.style.width = "0px";
      setTimeout(() => {
        elementActionsLogo.style.display = "none";
        elementActionsContainer.style.opacity = "0";
      }, 100);
    } else {
      elementActionsContainer.style.width = "0px";
      setTimeout(() => {
        elementActionsLogo.style.display = "none";
        elementActionsContainer.style.opacity = "0";
      }, 100);
    }
  };

  const favoriteHandler = () => {
    updateFavoriteItem(props.item._id, !isFavorited);
    setIsFavorited(!isFavorited);
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
          id={`card_item_picture_${props.item._id}`}
          //placeholder={spinnerFormated}
          style={{
            background: `url(${props.item.mediaUrlMedium})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        {isFavorited && props.item.active && (
          <div
            className="itemcard__favorite"
            id={`card_item_favorite_${props.item._id}`}
          >
            <HeartFilled className="iconRed" />
          </div>
        )}
        {props.item.active ? (
          <div
            className="itemcard__logoover"
            id={`card_item_logoover_${props.item._id}`}
          >
            <EyeOutlined />
            <div style={{ fontSize: "12px" }}>Detail View</div>
          </div>
        ) : (
          <div
            className="itemcard__archived"
            id={`card_item_logoover_${props.item._id}`}
          >
            <StopOutlined />
            <div style={{ fontSize: "12px" }}>{t("main.archived")}</div>
          </div>
        )}

        <div
          className="itemcard__actionsContainer"
          id={`card_item_actionsContainer_${props.item._id}`}
        >
          <div
            className="itemcard__actionsLogo"
            id={`card_item_actionsLogo_${props.item._id}`}
          >
            {props.item.active ? (
              <>
                <Tooltip placement="left" title={t("main.markAsFavorite")}>
                  {isFavorited ? (
                    <HeartFilled
                      className="iconRed"
                      onClick={favoriteHandler}
                    />
                  ) : (
                    <HeartOutlined
                      className="iconRed"
                      onClick={favoriteHandler}
                    />
                  )}
                </Tooltip>
                <Tooltip placement="left" title={t("main.edit")}>
                  <EditOutlined className="iconGreen" />
                </Tooltip>
                <Tooltip placement="left" title={t("main.archive")}>
                  <Popconfirm
                    title={t("items.archiveConfirm")}
                    onConfirm={() => handleArchive(false)}
                    okText={t("main.archive")}
                    cancelText={t("main.cancel")}
                    icon={
                      <ExclamationCircleOutlined style={{ color: "black" }} />
                    }
                  >
                    <StopOutlined className="iconRed" />
                  </Popconfirm>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip placement="left" title={t("main.restore")}>
                  <Popconfirm
                    title={t("items.restoreConfirm")}
                    onConfirm={() => handleArchive(true)}
                    okText={t("main.restore")}
                    cancelText={t("main.cancel")}
                    icon={
                      <ExclamationCircleOutlined style={{ color: "black" }} />
                    }
                  >
                    <UndoOutlined className="iconGreen" />
                  </Popconfirm>
                </Tooltip>
                <Tooltip placement="left" title={t("main.delete")}>
                  <Popconfirm
                    title={t("items.deleteConfirm")}
                    onConfirm={handleDelete}
                    okText={t("main.delete")}
                    cancelText={t("main.cancel")}
                    icon={
                      <ExclamationCircleOutlined style={{ color: "black" }} />
                    }
                  >
                    <DeleteOutlined className="iconRed" />
                  </Popconfirm>
                </Tooltip>
              </>
            )}
          </div>
        </div>
        <div className="itemcard__meta">
          <EditableTitle
            title={props.item.title}
            id={props.item._id}
            type={"item"}
            active={props.item.active}
          />
          <div
            className={
              props.item.active ? "itemcard__date" : "itemcard__date striked"
            }
          >
            {createdDate.toLocaleDateString()}
          </div>
        </div>
      </div>
    </>
  );
};
