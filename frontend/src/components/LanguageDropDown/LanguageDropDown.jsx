import React, { useState } from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

import "./LanguageDropDown.css";

export const LanguageDropDown = (props) => {
  const [language, setLanguage] = useState("EN");

  const browserLanguage =
    window.navigator.userLanguage || window.navigator.language;
  console.log(browserLanguage);

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          setLanguage("EN");
        }}
      >
        EN
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setLanguage("DE");
        }}
      >
        DE
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setLanguage("FR");
        }}
      >
        FR
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="languageDropdown">
      <Dropdown overlay={menu} trigger={"click"}>
        <a
          className="ant-dropdown-link"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {language}
          <DownOutlined />
        </a>
      </Dropdown>
    </div>
  );
};
