import React, { useEffect, useRef, useState } from "react";
import { Spin, Tooltip } from "antd";

import { getUserAvatarFromId } from "./getUserAvatarFromId.js";

import "./LikeDislikeButton.css";

export const TooltipLike = (props) => {
  // Save in a store
  const [usersAvatarsState, setUsersAvatarsState] = useState([]);
  // Prepopulate with value from store
  const usersAvatars = useRef([]);

  useEffect(() => {
    props.arrayLikes.map(async (_id) => {
      // Only if info not found in store
      const fetched = await getUserAvatarFromId(_id);
      usersAvatars.current.push({
        _id: _id,
        avatar: fetched.avatar,
        username: fetched.userName,
      });
      console.log(usersAvatars.current);
      setUsersAvatarsState(usersAvatars.current);
    });
  }, []);

  const avatars = props.arrayLikes.map((_id) => {
    const posInArr = usersAvatarsState
      .map(function (e) {
        return e._id;
      })
      .indexOf(_id);

    console.log("usersAvatarsState", usersAvatarsState);

    if (posInArr === -1) {
      return (
        <div className="likeAvatarSpinner">
          <Spin size="small" />
        </div>
      );
    } else {
      return (
        // Link to user profile page
        <Tooltip title={usersAvatarsState[posInArr].username}>
          <div
            key={`avatar_${_id}`}
            className="likeAvatar pointerCursor"
            style={{
              background: `url("${usersAvatarsState[posInArr].avatar}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </Tooltip>
      );
    }
  });

  return <div className="likeAvatarContainer">{avatars}</div>;
};
