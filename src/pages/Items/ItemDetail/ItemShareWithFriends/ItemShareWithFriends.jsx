import React from "react";
import { Spin, Tooltip } from "antd";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { userStore } from "../../../../stores/userStore/userStore";

import "./ItemShareWithFriends.css";

export const ItemShareWithFriends = observer((props) => {
  const { t } = useTranslation();

  const itemSharedWithFriends = userStore.friends.map((user) => {
    return (
      <Tooltip
        title={
          <Link to={`/${user.userName}`} className="linkAvatarUsername">
            {user.userName}
          </Link>
        }
        key={`avatar_${user.id}`}
      >
        <div
          className="itemdetail__userAvatar pointerCursor"
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

  return <div className="itemShared__Container">{itemSharedWithFriends}</div>;
});
