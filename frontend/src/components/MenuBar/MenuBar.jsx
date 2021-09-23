import React, { useState, Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Avatar, Badge } from "antd";
import {
  UserOutlined,
  CameraOutlined,
  SkinOutlined,
  TeamOutlined,
  MailOutlined,
  QuestionOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import "./MenuBar.css";

export const MenuBar = () => {
  const [menuSelected, setMenuSelected] = useState(null);

  const handleClick = (event) => {
    setMenuSelected(event.key);
  };

  return (
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
        Rewær, the green Fashion App
      </span>

      <Menu.Item key="profil" style={{ float: "right" }}>
        <NavLink to="/profile">
          <Badge count={5} offset={[0, 5]}>
            <Avatar
              src={"https://avatars0.githubusercontent.com/u/12551446"}
              size="large"
            />
          </Badge>
        </NavLink>
      </Menu.Item>

      <Menu.Item
        key="looks"
        icon={<CameraOutlined />}
        style={{ float: "left" }}
      >
        <NavLink to="/looks"> Looks</NavLink>
      </Menu.Item>

      <Menu.Item key="items" icon={<SkinOutlined />} style={{ float: "left" }}>
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
  );
};
