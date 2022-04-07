import React, { useEffect, useState } from "react";
import { Spin, Tooltip } from "antd";

import { getUserAvatarFromId } from "./getUserAvatarFromId.js";

import "./LikeDislikeButton.css";

const cachedUserAvatars = {};

export const TooltipLike = (props) => {
  const [usersAvatarsState, setUsersAvatarsState] = useState([]);

  useEffect(() => {
    (async () => {
      const userAvatars = [];
      for (let id of props.userIds) {
        if (id in cachedUserAvatars) {
          userAvatars.push(cachedUserAvatars[id]);
          continue;
        }
        const fetched = await getUserAvatarFromId(id);
        cachedUserAvatars[id] = {
          id: id,
          avatar: fetched.avatar,
          username: fetched.userName,
        };
        userAvatars.push(cachedUserAvatars[id]);
      }
      setUsersAvatarsState(userAvatars);
    })();
  }, []);

  const avatars = usersAvatarsState.map((user) => {
    return (
      // TODO: Link to user profile page
      <Tooltip title={user.username} key={`avatar_${user.id}`}>
        <div
          className="likeAvatar pointerCursor"
          style={{
            background: `url("${user.avatar}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </Tooltip>
    );
  });

  return usersAvatarsState.length === 0 ? (
    <div className="likeAvatarSpinner">
      <Spin size="small" />
    </div>
  ) : (
    <div className="likeAvatarContainer">{avatars}</div>
  );
};
