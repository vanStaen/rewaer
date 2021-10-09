import React from "react";
import { observer } from "mobx-react";
import { Divider, Switch } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import { MenuBar } from "../../../components/MenuBar/MenuBar";
import { userStore } from "../../../stores/userStore/userStore";
import { updateSettings } from "./updateSettings";

import "./EditSettings.css";

export const EditSettings = observer(() => {
  const changeEmailSettingsHandler = (setting, value) => {
    userStore.emailSettings[setting] = value;
    updateSettings(userStore.profilSettings, userStore.emailSettings);
  };
  const changeProfilSettingsHandler = (setting, value) => {
    userStore.profilSettings[setting] = value;
    updateSettings(userStore.profilSettings, userStore.emailSettings);
  };

  return (
    <div className="EditSettings__main">
      <MenuBar />
      <div className="EditSettings__container">
        <div className="EditSettings__title">Edit your settings on Rewær</div>
        <br />
        <Divider orientation="left" plain>
          Profil Settings
        </Divider>
        <div className="EditSettings__singleSetting">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={() => {
              changeProfilSettingsHandler(
                "showLastSeenOnline",
                !userStore.profilSettings.showLastSeenOnline
              );
            }}
            checked={userStore.profilSettings.showLastSeenOnline}
          />{" "}
          Show in my profil when I was last seen online
        </div>
        <div className="EditSettings__singleSetting">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={() => {
              changeProfilSettingsHandler(
                "hideProfilToStrangers",
                !userStore.profilSettings.hideProfilToStrangers
              );
            }}
            checked={userStore.profilSettings.hideProfilToStrangers}
          />{" "}
          Hide my account to anyone which is not my friend
        </div>
        <br />
        <Divider orientation="left" plain>
          Email Settings
        </Divider>
        <div className="EditSettings__singleSetting">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={() => {
              changeEmailSettingsHandler(
                "sendEmailFriendRequest",
                !userStore.emailSettings.sendEmailFriendRequest
              );
            }}
            checked={userStore.emailSettings.sendEmailFriendRequest}
          />{" "}
          Send me a mail when I get a friend request
        </div>
        <div className="EditSettings__singleSetting">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={() => {
              changeEmailSettingsHandler(
                "sendEmailNewMessage",
                !userStore.emailSettings.sendEmailNewMessage
              );
            }}
            checked={userStore.emailSettings.sendEmailNewMessage}
          />{" "}
          Send me a mail when I get a new message
        </div>
        <div className="EditSettings__singleSetting">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={() => {
              changeEmailSettingsHandler(
                "sendEmailMarketing",
                !userStore.emailSettings.sendEmailMarketing
              );
            }}
            checked={userStore.emailSettings.sendEmailMarketing}
          />{" "}
          Keep me informed about all changes happening with Rewær
        </div>
      </div>
    </div>
  );
});
