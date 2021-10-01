import React, { useEffect, useState } from "react";
import axios from "axios";
import { observer } from "mobx-react";
import { Tooltip, notification, Spin } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";

import { MenuBar } from "../../components/MenuBar/MenuBar";
import { userStore } from "../../stores/userStore/userStore";
import { updateAvatar } from "./updateAvatar";

import "./Profil.css";

export const Profil = observer(() => {
  const [isUploading, setIsUploading] = useState(false);
  const fileSelectHandler = async (event) => {
    setIsUploading(true);
    changeAvatarSubmitHandler(event.target.files[0]);
  };

  const changeAvatarSubmitHandler = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + `/upload`,
        formData
      );
      // Create Look entry
      const mediaUrl = res.data.imageUrl;
      // post new Look
      updateAvatar(mediaUrl)
        .then(() => {
          notification.success({
            message: `Avatar updated successfully.`,
            placement: "bottomRight",
          });
          userStore.setAvatar(mediaUrl);
          console.log("Success!");
        })
        .catch((error) => {
          notification.error({
            message: `File upload failed.`,
            placement: "bottomRight",
          });
          console.log(error.message);
        });
      setIsUploading(false);
    } catch (err) {
      notification.error({
        message: `File upload failed.`,
        placement: "bottomRight",
      });
      setIsUploading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    userStore.fetchuserData();
  }, []);

  return (
    <div className="profil__main">
      <MenuBar />
      <div className="profil__container">
        <div
          className="profil__avatar"
          style={
            userStore.avatar && {
              backgroundImage: "url(" + userStore.avatar + ")",
            }
          }
        >
          <div className="profil__editAvatar">
            <Tooltip title="Change your avatar">
              <form
                onSubmit={changeAvatarSubmitHandler}
                style={{
                  width: "25px",
                  marginLeft: "175px",
                }}
              >
                <input
                  type="file"
                  className="avatar__inputfile"
                  name="inputfile"
                  id="file"
                  onChange={fileSelectHandler}
                />
                {isUploading ? (
                  <label htmlFor="file">
                    <Spin size="large" />
                  </label>
                ) : (
                  <label htmlFor="file">
                    <EditOutlined />
                  </label>
                )}
              </form>
            </Tooltip>
          </div>
        </div>

        <div className="profil__hello">
          Hello{userStore.name && " " + userStore.name},
        </div>
      </div>
    </div>
  );
});
