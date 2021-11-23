import React from "react";
import { observer } from "mobx-react";
import { Divider, Switch, Radio } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { MenuBar } from "../../../components/MenuBar/MenuBar";
import { userStore } from "../../../stores/userStore/userStore";
import { updateSettings } from "./updateSettings";
import { updateLanguage } from "./updateLanguage";

import "./EditSettings.css";

export const EditSettings = observer(() => {
  const { i18n } = useTranslation();
  const initLanguage = i18n.language.slice(0, 2);

  const changeEmailSettingsHandler = (setting, value) => {
    const tempEmailSettings = userStore.emailSettings;
    tempEmailSettings[setting] = value;
    userStore.setEmailSettings(tempEmailSettings);
    updateSettings(tempEmailSettings, userStore.profilSettings);
  };
  const changeProfilSettingsHandler = (setting, value) => {
    const tempProfilSettings = userStore.profilSettings;
    tempProfilSettings[setting] = value;
    userStore.setProfilSettings(tempProfilSettings);
    updateSettings(userStore.emailSettings, tempProfilSettings);
  };

  const onLanguageChangeHandler = (event) => {
    const value = event.target.value;
    if (value === "en") {
      i18n.changeLanguage("en-US");
    } else if (value === "fr") {
      i18n.changeLanguage("fr-FR");
    } else if (value === "de") {
      i18n.changeLanguage("de-DE");
    }
    updateLanguage(value);
  };

  return (
    <div className="EditSettings__main">
      <MenuBar />
      <div className="EditSettings__container">
        <div className="EditSettings__title">Edit your settings on Rewaer</div>
        <br />
        <Divider orientation="left" plain>
          Display Settings
        </Divider>
        <Radio.Group
          defaultValue={initLanguage}
          buttonStyle="solid"
          onChange={onLanguageChangeHandler}
        >
          <Radio.Button value="en">English</Radio.Button>
          <Radio.Button value="fr">Français</Radio.Button>
          <Radio.Button value="de">Deutsch</Radio.Button>
        </Radio.Group>
        <br />
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
          Keep me informed about all changes happening with Rewaer
        </div>
      </div>
    </div>
  );
});
