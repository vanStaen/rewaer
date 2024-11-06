import React, { useRef, useState } from "react";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import { userStore } from "../../stores/userStore/userStore.js";
import { profileStore } from "../../stores/profileStore/profileStore";
import { updateLikeDislike } from "./updateLikeDislike";
import { postNotificationLikeDislike } from "./postNotificationLikeDislike";
import { TooltipLike } from "./ToolTipLike";

import "./LikeDislikeButton.css";

export const LikeDislikeButton = (props) => {
  const arrayLikes = useRef(props.arrayLikes);
  const arrayDislikes = useRef(props.arrayDislikes);

  const [userHasLiked, setUserHasLiked] = useState(
    props.arrayLikes ? props.arrayLikes.indexOf(userStore.id) >= 0 : false,
  );
  const [userHasDisliked, setUserHasDisliked] = useState(
    props.arrayDislikes
      ? props.arrayDislikes.indexOf(userStore.id) >= 0
      : false,
  );

  const userNotifiedId = profileStore.id ? profileStore.id : userStore.id;

  const likeClickHandler = () => {
    if (userHasDisliked) {
      const filteredArray = arrayDislikes.current.filter((id) => {
        return id !== userStore.id;
      });
      updateLikeDislike(props.id, props.type, false, filteredArray);
      arrayDislikes.current = filteredArray;
      setUserHasDisliked(false);
    }
    if (!userHasLiked) {
      arrayLikes.current === null
        ? (arrayLikes.current = [userStore.id])
        : arrayLikes.current.push(userStore.id);
      updateLikeDislike(props.id, props.type, true, arrayLikes.current);
      postNotificationLikeDislike(
        props.type,
        true,
        props.mediaId,
        userNotifiedId,
        props.id,
      );
      setUserHasLiked(true);
    } else {
      const filteredArray = arrayLikes.current.filter((id) => {
        return id !== userStore.id;
      });
      updateLikeDislike(props.id, props.type, true, filteredArray);
      arrayLikes.current = filteredArray;
      setUserHasLiked(false);
    }
  };

  const dislikeClickHandler = () => {
    if (userHasLiked) {
      const filteredArray = arrayLikes.current.filter((id) => {
        return id !== userStore.id;
      });
      updateLikeDislike(props.id, props.type, true, filteredArray);
      arrayLikes.current = filteredArray;
      setUserHasLiked(false);
    }
    if (!userHasDisliked) {
      arrayDislikes.current === null
        ? (arrayDislikes.current = [userStore.id])
        : arrayDislikes.current.push(userStore.id);
      updateLikeDislike(props.id, props.type, false, arrayDislikes.current);
      postNotificationLikeDislike(
        props.type,
        false,
        props.mediaId,
        userNotifiedId,
        props.id,
      );
      setUserHasDisliked(true);
    } else {
      const filteredArray = arrayDislikes.current.filter((id) => {
        return id !== userStore.id;
      });
      updateLikeDislike(props.id, props.type, false, filteredArray);
      arrayDislikes.current = filteredArray;
      setUserHasDisliked(false);
    }
  };

  return (
    <>
      <div
        className={
          props.profile
            ? "likeContainerProfile"
            : props.type === "item"
              ? "likeContainerCardItem"
              : "likeContainerCard"
        }
      >
        <Tooltip
          title={
            arrayLikes.current === null ||
              arrayLikes.current.length === 0 ? null : (
              <TooltipLike userIds={arrayLikes.current} />
            )
          }
          placement="bottom"
        >
          <div
            className={`like ${userHasLiked
              ? "iconGreen"
              : arrayLikes.current === null || arrayLikes.current.length === 0
                ? "iconGreenHover lightGreyed"
                : "iconGreenHover greyed"
              } ${props.type === "item" && "itemSpacer"}`}
            onClick={likeClickHandler}
          >
            <LikeOutlined />
            <div className="likeCount">
              {arrayLikes.current === null ? 0 : arrayLikes.current.length}
            </div>
          </div>
        </Tooltip>
        <Tooltip
          title={
            arrayDislikes.current === null ||
              arrayDislikes.current.length === 0 ? null : (
              <TooltipLike userIds={arrayDislikes.current} />
            )
          }
          placement="bottom"
        >
          <div
            className={`like ${userHasDisliked
              ? "iconRed"
              : arrayDislikes.current === null ||
                arrayDislikes.current.length === 0
                ? "iconRedHover lightGreyed"
                : "iconRedHover greyed"
              }`}
            onClick={dislikeClickHandler}
          >
            <DislikeOutlined />
            <div className="likeCount">
              {arrayDislikes.current === null
                ? 0
                : arrayDislikes.current.length}
            </div>
          </div>
        </Tooltip>
      </div>
    </>
  );
};
