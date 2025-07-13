import React, { useState } from "react";
import { notification, Spin, Tooltip } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { userStore } from "../../../stores/userStore/userStore.js";
import { updateAvatar } from "./updateAvatar";
import { profileStore } from "../../../stores/profileStore/profileStore";

import "./Avatar.css";

export const Avatar = observer(() => {
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState(false);
  const isStranger = userStore.userName !== profileStore.userName;
  const fileSelectHandler = async (event) => {
    setIsUploading(true);
    changeAvatarSubmitHandler(event.target.files[0]);
  };

  const changeAvatarSubmitHandler = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(process.env.API_URL + `/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      // Create Look entry
      const mediaId = data.imageUrl;
      // post new Look
      updateAvatar(mediaId)
        .then(() => {
          notification.success({
            message: t("profile.avatarUpdateSuccess"),
            placement: "bottomRight",
          });
          userStore.setAvatar(mediaId);
          console.log("Success!");
        })
        .catch((error) => {
          notification.error({
            message: t("profile.avatarUpdateFail"),
            placement: "bottomRight",
          });
          console.log(error.message);
        });
      setIsUploading(false);
    } catch (err) {
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
      {isUploading ? (
        <div className="avatar__avatar" style={{ backgroundColor: "#f9f9f9" }}>
          <div className="avatar__avatarLoading">
            <Spin size="large" />
          </div>
        </div>
      ) : (
        <div
          className="avatar__avatar"
          style={
            isStranger
              ? profileStore.avatar && {
                backgroundImage: "url(" + profileStore.avatar + ")",
              }
              : userStore.avatar && {
                backgroundImage: "url(" + userStore.avatar + ")",
              }
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
                <form
                  onSubmit={changeAvatarSubmitHandler}
                  className="avatar__form"
                >
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
