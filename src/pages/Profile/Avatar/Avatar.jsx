import React, { useState, useEffect } from "react";
import { notification, Spin, Tooltip } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { userStore } from "../../../stores/userStore/userStore.js";
import { updateAvatar } from "./updateAvatar";
import { profileStore } from "../../../stores/profileStore/profileStore";
import { postPicture } from "../../../helpers/picture/postPicture";
import { getPictureUrl } from "../../../helpers/picture/getPictureUrl";

import "./Avatar.css";

export const Avatar = observer(() => {
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isStranger = userStore.userName !== profileStore.userName;
  const avatar = isStranger ? profileStore.avatar : userStore.avatar;
  const [avatarUrl, setAvatarUrl] = useState(null);
  const bucket = "users";

  const getAvatarUrl = async (path) => {
    try {
      setAvatarUrl(null);
      if (path) {
        const url = await getPictureUrl(path, bucket);
        const isloaded = new Promise((resolve, reject) => {
          const loadImg = new Image();
          loadImg.src = url;
          loadImg.onload = () => resolve(url);
          loadImg.onerror = (err) => reject(err);
        });
        await isloaded;
        setAvatarUrl(url);
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAvatarUrl(avatar);
  }, [avatar]);

  const fileSelectHandler = async (event) => {
    setIsUploading(true);
    changeAvatarSubmitHandler(event.target.files[0]);
  };

  const changeAvatarSubmitHandler = async (file) => {
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
        .catch((error) => {
          notification.error({
            message: t("profile.avatarUpdateFail"),
            placement: "bottomRight",
          });
          console.log(error.message);
        });
      setIsUploading(false);
    } catch (err) {
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
                  backgroundImage: "url(" + avatarUrl + ")",
                }
              : userStore.avatar && {
                  backgroundImage: "url(" + avatarUrl + ")",
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
