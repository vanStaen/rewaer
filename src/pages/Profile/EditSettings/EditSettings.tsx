import React, { useEffect, useState } from "react";
import { Spin, Segmented } from "antd";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  UserOutlined,
  SettingOutlined,
  MailOutlined,
  WarningOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";

import { UserSettings } from "./UserSettings/UserSettings";
import { DisplaySettings } from "./DisplaySettings/DisplaySettings";
import { EmailSettings } from "./EmailSettings/EmailSettings";
import { ProfileSettings } from "./ProfileSettings/ProfileSettings";
import { DangerZone } from "./DangerZone/DangerZone";

import { isMobileCheck } from "../../../helpers/dev/checkMobileTablet.js";
import { authStore } from "../../../stores/authStore/authStore.js";
import { userStore } from "../../../stores/userStore/userStore.js";

import "./EditSettings.less";

interface SettingsOption {
  value: number;
  label: string | false;
  icon: React.ReactNode;
}

export const EditSettings: React.FC = observer(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [pageSelected, setPageSelected] = useState<number>(1);

  const isMobile = isMobileCheck();

  useEffect(() => {
    if (authStore.hasAccess === false) {
      navigate("/");
    }
  }, [authStore.hasAccess, navigate]);

  const settingsOption: SettingsOption[] = [
    {
      value: 1,
      label: !isMobile && t("profile.accountSettings"),
      icon: <UserOutlined />,
    },
    {
      value: 2,
      label: !isMobile && t("profile.displaySettings"),
      icon: <FundProjectionScreenOutlined />,
    },
    {
      value: 3,
      label: !isMobile && t("profile.profileSettings"),
      icon: <SettingOutlined />,
    },
    {
      value: 4,
      label: !isMobile && t("profile.emailSettings"),
      icon: <MailOutlined />,
    },
    {
      value: 5,
      label: !isMobile && t("profile.dangerZone"),
      icon: <WarningOutlined />,
    },
  ];

  const segmentedChangeHandler = (value: string | number): void => {
    setPageSelected(value as number);
  };

  const renderSwitch = (settingPage: number): React.ReactNode => {
    switch (settingPage) {
      case 1:
        return <UserSettings />;
      case 2:
        return <DisplaySettings />;
      case 3:
        return <ProfileSettings />;
      case 4:
        return <EmailSettings />;
      case 5:
        return <DangerZone />;
      default:
        return "Error";
    }
  };

  return (
    <div className="EditSettings__main">
      {userStore.isLoading ? (
        <div className="spinner">
          <Spin size="large" />
        </div>
      ) : (
        <div className="EditSettings__container">
          <div className="EditSettings__centerDiv">
            <div className="EditSettings__title">
              {t("profile.editYourSetting")}
            </div>
            <Segmented
              size={isMobile ? "large" : "middle"}
              onChange={segmentedChangeHandler}
              options={settingsOption}
            />
          </div>
          {renderSwitch(pageSelected)}
        </div>
      )}
    </div>
  );
});