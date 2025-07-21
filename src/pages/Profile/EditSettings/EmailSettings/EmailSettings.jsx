import React from "react";
import { Divider, Switch } from "antd";
import { observer } from "mobx-react";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { userStore } from "../../../../stores/userStore/userStore.js";
import { updateSettings } from "../actions/updateSettings";

// TODO add tests for this component
// TODO refactor to make it more readable and maintainable

export const EmailSettings = observer(() => {
  const { t } = useTranslation();

  const changeEmailSettingsHandler = (setting, value) => {
    const tempEmailSettings = userStore.emailSettings;
    tempEmailSettings[setting] = value;
    userStore.setEmailSettings(tempEmailSettings);
    updateSettings(tempEmailSettings, userStore.profilSettings);
  };

  return (
    <div className="EditSettings__subContainer">
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
              !userStore.emailSettings.sendEmailFriendRequest,
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
              !userStore.emailSettings.sendEmailNewMessage,
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
              !userStore.emailSettings.sendEmailMarketing,
            );
          }}
          checked={userStore.emailSettings.sendEmailMarketing}
        />{" "}
        {t("profile.settingKeepMeInformedAboutRewaer")}
      </div>
    </div>
  );
});
