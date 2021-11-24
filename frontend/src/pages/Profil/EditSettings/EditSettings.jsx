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
  const { i18n, t } = useTranslation();
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
        <div className="EditSettings__title">
          {t("profile.editYourSetting")}
        </div>
        <br />
        <Divider orientation="left" plain>
          {t("profile.displaySettings")}
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
          {t("profile.profileSettings")}
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
          {t("profile.settingShowLastOnline")}
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
          {t("profile.settingHideAccount")}
        </div>
        <br />
        <Divider orientation="left" plain>
          {t("profile.emailSettings")}
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
          {t("profile.settingSendEmailOnFriendRequest")}
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
          {t("profile.settingSendEmailWhenNewMessage")}
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
          {t("profile.settingKeepMeInformedAboutRewaer")}
        </div>
      </div>
    </div>
  );
});
