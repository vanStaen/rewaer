import React, { useState, useEffect } from "react";
import { notification, Spin, Popconfirm, Tooltip } from "antd";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  UndoOutlined,
  StopOutlined,
  TagOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  HeartOutlined,
  HeartFilled,
  FileImageOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { LikeDislikeButton } from "../../../components/LikeDislikeButton/LikeDislikeButton";
import { EditableTitle } from "../../../components/EditableTitle/EditableTitle";
import { itemsStore } from "../itemsStore";
import { archiveItem } from "../actions/archiveItem";
import { deleteItem } from "../actions/deleteItem";
import { updateFavoriteItem } from "../actions/updateFavoriteItem";
import { updatePrivateItem } from "../actions/updatePrivateItem";
import { loadImage } from "../../../helpers/loadImage";

import "./ItemCard.css";

export const ItemCard = (props) => {
  const { t } = useTranslation();
  const [isFavorited, setIsFavorited] = useState(props.item.favorite);
  const [isPrivate, setIsPrivate] = useState(props.item.private);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  const spinnerFormated = (
    <div
      className="item__spinner"
      onClick={() => {
        if (props.item.active) {
          props.showDetailView(props.item);
        }
      }}
    >
      <Spin size="middle" />
    </div>
  );

  const errorFormated = (
    <div
      className="item__mehError"
      onClick={() => {
        if (props.item.active) {
          props.showDetailView(props.item);
        }
      }}
    >
      <FileImageOutlined />
      <div style={{ fontSize: "15px" }}>File not found</div>
    </div>
  );

  const imageLoadingHander = async () => {
    try {
      await loadImage(props.item.mediaUrlMedium);
      setIsLoading(false);
    } catch (e) {
      setLoadingError(true);
      console.log(e);
    }
  };

  useEffect(() => {
    imageLoadingHander();
  }, []);

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

  const onMouseEnterHandler = () => {
    if (!isLoading) {
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
      elementPicture.style.filter = "brightness(50%)";
      elementLogoOver.style.display = "block";
      elementActionsContainer.style.width = "34px";
      elementActionsContainer.style.opacity = ".85";
      elementActionsLogo.style.display = "block";
    }
  };

  const onMouseLeaveHandler = () => {
    if (!isLoading) {
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
    }
  };

  const favoriteHandler = () => {
    updateFavoriteItem(props.item._id, !isFavorited);
    setIsFavorited(!isFavorited);
  };

  const privateHandler = () => {
    if (isPrivate) {
      itemsStore.setNumberOfPrivateItem(itemsStore.numberOfPrivateItem - 1);
    } else {
      itemsStore.setNumberOfPrivateItem(itemsStore.numberOfPrivateItem + 1);
    }
    updatePrivateItem(props.item._id, !isPrivate);
    setIsPrivate(!isPrivate);
  };

  const createdDate = new Date(props.item.createdAt);

  return (
    <>
      <div
        className="itemcard__container"
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
        onClick={() => {
          if (props.item.active) {
            props.showDetailView(props.item);
          }
        }}
      >
        {loadingError ? (
          errorFormated
        ) : isLoading ? (
          spinnerFormated
        ) : (
          <div
            className="itemcard__picture"
            id={`card_item_picture_${props.item._id}`}
            style={{
              background: `url(${props.item.mediaUrlMedium})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        )}
        {props.item.active ? (
          <div
            className="itemcard__logoover"
            id={`card_item_logoover_${props.item._id}`}
            onClick={() => {
              if (props.item.active) {
                props.showDetailView(props.item);
              }
            }}
          >
            <TagOutlined />
            <div style={{ fontSize: "12px" }}>Detail View</div>
          </div>
        ) : (
          <div
            className="itemcard__archived"
            id={`card_item_logoover_${props.item._id}`}
            onClick={() => {
              onMouseLeaveHandler();
              props.showDetailView(props.item);
            }}
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
                      className="iconRedHover"
                      onClick={favoriteHandler}
                    />
                  ) : (
                    <HeartOutlined
                      className="iconRedHover"
                      onClick={favoriteHandler}
                    />
                  )}
                </Tooltip>
                {isPrivate ? (
                  <Tooltip placement="left" title={t("main.makePublic")}>
                    <EyeInvisibleOutlined
                      className="iconGreenHover"
                      onClick={privateHandler}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip placement="left" title={t("main.makePrivate")}>
                    <EyeOutlined
                      className="iconGreenHover"
                      onClick={privateHandler}
                    />
                  </Tooltip>
                )}
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
                    <StopOutlined className="iconRedHover" />
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
                    <UndoOutlined className="iconGreenHover" />
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
                    <DeleteOutlined className="iconRedHover" />
                  </Popconfirm>
                </Tooltip>
              </>
            )}
          </div>
        </div>
        <div
          className={
            isPrivate
              ? isFavorited
                ? "itemcard__meta itemcard__metaPrivate itemcard__metaPrivateFavorite"
                : "itemcard__meta itemcard__metaPrivate"
              : isFavorited
              ? "itemcard__meta itemcard__metaFavorite"
              : "itemcard__meta"
          }
        >
          <EditableTitle
            title={props.item.title}
            id={props.item._id}
            type={"item"}
            active={props.item.active}
          />
          {isPrivate ? (
            <Tooltip placement="bottom" title={t("main.isPrivate")}>
              <div className="itemcard__private">
                <EyeInvisibleOutlined />
              </div>
            </Tooltip>
          ) : (
            props.item.active && (
              <LikeDislikeButton
                _id={props.item._id}
                arrayLikes={props.item.likes}
                arrayDislikes={props.item.dislikes}
                type="item"
              />
            )
          )}
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
