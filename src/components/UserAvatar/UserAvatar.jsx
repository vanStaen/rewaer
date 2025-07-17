import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Spin } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { useMediaUrl } from "../../hooks/useMediaUrl";
import { profileStore } from "../../stores/profileStore/profileStore";
import { itemsStore } from "../../pages/Items/itemsStore";

import "./UserAvatar.less";

// TODO make square and reuse it

export const UserAvatar = ({ user, page }) => {
  const bucket = "users";
  const [mediaUrl, mediaLoading, mediaError] = useMediaUrl(user.avatar, bucket);

  return (
    <Link
      to={`/${user.userName}`}
      onClick={() => {
        profileStore.fetchProfileData(user.userName);
        page === "items" &&
          itemsStore.setOriginalScrollPosition(
            itemsStore.lastKnownScrollPosition,
          );
      }}
    >
      {mediaError ? (
        <Avatar
          icon={<CloseOutlined className="userAvatar__loadingError" />}
          className="userAvatar__loadingErrorContainer"
          size={36}
        />
      ) : mediaLoading ? (
        <Avatar icon={<Spin size="small" />} size={36} />
      ) : (
        <Avatar src={mediaUrl} size={36} />
      )}
    </Link>
  );
};
