import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react";
import { Menu, Avatar, Badge } from "antd";
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
  const [menuSelected, setMenuSelected] = useState(null);

  const handleClick = (event) => {
    setMenuSelected(event.key);
  };

  return (
    <div className="menu__main">
      <Menu
        onClick={handleClick}
        selectedKeys={[menuSelected]}
        mode="horizontal"
        style={{ margin: "5px 0px" }}
      >
        <span
          className="menu__RewaerMotto"
          style={{
            color: "#6C917D",
            float: "left",
            margin: "0px 20px 0px 20px",
          }}
        >
          Rewaer, the green Fashion App
        </span>

        <SubMenu
          style={{ float: "right" }}
          key="profil"
          icon={
            <NavLink to="/profile">
              <Badge count={1} offset={[0, 5]}>
                <Avatar
                  src={userStore.avatar && userStore.avatar}
                  icon={
                    !userStore.avatar && (
                      <UserOutlined style={{ fontSize: "24px" }} />
                    )
                  }
                  size="large"
                />
              </Badge>
            </NavLink>
          }
        >
          <Menu.Item key="Settings" icon={<SettingOutlined />}>
            <NavLink to="/edit_settings/">Edit Settings</NavLink>
          </Menu.Item>
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={authStore.logout}
          >
            Logout
          </Menu.Item>
        </SubMenu>

        <Menu.Item
          key="looks"
          icon={<CameraOutlined />}
          style={{ float: "left" }}
        >
          <NavLink to="/looks"> Looks</NavLink>
        </Menu.Item>

        <Menu.Item
          key="items"
          icon={<SkinOutlined />}
          style={{ float: "left" }}
        >
          <NavLink to="/items"> Items</NavLink>
        </Menu.Item>
        <Menu.Item
          key="mail"
          icon={<MailOutlined />}
          disabled
          style={{ float: "left" }}
        >
          <NavLink to="/mail"> Mail</NavLink>
        </Menu.Item>
        <Menu.Item
          key="friends"
          icon={<TeamOutlined />}
          disabled
          style={{ float: "left" }}
        >
          <NavLink to="/friends"> Friends</NavLink>
        </Menu.Item>
        <Menu.Item key="info" style={{ float: "left" }}>
          <NavLink to="/info">
            &nbsp;&nbsp;
            <QuestionOutlined />
          </NavLink>
        </Menu.Item>
      </Menu>
    </div>
  );
});
