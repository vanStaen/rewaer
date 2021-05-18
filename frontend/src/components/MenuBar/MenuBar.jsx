import React, { Component } from "react";
import { authStore } from '../../stores/authStore';
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

const { SubMenu } = Menu;

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuSelected: null,
    };
  }

  handleClick = (event) => {
    this.setState({ menuSelected: event.key });
  };

  render() {

    const { menuSelected } = this.state;

    return (
      <Menu
        onClick={this.handleClick}
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
        {authStore.refreshToken ? (
          <SubMenu
            key="profile"
            title={
              <NavLink to="/profile">
                <Badge count={5} offset={[0, 5]}>
                  <Avatar
                    src={"https://avatars0.githubusercontent.com/u/12551446"}
                    size="large"
                  />
                </Badge>
              </NavLink>
            }
            style={{ float: "right" }}
            onClick={authStore.logout}
          >
            <Menu.Item key="setting:2" icon={<LogoutOutlined />}>
              Logout
            </Menu.Item>
            {/*
            <Menu.ItemGroup title="Item 2">
              <Menu.Item key="setting:3">Option 3</Menu.Item>
              <Menu.Item key="setting:4">Option 4</Menu.Item>
            </Menu.ItemGroup> */}
          </SubMenu>
        ) : (
            <Menu.Item
              key="auth"
              icon={<UserOutlined />}
              style={{ float: "right" }}
            >
              <NavLink to="/auth"> Login</NavLink>
            </Menu.Item>
          )}

        <Menu.Item
          key="looks"
          icon={<CameraOutlined />}
          disabled={!authStore.refreshToken}
          style={{ float: "left" }}
        >
          <NavLink to="/looks"> Looks</NavLink>
        </Menu.Item>
        <Menu.Item
          key="items"
          icon={<SkinOutlined />}
          disabled={!authStore.refreshToken}
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
    );
  }
}

export default MenuBar;
