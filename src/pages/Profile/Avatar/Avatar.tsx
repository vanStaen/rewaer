import React, { useState, ChangeEvent, } from "react";
import { notification, Spin, Tooltip } from "antd";
import { EditOutlined, UserOutlined, CloseOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { userStore } from "../../../stores/userStore/userStore.js";
import { updateAvatar } from "./updateAvatar";
import { profileStore } from "../../../stores/profileStore/profileStore";
import { postPicture } from "../../../helpers/picture/postPicture";
import { useMediaUrl } from "../../../hooks/useMediaUrl";

import "./Avatar.less";

export const Avatar: React.FC = observer(() => {
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const isStranger: boolean = userStore.userName !== profileStore.userName;
  const avatar: string | null = isStranger ? profileStore.avatar : userStore.avatar;
  const bucket = "users";

  const [mediaS3Url, mediaLoading, mediaError] = useMediaUrl(avatar, bucket);

  const fileSelectHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    if (event.target.files && event.target.files[0]) {
      changeAvatarSubmitHandler(event.target.files[0]);
    }
  };

  const changeAvatarSubmitHandler = async (file: File) => {
    try {
      const res = await postPicture(file, bucket);
      const mediaId = res.path;
      updateAvatar(mediaId)
        .then(() => {
          notification.success({
            message: t("profile.avatarUpdateSuccess"),
            placement: "bottomRight",
          });
          userStore.setAvatar(mediaId);
          console.log("Success!");
        })
        .catch((error: Error) => {
          notification.error({
            message: t("profile.avatarUpdateFail"),
            placement: "bottomRight",
          });
          console.log(error.message);
        });
      setIsUploading(false);
    } catch (err: any) {
      console.error(err);
      notification.error({
        message: t("profile.avatarUpdateFail"),
        placement: "bottomRight",
      });
      setIsUploading(false);
      console.log(err);
    }
  };

  return (
    <div className="avatar__container">
      {isUploading || mediaLoading ? (
        <div className="avatar__avatar" style={{ backgroundColor: "#f9f9f9" }}>
          <div className="avatar__avatarLoading">
            <Spin size="large" />
          </div>
        </div>
      ) : mediaError ? (
        <div className="avatar__avatar" style={{ backgroundColor: "#f9f9f9" }}>
          <div className="avatar__avatarLoading">
            <CloseOutlined className="avatar__avatarError" />
          </div>
        </div>
      ) : (
        <div
          className="avatar__avatar"
          style={
            isStranger
              ? profileStore.avatar
                ? { backgroundImage: "url(" + mediaS3Url + ")" }
                : undefined
              : userStore.avatar
                ? { backgroundImage: "url(" + mediaS3Url + ")" }
                : undefined
          }
        >
          {isStranger
            ? !profileStore.avatar && (
                <UserOutlined className="avatar__noAvatar" />
              )
            : !userStore.avatar && (
                <UserOutlined className="avatar__noAvatar" />
              )}
          {!isStranger && (
            <div className="avatar__editAvatar">
              <Tooltip placement="bottom" title={t("profile.changeAvatar")}>
                <form className="avatar__form">
                  <input
                    type="file"
                    className="avatar__inputfile"
                    name="inputfile"
                    id="file"
                    onChange={fileSelectHandler}
                  />
                  <label htmlFor="file">
                    <EditOutlined />
                  </label>
                </form>
              </Tooltip>
            </div>
          )}
        </div>
      )}
    </div>
  );
});