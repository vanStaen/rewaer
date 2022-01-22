import React from "react";
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

  return (
    <>
      <div className="customMenu__spacer"></div>
      <div className="customMenu__main">
        <span className="customMenu__RewaerMotto left">
          Rewaer, {t("main.motto")}
        </span>

        <div
          key="looks"
          className={`customMenu__element left ${
            userStore.menuSelected === "looks" && "selected"
          }`}
          onClick={() => {
            userStore.setMenuSelected("looks");
          }}
          style={{ float: "left" }}
        >
          <CameraOutlined style={{ marginRight: "5px" }} />
          <Link to="/looks"> {t("menu.looks")}</Link>
        </div>

        <div
          key="items"
          className={`customMenu__element left ${
            userStore.menuSelected === "items" && "selected"
          }`}
          onClick={() => {
            userStore.setMenuSelected("items");
          }}
          style={{ float: "left" }}
        >
          <SkinOutlined style={{ marginRight: "5px" }} />
          <Link to="/items"> {t("menu.items")}</Link>
        </div>

        <div
          key="mail"
          className={`customMenu__elementDisabled left ${
            userStore.menuSelected === "mail" && "selected"
          }`}
          onClick={() => {
            userStore.setMenuSelected("mail");
          }}
        >
          <MailOutlined style={{ marginRight: "10px" }} />
          {/* <Link to="/mail"> {t("menu.mail")}</Link>*/}
          {t("menu.mail")}
        </div>

        <div
          key="notifications"
          className={`customMenu__elementDisabled left ${
            userStore.menuSelected === "notifications" && "selected"
          }`}
          onClick={() => {
            userStore.setMenuSelected("notifications");
          }}
        >
          <NotificationOutlined style={{ marginRight: "10px" }} />
          {/*<Link to="/notifications"> {t("menu.notification")}</Link>*/}
          {t("menu.notification")}
        </div>

        <div
          key="search"
          className={`customMenu__elementDisabled left ${
            userStore.menuSelected === "search" && "selected"
          }`}
          onClick={() => {
            userStore.setMenuSelected("search");
          }}
        >
          <SearchOutlined style={{ marginRight: "8px" }} />
          {t("menu.search")}
        </div>

        <div
          key="info"
          className={`customMenu__element left ${
            userStore.menuSelected === "info" && "selected"
          }`}
          onClick={() => {
            userStore.setMenuSelected("info");
          }}
        >
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
