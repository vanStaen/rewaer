import React from "react";
import { Divider, Switch, Radio, Tooltip } from "antd";
import { observer } from "mobx-react";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { userStore } from "../../../../stores/userStore/userStore.js";
import { updateSettings } from "../actions/updateSettings.js";
import { updateLanguage } from "../actions/updateLanguage.js";
import { updateGender } from "../actions/updateGender.js";

// TODO add tests for this component

export const DisplaySettings = observer(() => {
  const { i18n, t } = useTranslation();
  const initLanguage = i18n.language.slice(0, 2);

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

  return (
    <div className="EditSettings__subContainer">
      <Divider orientation="left" plain>
        {t("profile.displaySettings")}
      </Divider>
      <div className="EditSettings__singleSetting">
        {t("profile.genderBasedGarderobe")}
        <Radio.Group
          defaultValue={String(userStore.gender)}
          buttonStyle="solid"
          onChange={changeGenderHandler}
          className="EditSettings__radioGroup"
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
        <Radio.Group
          defaultValue={initLanguage}
          buttonStyle="solid"
          onChange={changeLanguageHandler}
          className="EditSettings__radioGroup"
        >
          <Radio.Button value="en">English</Radio.Button>
          <Radio.Button value="fr">Français</Radio.Button>
          <Radio.Button value="de">Deutsch</Radio.Button>
        </Radio.Group>
      </div>
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
    </div>
  );
});
