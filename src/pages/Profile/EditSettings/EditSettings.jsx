import React from "react";
import { observer } from "mobx-react";
import { Divider, Switch, Radio, Tooltip, notification } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { postSendRecoverLink } from "../../../components/PasswordRecover/postSendRecoverLink";
import { userStore } from "../../../stores/userStore/userStore";
import { updateSettings } from "./updateSettings";
import { updateLanguage } from "./updateLanguage";
import { updateGender } from "./updateGender";
import { UserNameUpdate } from "./UserNameUpdate/UserNameUpdate";
import { DeleteAccountButton } from "./DeleteAccountButton/DeleteAccountButton";

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
      <div className="EditSettings__container">
        <div className="EditSettings__centerDiv">
          <div className="EditSettings__title">
            {t("profile.editYourSetting")}
          </div>
        </div>
        <div className="EditSettings__Spacer" />
        <Divider orientation="left" plain>
          {t("profile.accountSettings")}
        </Divider>
        <div className="EditSettings__singleSetting">
          {t("profile.triggerPasswordReset")}{" "}
          <span onClick={resetPasswordLink} className="EditSettings__link">
            {t("main.clickHere")}
          </span>
        </div>
        <div className="EditSettings__Spacer" />
        <UserNameUpdate />
        <div className="EditSettings__SpacerBeforeDivider" />
        <Divider orientation="left" plain>
          {t("profile.displaySettings")}
        </Divider>
        <div className="EditSettings__singleSetting">
          {t("profile.genderBasedGarderobe")}
          &nbsp;&nbsp;&nbsp;
          <div className="EditSettings__centerDiv">
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
        </div>
        <div className="EditSettings__Spacer" />
        <div className="EditSettings__singleSetting">
          {t("profile.displayLanguage")}
          &nbsp;&nbsp;&nbsp;
          <div className="EditSettings__centerDiv">
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
        </div>
        <div className="EditSettings__Spacer" />
        <div className="EditSettings__singleSetting">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={() => {
              changeProfilSettingsHandler(
                "displayArchived",
                !userStore.profilSettings.displayArchived,
              );
            }}
            checked={userStore.profilSettings.displayArchived}
          />{" "}
          {t("profile.settingShowArchived")}
        </div>
        <div className="EditSettings__Spacer" />
        <div className="EditSettings__singleSetting">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={() => {
              changeProfilSettingsHandler(
                "displayPrivate",
                !userStore.profilSettings.displayPrivate,
              );
            }}
            checked={userStore.profilSettings.displayPrivate}
          />{" "}
          {t("profile.settingDisplayPrivate")}
        </div>
        <div className="EditSettings__SpacerBeforeDivider" />
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
        <div className="EditSettings__SpacerBeforeDivider" />
        <Divider orientation="left" plain>
          {t("profile.emailSettings")}
        </Divider>
        <div className="EditSettings__singleSetting">
          <div className="EditSettings__Spacer" />
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
        <div className="EditSettings__Spacer" />
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
        <div className="EditSettings__Spacer" />
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
        <div className="EditSettings__SpacerBeforeDivider" />
        <Divider orientation="left" plain>
          {t("profile.dangerZone")}
        </Divider>
        <div className="EditSettings__centerDiv">
          <DeleteAccountButton />
        </div>
        <div className="EditSettings__SpacerBeforeDivider" />
      </div>
    </div>
  );
});
