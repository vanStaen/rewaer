import React, { useEffect, useState } from "react";
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

import { authStore } from "../../stores/authStore/authStore.js";
import { userStore } from "../../stores/userStore/userStore.js";
import { pageStore } from "../../stores/pageStore/pageStore";
import { profileStore } from "../../stores/profileStore/profileStore";
import { AddToHomeScreen } from "../AddToHomeScreen/AddToHomeScreen";
import { getPictureUrl } from "../../helpers/picture/getPictureUrl";

import "./MenuBar.less";

export const MenuBar = observer((props) => {
  const { t } = useTranslation();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarLoading, setAvatarLoading] = useState(true);
  const bucket = "users";

  const getAvatarUrl = async (path) => {
    try {
      setAvatarUrl(null);
      if (path) {
        const url = await getPictureUrl(path, bucket);
        const isloaded = new Promise((resolve, reject) => {
          const loadImg = new Image();
          loadImg.src = url;
          loadImg.onload = () => resolve(url);
          loadImg.onerror = (err) => reject(err);
        });
        await isloaded;
        setAvatarUrl(url);
      }
    } catch (e) {
      console.error(e);
    }
    setAvatarLoading(false);
  };

  useEffect(() => {
    getAvatarUrl(userStore.avatar);
  }, [userStore.avatar]);

  const handlerShowSubMenu = () => {
    document.getElementById("subMenu").style.display = "block";
    document.getElementById("subMenuBackGround").style.display = "block";
  };

  const handlerHideSubMenu = () => {
    document.getElementById("subMenu").style.display = "none";
    document.getElementById("subMenuBackGround").style.display = "none";
  };

  return (
    <>
      <div
        className="menu__background"
        onClick={handlerHideSubMenu}
        id="subMenuBackGround"
      ></div>
      <div className="menu__spacer"></div>
      <div className="menu__main">
        <span className="menu__RewaerMotto left">Rewaer</span>

        <Link to="/looks">
          <div
            key="looks"
            className={`left 
            ${pageStore.menuSelected === "looks" && "selected"}
            ${props.visitor ? "menu__elementDisabled" : "menu__element"}`}
            onClick={() => pageStore.setMenuSelected("looks")}
            style={{ float: "left" }}
          >
            <CameraOutlined />
            <span className="menu__elementName">{t("menu.looks")}</span>
          </div>
        </Link>

        <Link to="/items">
          <div
            key="items"
            className={`left 
            ${pageStore.menuSelected === "items" && "selected"}
            ${props.visitor ? "menu__elementDisabled" : "menu__element"}`}
            onClick={() => pageStore.setMenuSelected("items")}
            style={{ float: "left" }}
          >
            <SkinOutlined />
            <span className="menu__elementName">{t("menu.items")}</span>
          </div>
        </Link>

        <Link to="/notifications">
          <div
            key="notifications"
            className={`notifications menu__element left ${
              pageStore.menuSelected === "notifications" && "selected"
            }`}
            onClick={() => {
              pageStore.setMenuSelected("notifications");
              pageStore.fetchNotifications();
            }}
          >
            <NotificationOutlined />
            <Badge
              dot
              count={pageStore.unseenNotificationsCount}
              offset={[5, 0]}
            >
              <span className="menu__elementNameWithBadge">
                {t("menu.notifications")}
              </span>
            </Badge>
          </div>
        </Link>

        <Link to="/search">
          <div
            key="search"
            className={`menu__element left ${
              pageStore.menuSelected === "search" && "selected"
            }`}
            onClick={() => {
              pageStore.setMenuSelected("search");
            }}
          >
            <SearchOutlined />
            <span className="menu__elementName">{t("menu.search")}</span>
          </div>
        </Link>

        <div
          key="mail"
          className={`menu__elementDisabled left ${
            pageStore.menuSelected === "mail" && "selected"
          }`}
          onClick={() => {
            // pageStore.setMenuSelected("mail");
          }}
        >
          <MailOutlined />
          <span className="menu__elementName">{t("menu.mail")}</span>
        </div>

        <Link to="/info">
          <div
            key="info"
            className={`info menu__element left ${
              pageStore.menuSelected === "info" && "selected"
            }`}
            onClick={() => {
              pageStore.setMenuSelected("info");
            }}
          >
            <QuestionOutlined />
          </div>
        </Link>

        <div
          key="profile"
          className={`menu__element right ${
            pageStore.menuSelected === "profile" && "selected"
          }`}
          onMouseEnter={handlerShowSubMenu}
          onMouseLeave={handlerHideSubMenu}
        >
          <Avatar
            src={userStore.avatar && avatarUrl}
            icon={
              userStore.isLoading || avatarLoading ? (
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
          <div className="customSubMenu__container" id="subMenu">
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
                      pageStore.setMenuSelected("profile");
                      profileStore.fetchProfileData(userStore.userName);
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
                    className="customSubMenu__element"
                    onClick={() => pageStore.setMenuSelected("settings")}
                  >
                    <SettingOutlined style={{ marginRight: "10px" }} />
                    {t("menu.editSetting")}
                  </div>
                </Link>
                <div className="menu__customDivider"></div>

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
