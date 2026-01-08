import React from "react";
import { Divider } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { UserNameUpdate } from "./UserNameUpdate/UserNameUpdate";
import { resetPasswordLink } from "../actions/resetPasswordLink";

import "../EditSettings.less";

export const UserSettings: React.FC = observer(() => {
  const { t } = useTranslation();

  const handleResetPasswordClick = (): void => {
    resetPasswordLink().catch((error) => {
      console.error("Failed to send password reset link:", error);
    });
  };

  return (
    <div className="EditSettings__subContainer">
      <Divider orientation="left" plain>
        {t("profile.accountSettings")}
      </Divider>
      <div className="EditSettings__singleSetting">
        {t("profile.triggerPasswordReset")}{" "}
        <span onClick={handleResetPasswordClick} className="EditSettings__link">
          {t("main.clickHere")}
        </span>
      </div>
      <UserNameUpdate />
    </div>
  );
});
