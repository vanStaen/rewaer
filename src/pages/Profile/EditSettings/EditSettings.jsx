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
} from "@ant-design/icons";

import { userStore } from "../../../stores/userStore/userStore.js";
import { UserSettings } from "./UserSettings/UserSettings.jsx";
import { DisplaySettings } from "./DisplaySettings/DisplaySettings.jsx";
import { EmailSettings } from "./EmailSettings/EmailSettings.jsx";
import { ProfileSettings } from "./ProfileSettings/ProfileSettings.jsx";
import { DangerZone } from "./DangerZone/DangerZone.jsx";
import { isMobileCheck } from "../../../helpers/dev/checkMobileTablet.js";
import { authStore } from "../../../stores/authStore/authStore.js";

import "./EditSettings.less";

// TODO add tests for this component

export const EditSettings = observer(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [pageSelected, setPageSelected] = useState(1);

  const isMobile = isMobileCheck();

  useEffect(() => {
    if (authStore.hasAccess === false) {
      navigate("/");
    }
  }, [authStore.hasAccess]);

  const settingsOption = [
    {
      value: 1,
      label: !isMobile && t("profile.accountSettings"),
      icon: <UserOutlined />,
    },
    {
      value: 2,
      label: !isMobile && t("profile.displaySettings"),
      icon: <SettingOutlined />,
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

  const segmentedChangeHandler = (e) => {
    setPageSelected(e);
  };

  const renderSwitch = (settingPage) => {
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
              size={isMobile && "large"}
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
