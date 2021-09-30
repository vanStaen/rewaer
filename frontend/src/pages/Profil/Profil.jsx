import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Tooltip } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";

import { MenuBar } from "../../components/MenuBar/MenuBar";
import { userStore } from "../../stores/userStore/userStore";

import "./Profil.css";

export const Profil = observer(() => {
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
              <EditOutlined />
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
