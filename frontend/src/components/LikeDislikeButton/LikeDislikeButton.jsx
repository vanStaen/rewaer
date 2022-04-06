import React, { useRef, useState } from "react";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import { userStore } from "../../stores/userStore/userStore";
import { updateLikeDislike } from "./updateLikeDislike";
import { TooltipLike } from "./ToolTipLike";

import "./LikeDislikeButton.css";

export const LikeDislikeButton = (props) => {
  const arrayLikes = useRef(props.arrayLikes);
  const arrayDislikes = useRef(props.arrayDislikes);

  const [userHasLiked, setUserHasLiked] = useState(
    props.arrayLikes
      ? props.arrayLikes.indexOf(userStore._id) >= 0
        ? true
        : false
      : false
  );
  const [userHasDisliked, setUserHasDisliked] = useState(
    props.arrayDislikes
      ? props.arrayDislikes.indexOf(userStore._id) >= 0
        ? true
        : false
      : false
  );

  const likeClickHandler = () => {
    if (userHasDisliked) {
      const filteredArray = arrayDislikes.current.filter((id) => {
        return id !== userStore._id;
      });
      updateLikeDislike(props._id, props.type, false, filteredArray);
      arrayDislikes.current = filteredArray;
      setUserHasDisliked(false);
    }
    if (!userHasLiked) {
      arrayLikes.current === null
        ? (arrayLikes.current = [userStore._id])
        : arrayLikes.current.push(userStore._id);
      updateLikeDislike(props._id, props.type, true, arrayLikes.current);
      setUserHasLiked(true);
    } else {
      const filteredArray = arrayLikes.current.filter((id) => {
        return id !== userStore._id;
      });
      updateLikeDislike(props._id, props.type, true, filteredArray);
      arrayLikes.current = filteredArray;
      setUserHasLiked(false);
    }
  };

  const dislikeClickHandler = () => {
    if (userHasLiked) {
      const filteredArray = arrayLikes.current.filter((id) => {
        return id !== userStore._id;
      });
      updateLikeDislike(props._id, props.type, true, filteredArray);
      arrayLikes.current = filteredArray;
      setUserHasLiked(false);
    }
    if (!userHasDisliked) {
      arrayDislikes.current === null
        ? (arrayDislikes.current = [userStore._id])
        : arrayDislikes.current.push(userStore._id);
      updateLikeDislike(props._id, props.type, false, arrayDislikes.current);
      setUserHasDisliked(true);
    } else {
      const filteredArray = arrayDislikes.current.filter((id) => {
        return id !== userStore._id;
      });
      updateLikeDislike(props._id, props.type, false, filteredArray);
      arrayDislikes.current = filteredArray;
      setUserHasDisliked(false);
    }
  };

  return (
    <>
      <div
        className={props.profile ? "likeContainerProfile" : "likeContainerCard"}
      >
        <Tooltip
          title={
            arrayLikes.current === null ||
            arrayLikes.current.length === 0 ? null : (
              <TooltipLike arrayLikes={arrayLikes.current} />
            )
          }
          placement="bottom"
        >
          <div
            className={`like ${
              userHasLiked ? "iconGreen" : "iconGreenHover greyed"
            }`}
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
              <TooltipLike arrayLikes={arrayDislikes.current} />
            )
          }
          placement="bottom"
        >
          <div
            className={`like ${
              userHasDisliked ? "iconRed" : "iconRedHover greyed"
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
