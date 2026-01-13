import React from "react";
import {
  CameraOutlined,
  LikeOutlined,
  DislikeOutlined,
  UserAddOutlined,
  PictureOutlined,
  SkinOutlined,
  MailOutlined,
} from "@ant-design/icons";

// TODO : Review this

export const getNotificationIcon = (type: number): React.ReactNode => {
  switch (type) {
    case 3:
      return <MailOutlined />;
    case 4:
      return <SkinOutlined />;
    case 6:
      return <SkinOutlined />;
    case 5:
      return <CameraOutlined />;
    case 12:
      return <SkinOutlined />;
    case 13:
      return <LikeOutlined />;
    case 14:
      return <PictureOutlined />;
    case 15:
      return <DislikeOutlined />;
    case 16:
      return <UserAddOutlined />;
    default:
      return null;
  }
};
