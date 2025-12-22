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

import { LikeDislikeButton } from "../../../components/LikeDislikeButton/LikeDislikeButton";
import { EditableTitle } from "../../../components/EditableTitle/EditableTitle";
import { itemsStore } from "../itemsStore.js";
import { userStore } from "../../../stores/userStore/userStore.js";

import { archiveItem } from "../actions/archiveItem";
import { deleteItem } from "../actions/deleteItem";
import { updateFavoriteItem } from "../actions/updateFavoriteItem";
import { updatePrivateItem } from "../actions/updatePrivateItem";
import { getPictureUrl } from "../../../helpers/picture/getPictureUrl";
import { UserAvatar } from "../../../components/UserAvatar/UserAvatar.jsx";
import { Item } from "../../../types/itemTypes";

import "./ElementCard.less";

interface ElementCardProps {
  element: Item;
  showDetailView: (element: Item) => void;
}

export const ElementCard: React.FC<ElementCardProps> = ({element, showDetailView}) => {
  const { t } = useTranslation();
  const [isFavorited, setIsFavorited] = useState<boolean>(element.favorite);
  const [isPrivate, setIsPrivate] = useState<boolean>(element.private);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);

  const isSharedItem = parseInt(element.user.id.toString()) !== userStore.id;
  const hasMissingBrand = element.brand === null;
  const hasMissingCategory = element.category === null;
  const hasMissingColor = element.colors.length === 0;
  const hasMissingPattern = element.pattern === null;
  const hasMissingInfo =
    hasMissingBrand ||
    hasMissingCategory ||
    hasMissingPattern ||
    hasMissingColor;

  const spinnerFormated = (
    <div
      className="item__spinner"
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
      className="item__mehError"
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
      const url = await getPictureUrl(element.mediaId, "items");
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
        itemsStore.setIsOutOfDate(true);
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
        className="itemcard__container"
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        {loadingError ? (
          errorFormated
        ) : isLoading ? (
          spinnerFormated
        ) : (
          <div
            className="itemcard__picture"
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
              className="itemcard__missingInfo"
              onClick={() => {
                onMouseLeaveHandler();
                showDetailView(element);
              }}
            />
          </Tooltip>
        )}
        {element.active ? (
          <div
            className="itemcard__logoover"
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
            className="itemcard__archived"
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
          <div
            className="itemcard__actionsContainer"
            id={`card_item_actionsContainer_${element.id}`}
          >
            <div
              className="itemcard__actionsLogo"
              id={`card_item_actionsLogo_${element.id}`}
            >
              {element.active ? (
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
                    >
                      <DeleteOutlined className="iconRedHover" />
                    </Popconfirm>
                  </Tooltip>
                </>
              )}
            </div>
          </div>
        )}
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
            title={element.title}
            id={element.id}
            type={"item"}
            active={element.active}
            disabled={isSharedItem}
          />
          {isSharedItem ? (
            <Tooltip placement="bottom" title={element.user.userName}>
              <div className="itemcard__sharedItem">
                <UserAvatar user={element.user} page={"items"} />
              </div>
            </Tooltip>
          ) : isPrivate ? (
            <Tooltip placement="bottom" title={t("main.isPrivate")}>
              <div className="itemcard__private">
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
              element.active ? "itemcard__date" : "itemcard__date striked"
            }
          >
            {createdDate.toLocaleDateString()}
          </div>
        </div>
      </div>
    </>
  );
};
