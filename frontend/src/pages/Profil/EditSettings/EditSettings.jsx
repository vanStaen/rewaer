import React from "react";
import { observer } from "mobx-react";
import { Divider, Switch, Radio, Tooltip, notification, Button } from "antd";
import {
  CloseOutlined,
  CheckOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { MenuBar } from "../../../components/MenuBar/MenuBar";
import { postSendRecoverLink } from "../../../components/PasswordRecover/postSendRecoverLink";
import { userStore } from "../../../stores/userStore/userStore";
import { authStore } from "../../../stores/authStore/authStore.js";
import { updateSettings } from "./updateSettings";
import { updateLanguage } from "./updateLanguage";
import { updateGender } from "./updateGender";
import { archiveAccount } from "./archiveAccount";

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

  const changeLanguageHandler = (event) => {
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

  const changeGenderHandler = (event) => {
    const value = parseInt(event.target.value);
    userStore.setGender(value);
    updateGender(value);
  };

  const deleteAccountHandler = (event) => {
    archiveAccount(true);
    notification.error({
      message: (
        <>
          <b>Your account is now archived. </b>Login to reactivate it. If not,
          it will be automatically deleted <b>in 30 days</b> from now.
        </>
      ),
      placement: "bottomRight",
    });
    authStore.logout();
  };

  const resetPasswordLink = async () => {
    try {
      await postSendRecoverLink(userStore.email);
      notification.success({
        message: t("login.recoverEmailSent"),
        placement: "bottomRight",
      });
    } catch (error) {
      notification.warn({
        message: error.message,
        placement: "bottomRight",
      });
    }
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
          {t("profile.accountSettings")}
        </Divider>
        <div className="EditSettings__singleSetting">
          {t("profile.triggerPasswordReset")}{" "}
          <span onClick={resetPasswordLink} className="EditSettings__link">
            {t("main.clickHere")}
          </span>
        </div>
        <br />
        <Divider orientation="left" plain>
          {t("profile.displaySettings")}
        </Divider>
        <div className="EditSettings__singleSetting">
          {t("profile.genderBasedGarderobe")}
          &nbsp;&nbsp;&nbsp;
          <Radio.Group
            defaultValue={String(userStore.gender)}
            buttonStyle="solid"
            onChange={changeGenderHandler}
          >
            <Radio.Button value="1">{t("profile.male")}</Radio.Button>
            <Radio.Button value="2">{t("profile.female")}</Radio.Button>
            <Tooltip placement="top" title={t("profile.tooltipNB")}>
              <Radio.Button value="3">{t("profile.nonbinary")}</Radio.Button>
            </Tooltip>
          </Radio.Group>
        </div>
        <div className="EditSettings__singleSetting">
          {t("profile.displayLanguage")}
          &nbsp;&nbsp;&nbsp;
          <Radio.Group
            defaultValue={initLanguage}
            buttonStyle="solid"
            onChange={changeLanguageHandler}
          >
            <Radio.Button value="en">English</Radio.Button>
            <Radio.Button value="fr">Français</Radio.Button>
            <Radio.Button value="de">Deutsch</Radio.Button>
          </Radio.Group>
        </div>
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
        <br />
        <Divider orientation="left" plain>
          {t("profile.dangerZone")}
        </Divider>
        <div className="EditSettings__singleSetting">
          <Button
            block
            icon={<DeleteOutlined />}
            onClick={deleteAccountHandler}
            type="primary"
            danger
          >
            Delete account
          </Button>
        </div>
      </div>
    </div>
  );
});
