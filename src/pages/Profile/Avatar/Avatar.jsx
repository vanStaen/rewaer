import React, { useState } from "react";
import axios from "axios";
import { observer } from "mobx-react";
import { Tooltip, notification, Spin } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { userStore } from "../../../stores/userStore/userStore";
import { updateAvatar } from "./updateAvatar";

import "./Avatar.css";
import { profileStore } from "../../../stores/profileStore/profileStore";

export const Avatar = observer(() => {
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState(false);
  const isStranger = userStore.userName === profileStore.userName ? false : true;
  const fileSelectHandler = async (event) => {
    setIsUploading(true);
    changeAvatarSubmitHandler(event.target.files[0]);
  };

  const changeAvatarSubmitHandler = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(process.env.API_URL + `/upload`, formData);
      // Create Look entry
      const mediaUrl = res.data.imageUrl;
      // post new Look
      updateAvatar(mediaUrl)
        .then(() => {
          notification.success({
            message: t("profile.avatarUpdateSuccess"),
            placement: "bottomRight",
          });
          userStore.setAvatar(mediaUrl);
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
            isStranger ?
              profileStore.avatar && {
                backgroundImage: "url(" + profileStore.avatar + ")",
              } :
              userStore.avatar && {
                backgroundImage: "url(" + userStore.avatar + ")",
              }
          }
        >
          {isStranger ?
            !profileStore.avatar && <UserOutlined className="avatar__noAvatar" /> :
            !userStore.avatar && <UserOutlined className="avatar__noAvatar" />}
          {!isStranger && <div className="avatar__editAvatar">
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
          </div>}
        </div>
      )}
    </div>
  );
});
