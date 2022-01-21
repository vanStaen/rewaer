import React, { useState } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Avatar, Badge, Spin } from "antd";
import {
  UserOutlined,
  CameraOutlined,
  SkinOutlined,
  NotificationOutlined,
  MailOutlined,
  QuestionOutlined,
  LogoutOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { authStore } from "../../stores/authStore/authStore";
import { userStore } from "../../stores/userStore/userStore";

import "./CustomMenuBar.css";

export const CustomMenuBar = observer(() => {
  const { t } = useTranslation();
  const [menuSelected, setMenuSelected] = useState(null);

  const handleClick = (event) => {
    setMenuSelected(event.key);
  };

  return (
    <>
      <div className="customMenu__main">
        <span className="customMenu__RewaerMotto customMenu__element left">
          Rewaer, {t("main.motto")}
        </span>

        <div
          key="looks"
          className="customMenu__element left"
          icon={<CameraOutlined />}
          style={{ float: "left" }}
        >
          <Link to="/looks"> {t("menu.looks")}</Link>
        </div>

        <div
          key="items"
          className="customMenu__element left"
          icon={<SkinOutlined />}
          style={{ float: "left" }}
        >
          <Link to="/items"> {t("menu.items")}</Link>
        </div>

        <div
          key="mail"
          className="customMenu__element left"
          icon={<MailOutlined />}
          disabled
        >
          <Link to="/mail"> {t("menu.mail")}</Link>
        </div>

        <div
          key="notifications"
          className="customMenu__element left"
          icon={<NotificationOutlined />}
          disabled
        >
          <Link to="/friends"> {t("menu.notification")}</Link>
        </div>

        <div
          key="search"
          className="customMenu__element left"
          icon={<SearchOutlined />}
          disabled
        >
          {t("menu.search")}
        </div>

        <div key="info" className="customMenu__element left">
          <Link to="/info">
            &nbsp;&nbsp;
            <QuestionOutlined />
            &nbsp;&nbsp;
          </Link>
        </div>

        {/* 
          <div style={{ float: "right" }} key="profileSubMenu">
            <Badge count={userStore.isLoading ? 0 : 4} offset={[0, 5]}>
              <Avatar
                src={userStore.avatar && userStore.avatar}
                icon={
                  userStore.isLoading ? (
                    <Spin size="small" />
                  ) : (
                    !userStore.avatar && (
                      <UserOutlined style={{ fontSize: "22px" }} />
                    )
                  )
                }
                style={userStore.isLoading && { backgroundColor: "#FFF" }}
                size={36}
              />
            </Badge>
            {userStore.isLoading ? (
              <div key="spinner" disabled>
                <Spin
                  style={{ width: "100%", padding: "10px" }}
                  size="medium"
                />
              </div>
            ) : (
              <>
                <div key="profile" icon={<UserOutlined />}>
                  <Link to="/profile">{t("menu.profile")}</Link>
                </div>
                <div key="settings" icon={<SettingOutlined />}>
                  <Link to="/editsettings/">{t("menu.editSetting")}</Link>
                </div>

                <div className="menu__customDivider"></div>
                <div
                  key="logout"
                  icon={<LogoutOutlined />}
                  onClick={authStore.logout}
                >
                  {t("menu.logout")}
                </div>
              </>
            )}
            </div>*/}
      </div>
    </>
  );
});
