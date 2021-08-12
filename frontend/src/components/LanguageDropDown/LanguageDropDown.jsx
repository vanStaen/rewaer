import React, { useState } from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

import "./LanguageDropDown.css";

export const LanguageDropDown = (props) => {
  const [language, setLanguage] = useState("EN");

  const browserLanguage =
    window.navigator.userLanguage || window.navigator.language;
  console.log("browserLanguage", browserLanguage);

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          setLanguage("EN");
        }}
      >
        <div className="languageDropdown__item">EN</div>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setLanguage("DE");
        }}
      >
        <div className="languageDropdown__item">DE</div>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setLanguage("FR");
        }}
      >
        <div className="languageDropdown__item">FR</div>
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
