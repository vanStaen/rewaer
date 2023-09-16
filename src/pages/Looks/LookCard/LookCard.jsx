import React, { useState, useEffect } from "react";
import { notification, Spin, Popconfirm, Tooltip } from "antd";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  HeartFilled,
  HeartOutlined,
  UndoOutlined,
  StopOutlined,
  TagOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { EditableTitle } from "../../../components/EditableTitle/EditableTitle";
import { looksStore } from "../looksStore";
import { archiveLook } from "../actions/archiveLook";
import { deleteLook } from "../actions/deleteLook";
import { updateFavoriteLook } from "../actions/updateFavoriteLook";
import { updatePrivateLook } from "../actions/updatePrivateLook";
import { loadImage } from "../../../helpers/loadImage";
import { LikeDislikeButton } from "../../../components/LikeDislikeButton/LikeDislikeButton";

import "./LookCard.css";

export const LookCard = (props) => {
  const { t } = useTranslation();
  const [isFavorited, setIsFavorited] = useState(props.look.favorite);
  const [isPrivate, setIsPrivate] = useState(props.look.private);
  const [isLoading, setIsLoading] = useState(true);
  const [numberItems, setNumberItems] = useState(
    props.look.items ? props.look.items.length : 0
  );

  const spinnerFormated = (
    <div
      className="look__spinner"
      onClick={() => {
        if (props.look.active) {
          props.setSelectedLook(props.look);
        }
      }}
    >
      <Spin size="middle" />
    </div>
  );

  const imageLoadingHander = async () => {
    await loadImage(props.look.mediaUrlMedium);
    setIsLoading(false);
  };

  useEffect(() => {
    imageLoadingHander();
  }, []);

  const handleArchive = (value) => {
    archiveLook(props.look._id, value)
      .then(() => {
        notification.success({
          message: value
            ? t("looks.restoreSuccess")
            : t("looks.archiveSuccess"),
          placement: "bottomRight",
          icon: value ? (
            <UndoOutlined style={{ color: "green" }} />
          ) : (
            <StopOutlined style={{ color: "green" }} />
          ),
        });
        looksStore.setIsOutOfDate(true);
      })
      .catch((error) => {
        notification.error({ message: `Error!`, placement: "bottomRight" });
        console.log(error.message);
      });
  };

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
    if (!isLoading) {
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
      if (props.look.active) {
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
    updateFavoriteLook(props.look._id, !isFavorited);
    setIsFavorited(!isFavorited);
  };

  const privateHandler = () => {
    if (isPrivate) {
      looksStore.setNumberOfPrivateLook(looksStore.numberOfPrivateLook - 1);
    } else {
      looksStore.setNumberOfPrivateLook(looksStore.numberOfPrivateLook + 1);
    }
    updatePrivateLook(props.look._id, !isPrivate);
    setIsPrivate(!isPrivate);
  };

  const createdDate = new Date(props.look.createdAt);

  return (
    <>
      <div
        className="lookcard__container"
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        {isLoading ? (
          spinnerFormated
        ) : (
          <div
            className="lookcard__picture"
            id={`card_look_picture_${props.look._id}`}
            style={{
              background: `url(${props.look.mediaUrlMedium})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        )}
        {props.look.active ? (
          <div
            className="lookcard__logoover"
            id={`card_look_logoover_${props.look._id}`}
            onClick={() => {
              onMouseLeaveHandler();
              props.showDetailView(props.look);
            }}
          >
            <TagOutlined />
            <div style={{ fontSize: "12px" }}>{t("looks.detailView")}</div>
          </div>
        ) : (
          <div
            className="lookcard__archived"
            id={`card_look_logoover_${props.look._id}`}
            onClick={() => {
              onMouseLeaveHandler();
              props.showDetailView(props.look);
            }}
          >
            <StopOutlined />
            <div style={{ fontSize: "12px" }}>{t("main.archived")}</div>
          </div>
        )}

        <div
          className="lookcard__actionsContainer"
          id={`card_look_actionsContainer_${props.look._id}`}
        >
          <div
            className="lookcard__actionsLogo"
            id={`card_look_actionsLogo_${props.look._id}`}
          >
            {props.look.active ? (
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
                    title={t("looks.archiveConfirm")}
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
                    title={t("looks.restoreConfirm")}
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
                    title={t("looks.deleteConfirm")}
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
                ? "lookcard__meta lookcard__metaPrivate lookcard__metaPrivateFavorite"
                : "lookcard__meta lookcard__metaPrivate"
              : isFavorited
                ? "lookcard__meta lookcard__metaFavorite"
                : "lookcard__meta"
          }
        >
          <EditableTitle
            title={props.look.title}
            id={props.look._id}
            type={"look"}
            active={props.look.active}
          />
          {isPrivate ? (
            <Tooltip placement="bottom" title={t("main.isPrivate")}>
              <div className="lookcard__private">
                <EyeInvisibleOutlined />
              </div>
            </Tooltip>
          ) : (
            props.look.active && (
              <LikeDislikeButton
                _id={props.look._id}
                arrayLikes={props.look.likes}
                arrayDislikes={props.look.dislikes}
                type="look"
              />
            )
          )}
          <div
            className={
              props.look.active ? "lookcard__date" : "lookcard__date striked"
            }
          >
            {numberItems}{" "}
            {numberItems > 1
              ? t("menu.items").toLowerCase()
              : t("menu.items").slice(0, -1).toLowerCase()}{" "}
            | {createdDate.toLocaleDateString()}
          </div>
        </div>
      </div>
    </>
  );
};
