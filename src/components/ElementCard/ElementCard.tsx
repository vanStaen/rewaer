import React, { useState, useEffect } from "react";
import { notification, Spin, Popconfirm, Tooltip } from "antd";
import {
  DeleteOutlined,
  ExclamationOutlined,
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

import { LikeDislikeButton } from "../LikeDislikeButton/LikeDislikeButton";
import { EditableTitle } from "../EditableTitle/EditableTitle";
import { itemsStore } from "../../pages/Items/itemsStore.js";
import { looksStore } from "../../pages/Looks/looksStore.js";
import { userStore } from "../../stores/userStore/userStore.js";

import { archiveItem } from "../../pages/Items/actions/archiveItem";
import { deleteItem } from "../../pages/Items/actions/deleteItem";
import { updateFavoriteItem } from "../../pages/Items/actions/updateFavoriteItem";
import { updatePrivateItem } from "../../pages/Items/actions/updatePrivateItem";
import { getPictureUrl } from "../../helpers/picture/getPictureUrl";
import { UserAvatar } from "../UserAvatar/UserAvatar.jsx";
import { ElementCardActions } from "./ElementCardActions";
import { ElementCardProps } from "./ElementCardTypes";

import "./ElementCard.less";

export const ElementCard: React.FC<ElementCardProps> = ({type, element, showDetailView}) => {
  const { t } = useTranslation();
  const [isFavorited, setIsFavorited] = useState<boolean>(element.favorite);
  const [isPrivate, setIsPrivate] = useState<boolean>(element.private);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);

  const isSharedItem = parseInt(element.user.id.toString()) !== userStore.id;
  const hasMissingBrand = element.brand === null;
  const hasMissingCategory = element.category === null;
  const hasMissingColor = type === "items" ? element.colors.length === 0: false;
  const hasMissingPattern = element.pattern === null;
  const hasMissingInfo =
    hasMissingBrand ||
    hasMissingCategory ||
    hasMissingPattern ||
    hasMissingColor;

  const spinnerFormated = (
    <div
      className="element__spinner"
      onClick={() => {
        if (element.active) {
          showDetailView(element);
        }
      }}
    >
      <Spin />
    </div>
  );

  const errorFormated = (
    <div
      className="element__mehError"
      id={`card_item_picture_${element.id}`}
      onClick={() => {
        if (element.active) {
          showDetailView(element);
        }
      }}
    >
      <FileImageOutlined />
      <div style={{ fontSize: "15px" }}>File not found</div>
    </div>
  );

  const imageLoadingHander = async (): Promise<void> => {
    try {
      // TODO  fetch small image
      const url = await getPictureUrl(element.mediaId, type);
      const isloaded = new Promise<string>((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = url;
        loadImg.onload = () => resolve(url);
        loadImg.onerror = (err) => reject(err);
      });
      await isloaded;
      setMediaUrl(url);
    } catch (e) {
      setLoadingError(true);
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    imageLoadingHander();
  }, [element.mediaId]);

  const handleArchive = (value: boolean): void => {
    archiveItem(element.id, value)
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
        type === "items"
          ? itemsStore.setIsOutOfDate(true)
          : looksStore.setIsOutOfDate(true);
      })
      .catch((error) => {
        notification.error({ message: `Error!`, placement: "bottomRight" });
        console.log(error.message);
      });
  };

  const handleDelete = (): void => {
    deleteItem(element.id)
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

  const onMouseEnterHandler = (): void => {
    if (!isLoading) {
      const elementPicture = document.getElementById(
        `card_item_picture_${element.id}`,
      );
      const elementLogoOver = document.getElementById(
        `card_item_logoover_${element.id}`,
      );
      if (elementPicture) {
        elementPicture.style.filter = "brightness(50%)";
      }
      if (elementLogoOver && (!loadingError || !element.active)) {
        elementLogoOver.style.display = "block";
      }
      if (!isSharedItem) {
        const elementActionsContainer = document.getElementById(
          `card_item_actionsContainer_${element.id}`,
        );
        const elementActionsLogo = document.getElementById(
          `card_item_actionsLogo_${element.id}`,
        );
        if (elementActionsContainer) {
          elementActionsContainer.style.width = "34px";
          elementActionsContainer.style.opacity = ".85";
        }
        if (elementActionsLogo) {
          elementActionsLogo.style.display = "block";
        }
      }
    }
  };

  const onMouseLeaveHandler = (): void => {
    if (!isLoading) {
      const elementPicture = document.getElementById(
        `card_item_picture_${element.id}`,
      );
      const elementLogoOver = document.getElementById(
        `card_item_logoover_${element.id}`,
      );
      if (!isSharedItem) {
        const elementActionsContainer = document.getElementById(
          `card_item_actionsContainer_${element.id}`,
        );
        const elementActionsLogo = document.getElementById(
          `card_item_actionsLogo_${element.id}`,
        );
        if (element.active) {
          if (elementActionsContainer) {
            elementActionsContainer.style.width = "0px";
            setTimeout(() => {
              if (elementActionsLogo) {
                elementActionsLogo.style.display = "none";
              }
              if (elementActionsContainer) {
                elementActionsContainer.style.opacity = "0";
              }
            }, 100);
          }
        } else {
          if (elementActionsContainer) {
            elementActionsContainer.style.width = "0px";
            setTimeout(() => {
              if (elementActionsLogo) {
                elementActionsLogo.style.display = "none";
              }
              if (elementActionsContainer) {
                elementActionsContainer.style.opacity = "0";
              }
            }, 100);
          }
        }
      }
      if (element.active) {
        if (elementPicture) {
          elementPicture.style.filter = "brightness(100%)";
        }
        if (elementLogoOver) {
          elementLogoOver.style.display = "none";
        }
      }
    }
  }; 

  const favoriteHandler = (): void => {
    updateFavoriteItem(element.id, !isFavorited);
    setIsFavorited(!isFavorited);
  };

  const privateHandler = (): void => {
    if (isPrivate) {
      itemsStore.setNumberOfPrivateItem(itemsStore.numberOfPrivateItem - 1);
    } else {
      itemsStore.setNumberOfPrivateItem(itemsStore.numberOfPrivateItem + 1);
    }
    updatePrivateItem(element.id, !isPrivate);
    setIsPrivate(!isPrivate);
  };

  const createdDate = new Date(element.createdAt);

  return (
    <>
      <div
        className="elementcard__container"
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        {loadingError ? (
          errorFormated
        ) : isLoading ? (
          spinnerFormated
        ) : (
          <div
            className="elementcard__picture"
            id={`card_item_picture_${element.id}`}
            style={{
              background: `url(${mediaUrl})`,
            }}
            onClick={() => {
              if (element.active) {
                showDetailView(element);
              }
            }}
          ></div>
        )}
        {hasMissingInfo && !isSharedItem && (
          <Tooltip
            title={`Missing${hasMissingBrand ? " Brand" : ""}
                           ${hasMissingCategory ? " Category" : ""}
                           ${hasMissingColor ? " Color" : ""}
                           ${hasMissingPattern ? " Pattern" : ""}`}
          >
            <ExclamationOutlined
              className="elementcard__missingInfo"
              onClick={() => {
                onMouseLeaveHandler();
                showDetailView(element);
              }}
            />
          </Tooltip>
        )}
        {element.active ? (
          <div
            className="elementcard__logoover"
            id={`card_item_logoover_${element.id}`}
            onClick={() => {
              if (element.active) {
                showDetailView(element);
              }
            }}
          >
            <TagOutlined />
            <div style={{ fontSize: "12px" }}>Detail View</div>
          </div>
        ) : (
          <div
            className="elementcard__archived"
            id={`card_item_logoover_${element.id}`}
            onClick={() => {
              onMouseLeaveHandler();
              showDetailView(element);
            }}
          >
            <StopOutlined />
            <div style={{ fontSize: "12px" }}>{t("main.archived")}</div>
          </div>
        )}

        {!isSharedItem && (
          <ElementCardActions
            elementId={element.id}
            isActive={element.active}
            isFavorited={isFavorited}
            isPrivate={isPrivate}
            onFavoriteToggle={favoriteHandler}
            onPrivateToggle={privateHandler}
            onArchive={handleArchive}
            onDelete={handleDelete}
          /> 
        )}
        <div
          className={
            isPrivate
              ? isFavorited
                ? "elementcard__meta elementcard__metaPrivate elementcard__metaPrivateFavorite"
                : "elementcard__meta elementcard__metaPrivate"
              : isFavorited
                ? "elementcard__meta elementcard__metaFavorite"
                : "elementcard__meta"
          }
        >
          <EditableTitle
            title={element.title}
            id={element.id}
            type={"item"}
            active={element.active}
            disabled={isSharedItem}
          />
          {isSharedItem ? (
            <Tooltip placement="bottom" title={element.user.userName}>
              <div className="elementcard__sharedItem">
                <UserAvatar user={element.user} page={"items"} />
              </div>
            </Tooltip>
          ) : isPrivate ? (
            <Tooltip placement="bottom" title={t("main.isPrivate")}>
              <div className="elementcard__private">
                <EyeInvisibleOutlined />
              </div>
            </Tooltip>
          ) : (
            element.active && (
              <LikeDislikeButton
                id={element.id}
                mediaId={element.mediaId}
                arrayLikes={element.likes}
                arrayDislikes={element.dislikes}
                type="item"
              />
            )
          )}
          <div
            className={
              element.active ? "elementcard__date" : "elementcard__date striked"
            }
          >
            {createdDate.toLocaleDateString()}
          </div>
        </div>
      </div>
    </>
  );
};
