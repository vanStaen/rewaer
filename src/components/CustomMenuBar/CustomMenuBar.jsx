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
import { profileStore } from "../../stores/profileStore/profileStore";
import { AddToHomeScreen } from "../AddToHomeScreen/AddToHomeScreen";

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
            <CameraOutlined />
            <span className="customMenu__elementName">{t("menu.looks")}</span>
          </div>
        </Link>

        <Link to="/items">
          <div
            key="items"
            className={`left 
            ${userStore.menuSelected === "items" && "selected"}
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
            <SkinOutlined />
            <span className="customMenu__elementName">{t("menu.items")}</span>
          </div>
        </Link>

        <div
          key="mail"
          className={`customMenu__elementDisabled left ${
            userStore.menuSelected === "mail" && "selected"
          }`}
          onClick={() => {
            //userStore.setMenuSelected("mail");
          }}
        >
          <MailOutlined />
          <span className="customMenu__elementName">{t("menu.mail")}</span>
        </div>

        <div
          key="notifications"
          className={`notifications customMenu__elementDisabled left ${
            userStore.menuSelected === "notifications" && "selected"
          }`}
          onClick={() => {
            //userStore.setMenuSelected("notifications");
          }}
        >
          <NotificationOutlined />
          <span className="customMenu__elementName">
            {t("menu.notifications")}
          </span>
        </div>

        <div
          key="search"
          className={`customMenu__elementDisabled left ${
            userStore.menuSelected === "search" && "selected"
          }`}
          onClick={() => {
            //userStore.setMenuSelected("search");
          }}
        >
          <SearchOutlined />
          <span className="customMenu__elementName">{t("menu.search")}</span>
        </div>

        <Link to="/info">
          <div
            key="info"
            className={`info customMenu__element left ${
              userStore.menuSelected === "info" && "selected"
            }`}
            onClick={() => {
              userStore.setMenuSelected("info");
            }}
          >
            <QuestionOutlined />
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
                      profileStore.fetchProfileData(userStore.userName);
                    }}
                    className="customSubMenu__element"
                  >
                    <UserOutlined style={{ marginRight: "10px" }} />
                    {t("menu.profile")}
                  </div>
                </Link>
                <Link to="/editsettings/">
                  <div key="settings" className="customSubMenu__element">
                    <SettingOutlined style={{ marginRight: "10px" }} />
                    {t("menu.editSetting")}
                  </div>
                </Link>
                <div className="customMenu__customDivider"></div>

                <div key="logout" onClick={authStore.logout}>
                  <AddToHomeScreen />
                </div>

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
