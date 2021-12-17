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
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { EditableTitle } from "../../../components/EditableTitle/EditableTitle";
import { looksStore } from "../looksStore";
import { archiveLook } from "../actions/archiveLook";
import { deleteLook } from "../actions/deleteLook";
import { updateFavoriteLook } from "../actions/updateFavoriteLook";
import { updatePrivateLook } from "../actions/updatePrivateLook";
import { loadImage } from "../../../helpers/loadImage";

import "./LookCard.css";

export const LookCard = (props) => {
  const { t } = useTranslation();
  const [isFavorited, setIsFavorited] = useState(props.look.favorite);
  const [isPrivate, setIsPrivate] = useState(props.look.private);
  const [isLoading, setIsLoading] = useState(true);

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
  };

  const onMouseLeaveHandler = () => {
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
  };

  const favoriteHandler = () => {
    updateFavoriteLook(props.look._id, !isFavorited);
    setIsFavorited(!isFavorited);
  };

  const privateHandler = () => {
    updatePrivateLook(props.look._id, !isPrivate);
    setIsPrivate(!isPrivate);
    looksStore.setIsOutOfDate(true);
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
              //placeholder={spinnerFormated}
              style={{
                background: `url(${props.look.mediaUrlMedium})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          )}
        {isFavorited && props.look.active && (
          <div
            className="lookcard__favorite"
            id={`card_look_favorite_${props.look._id}`}
          >
            <HeartFilled className="iconRed" />
          </div>
        )}
        {props.look.active ? (
          <div
            className="lookcard__logoover"
            id={`card_look_logoover_${props.look._id}`}
            onClick={() => {
              onMouseLeaveHandler();
              props.setSelectedLook(props.look);
            }}
          >
            <TagOutlined />
            <div style={{ fontSize: "12px" }}>{t("looks.detailView")}</div>
          </div>
        ) : (
            <div
              className="lookcard__archived"
              id={`card_look_logoover_${props.look._id}`}
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
                {isPrivate ? (
                  <Tooltip placement="left" title={t("main.makePublic")}>
                    <EyeInvisibleOutlined
                      className="iconGreen"
                      onClick={privateHandler}
                    />
                  </Tooltip>
                ) : (
                    <Tooltip placement="left" title={t("main.makePrivate")}>
                      <EyeOutlined
                        className="iconGreen"
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
                    <StopOutlined className="iconRed" />
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
                      <UndoOutlined className="iconGreen" />
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
                      <DeleteOutlined className="iconRed" />
                    </Popconfirm>
                  </Tooltip>
                </>
              )}
          </div>
        </div>
        <div
          className={
            isPrivate
              ? "lookcard__meta lookcard__metaPrivate"
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
                <>
                  <div className="lookcard__likeContainer">
                    <div className="lookcard__like iconGreen">
                      <LikeOutlined />
                      <div className="lookcard__likeCount">12</div>
                    </div>
                    <div className="lookcard__like iconRed">
                      <DislikeOutlined />
                      <div className="lookcard__likeCount">5</div>
                    </div>
                  </div>
                </>
              )
            )}
          <div
            className={
              props.look.active ? "lookcard__date" : "lookcard__date striked"
            }
          >
            {createdDate.toLocaleDateString()}
          </div>
        </div>
      </div>
    </>
  );
};
