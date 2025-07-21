import React from "react";
import { Divider } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { UserNameUpdate } from "./UserNameUpdate/UserNameUpdate.jsx";
import { resetPasswordLink } from "../actions/resetPasswordLink.js";
import "../EditSettings.less";

export const UserSettings = observer(() => {
  const { t } = useTranslation();

  return (
    <div className="EditSettings__subContainer">
      <Divider orientation="left" plain>
        {t("profile.accountSettings")}
      </Divider>
      <div className="EditSettings__singleSetting">
        {t("profile.triggerPasswordReset")}{" "}
        <span onClick={resetPasswordLink} className="EditSettings__link">
          {t("main.clickHere")}
        </span>
      </div>
      <UserNameUpdate />
    </div>
  );
});
