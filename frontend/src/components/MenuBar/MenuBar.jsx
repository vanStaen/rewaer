import React, { useState } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Menu, Avatar, Badge, Spin } from "antd";
import {
  UserOutlined,
  CameraOutlined,
  SkinOutlined,
  TeamOutlined,
  MailOutlined,
  QuestionOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { authStore } from "../../stores/authStore/authStore";
import { userStore } from "../../stores/userStore/userStore";
import "./MenuBar.css";

const { SubMenu } = Menu;

export const MenuBar = observer(() => {
  const { t } = useTranslation();
  const [menuSelected, setMenuSelected] = useState(null);

  const handleClick = (event) => {
    setMenuSelected(event.key);
  };

  return (
    <>
      <div className="menu__spacer"></div>
      <div className="menu__main">
        <span
          className="menu__RewaerMotto"
          style={{
            color: "#6C917D",
            float: "left",
            margin: "0px 20px 0px 20px",
          }}
        >
          Rewaer, {t("main.motto")}
        </span>

        <Menu
          onClick={handleClick}
          selectedKeys={[menuSelected]}
          mode="horizontal"
          style={{ margin: "5px 0 0 0" }}
        >
          <Menu.Item
            key="looks"
            icon={<CameraOutlined />}
            style={{ float: "left" }}
          >
            <Link to="/looks"> {t("menu.looks")}</Link>
          </Menu.Item>

          <Menu.Item
            key="items"
            icon={<SkinOutlined />}
            style={{ float: "left" }}
          >
            <Link to="/items"> {t("menu.items")}</Link>
          </Menu.Item>

          <Menu.Item
            key="mail"
            icon={<MailOutlined />}
            disabled
            style={{ float: "left" }}
          >
            <Link to="/mail"> {t("menu.mail")}</Link>
          </Menu.Item>

          <Menu.Item
            key="friends"
            icon={<TeamOutlined />}
            disabled
            style={{ float: "left" }}
          >
            <Link to="/friends"> {t("menu.friends")}</Link>
          </Menu.Item>

          <Menu.Item key="info" style={{ float: "left" }}>
            <Link to="/info">
              &nbsp;&nbsp;
              <QuestionOutlined />
            </Link>
          </Menu.Item>

          <SubMenu
            style={{ float: "right" }}
            key="profileSubMenu"
            icon={
              <Badge count={userStore.isLoading ? 0 : 3} offset={[0, 5]}>
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
            }
          >
            {userStore.isLoading ? (
              <Menu.Item key="spinner" disabled>
                <Spin
                  style={{ width: "100%", padding: "10px" }}
                  size="medium"
                />
              </Menu.Item>
            ) : (
              <>
                <Menu.Item key="profile" icon={<UserOutlined />}>
                  <Link to="/profile">{t("menu.profile")}</Link>
                </Menu.Item>
                <Menu.Item key="settings" icon={<SettingOutlined />}>
                  <Link to="/editsettings/">{t("menu.editSetting")}</Link>
                </Menu.Item>

                <div className="menu__customDivider"></div>
                <Menu.Item
                  key="notification1"
                  icon={<SkinOutlined />}
                  className="menu__notification"
                >
                  <span className="menu__notificationUser">blablabla</span>{" "}
                  added a new item
                </Menu.Item>
                <Menu.Item
                  key="notification2"
                  icon={<CameraOutlined />}
                  className="menu__notification"
                >
                  <span className="menu__notificationUser">dude123</span>{" "}
                  commented your look
                </Menu.Item>
                <Menu.Item
                  key="notification3"
                  icon={<MailOutlined />}
                  className="menu__notification"
                >
                  <span className="menu__notificationUser">baby__girl</span>{" "}
                  sent you a message
                </Menu.Item>

                <div className="menu__customDivider"></div>
                <Menu.Item
                  key="logout"
                  icon={<LogoutOutlined />}
                  onClick={authStore.logout}
                >
                  {t("menu.logout")}
                </Menu.Item>
              </>
            )}
          </SubMenu>
        </Menu>
      </div>
    </>
  );
});
