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

export const CustomMenuBar = observer((props) => {
  const { t } = useTranslation();

  const handlerShowSubMenu = () => {
    document.getElementById("profile").style.display = "block";
  };

  const handlerHideSubMenu = () => {
    document.getElementById("profile").style.display = "none";
  };

  return (
    <>
      <div className="customMenu__spacer"></div>
      <div className="customMenu__main">
        <span className="customMenu__RewaerMotto left">
          Rewaer, {t("main.motto")}
        </span>

        <Link to="/looks">
          <div
            key="looks"
            className={`left 
            ${userStore.menuSelected === "looks" && "selected"}
            ${
              props.visitor
                ? "customMenu__elementDisabled"
                : "customMenu__element"
            }`}
            onClick={() => {
              !props.visitor && userStore.setMenuSelected("looks");
            }}
            style={{ float: "left" }}
          >
            <CameraOutlined style={{ marginRight: "10px" }} />
            {t("menu.looks")}
          </div>
        </Link>

        <Link to="/items">
          <div
            key="items"
            className={`left 
            ${userStore.menuSelected === "looks" && "selected"}
            ${
              props.visitor
                ? "customMenu__elementDisabled"
                : "customMenu__element"
            }`}
            onClick={() => {
              !props.visitor && userStore.setMenuSelected("items");
            }}
            style={{ float: "left" }}
          >
            <SkinOutlined style={{ marginRight: "10px" }} />
            {t("menu.items")}
          </div>
        </Link>

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
          <SearchOutlined style={{ marginRight: "10px" }} />
          {t("menu.search")}
        </div>

        <Link to="/info">
          <div
            key="info"
            className={`customMenu__element left ${
              userStore.menuSelected === "info" && "selected"
            }`}
            onClick={() => {
              userStore.setMenuSelected("info");
            }}
          >
            &nbsp;&nbsp;
            <QuestionOutlined />
            &nbsp;&nbsp;
          </div>
        </Link>

        <div
          key="profile"
          className={`customMenu__element right ${
            userStore.menuSelected === "profile" && "selected"
          }`}
          onMouseEnter={handlerShowSubMenu}
          onMouseLeave={handlerHideSubMenu}
        >
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
          <div className="customSubMenu__container" id="profile">
            {userStore.isLoading ? (
              <div key="spinner" disabled>
                <Spin
                  style={{ width: "100%", padding: "10px" }}
                  size="medium"
                />
              </div>
            ) : (
              <>
                <Link to="/profile">
                  <div
                    key="profile"
                    onClick={() => {
                      userStore.setMenuSelected("profile");
                    }}
                    className="customSubMenu__element"
                  >
                    <UserOutlined style={{ marginRight: "10px" }} />
                    {t("menu.profile")}
                  </div>
                </Link>
                <Link to="/editsettings/">
                  <div
                    key="settings"
                    onClick={() => {
                      userStore.setMenuSelected("profile");
                    }}
                    className="customSubMenu__element"
                  >
                    <SettingOutlined style={{ marginRight: "10px" }} />
                    {t("menu.editSetting")}
                  </div>
                </Link>

                <div className="customMenu__customDivider"></div>

                <Link to="/">
                  <div
                    key="logout"
                    className="customSubMenu__element"
                    onClick={authStore.logout}
                  >
                    <LogoutOutlined style={{ marginRight: "10px" }} />
                    {t("menu.logout")}
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
});
