import React, { useState, useEffect } from "react";
import { Spin, Tooltip } from "antd";
import {
  StopOutlined,
  TagOutlined,
  EyeInvisibleOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { EditableTitle } from "../../../components/EditableTitle/EditableTitle";
import { loadImage } from "../../../helpers/picture/loadImage";
import { LikeDislikeButton } from "../../../components/LikeDislikeButton/LikeDislikeButton";
import { LookCardActions } from "./LookCardActions";

import "./LookCard.css";

export const LookCard = (props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [isFavorited, setIsFavorited] = useState(props.look.favorite);
  const [isPrivate, setIsPrivate] = useState(props.look.private);
  const [numberItems, setNumberItems] = useState(
    props.look.items ? props.look.items.length : 0,
  );

  useEffect(() => {
    setIsFavorited(props.look.favorite);
    setIsPrivate(props.look.private);
    setNumberItems(props.look.items ? props.look.items.length : 0);
  }, [props.look]);

  const errorFormated = (
    <div
      className="look__mehError"
      id={`card_look_picture_${props.look.id}`}
      onClick={() => {
        if (props.look.active) {
          props.showDetailView(props.look);
        }
      }}
    >
      <FileImageOutlined />
      <div style={{ fontSize: "15px" }}>File not found</div>
    </div>
  );

  const spinnerFormated = (
    <div
      className="look__spinner"
      onClick={() => {
        if (props.look.active) {
          props.showDetailView(props.look);
        }
      }}
    >
      <Spin size="middle" />
    </div>
  );

  const imageLoadingHander = async () => {
    try {
      console.log("HERE", props.look.mediaIdMedium);
      await loadImage(props.look.mediaIdMedium);
    } catch (e) {
      setLoadingError(true);
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    imageLoadingHander();
  }, []);

  const onMouseEnterHandler = () => {
    if (!isLoading) {
      const elementPicture = document.getElementById(
        `card_look_picture_${props.look.id}`,
      );
      const elementLogoOver = document.getElementById(
        `card_look_logoover_${props.look.id}`,
      );
      const elementActionsContainer = document.getElementById(
        `card_look_actionsContainer_${props.look.id}`,
      );
      const elementActionsLogo = document.getElementById(
        `card_look_actionsLogo_${props.look.id}`,
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
        `card_look_picture_${props.look.id}`,
      );
      const elementLogoOver = document.getElementById(
        `card_look_logoover_${props.look.id}`,
      );
      const elementActionsContainer = document.getElementById(
        `card_look_actionsContainer_${props.look.id}`,
      );
      const elementActionsLogo = document.getElementById(
        `card_look_actionsLogo_${props.look.id}`,
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

  const createdDate = new Date(props.look.createdAt);

  return (
    <>
      <div
        className="lookcard__container"
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        {loadingError ? (
          errorFormated
        ) : isLoading ? (
          spinnerFormated
        ) : (
          <div
            className="lookcard__picture"
            onClick={() => {
              if (props.look.active) {
                props.showDetailView(props.look);
              }
            }}
            id={`card_look_picture_${props.look.id}`}
            style={{
              background: `url(${props.look.mediaIdMedium})`,
            }}
          ></div>
        )}
        {props.look.active ? (
          <div
            className="lookcard__logoover"
            id={`card_look_logoover_${props.look.id}`}
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
            id={`card_look_logoover_${props.look.id}`}
            onClick={() => {
              onMouseLeaveHandler();
              props.showDetailView(props.look);
            }}
          >
            <StopOutlined />
            <div style={{ fontSize: "12px" }}>{t("main.archived")}</div>
          </div>
        )}

        <LookCardActions
          look={props.look}
          isFavorited={isFavorited}
          setIsFavorited={setIsFavorited}
          isPrivate={isPrivate}
          setIsPrivate={setIsPrivate}
        />
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
            id={props.look.id}
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
                id={props.look.id}
                mediaId={props.look.mediaId}
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
