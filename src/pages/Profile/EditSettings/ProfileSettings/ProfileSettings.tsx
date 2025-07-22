import React from "react";
import { Divider, Switch } from "antd";
import { observer } from "mobx-react";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { userStore } from "../../../../stores/userStore/userStore.js";
import { updateSettings } from "../actions/updateSettings.js";

type ProfilSettingKey =
  | "showLastSeenOnline"
  | "hideProfilToStrangers"
  | "hideLooksToStrangers"
  | "hideItemsToStrangers"
  | "displayArchived"
  | "displayPrivate"
  | "showLastName";

export const ProfileSettings: React.FC = observer(() => {
  const { t } = useTranslation();

  const changeProfilSettingsHandler = (setting: ProfilSettingKey, value: boolean): void => {
    const tempProfilSettings = { ...userStore.profilSettings };
    tempProfilSettings[setting] = value;
    userStore.setProfilSettings(tempProfilSettings);
    updateSettings(userStore.emailSettings, tempProfilSettings);
  };

  return (
    <div className="EditSettings__subContainer">
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
              !userStore.profilSettings.showLastSeenOnline,
            );
          }}
          checked={userStore.profilSettings.showLastSeenOnline}
        />{" "}
        {t("profile.settingShowLastOnline")}
      </div>
      <div className="EditSettings__Spacer" />
      <div className="EditSettings__singleSetting">
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          onChange={() => {
            changeProfilSettingsHandler(
              "hideProfilToStrangers",
              !userStore.profilSettings.hideProfilToStrangers,
            );
          }}
          checked={userStore.profilSettings.hideProfilToStrangers}
        />{" "}
        {t("profile.settingHideAccount")}
      </div>
      <div className="EditSettings__Spacer" />
      <div className="EditSettings__singleSetting">
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          onChange={() => {
            changeProfilSettingsHandler(
              "hideLooksToStrangers",
              !userStore.profilSettings.hideLooksToStrangers,
            );
          }}
          checked={userStore.profilSettings.hideLooksToStrangers}
        />{" "}
        {t("profile.hideLooksToStrangers")}
      </div>
      <div className="EditSettings__Spacer" />
      <div className="EditSettings__singleSetting">
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          onChange={() => {
            changeProfilSettingsHandler(
              "hideItemsToStrangers",
              !userStore.profilSettings.hideItemsToStrangers,
            );
          }}
          checked={userStore.profilSettings.hideItemsToStrangers}
        />{" "}
        {t("profile.hideItemsToStrangers")}
      </div>
      <div className="EditSettings__Spacer" />
      <div className="EditSettings__singleSetting">
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          onChange={() => {
            changeProfilSettingsHandler(
              "showLastName",
              !userStore.profilSettings.showLastName,
            );
          }}
          checked={userStore.profilSettings.showLastName}
        />{" "}
        {t("profile.settingShowLastName")}
      </div>
    </div>
  );
});