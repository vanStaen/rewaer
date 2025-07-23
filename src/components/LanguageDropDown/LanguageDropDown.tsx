import React, { useState } from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import "./LanguageDropDown.less";

export const LanguageDropDown: React.FC = () => {
  const { i18n } = useTranslation();
  const initLanguage = i18n.language.slice(-2);
  const [language, setLanguage] = useState<string>(
    initLanguage === "US" ? "EN" : initLanguage,
  );

  const onLanguageChangeHandler = (value: string) => {
    if (value === "en") {
      i18n.changeLanguage("en-US");
      setLanguage("EN");
    } else if (value === "fr") {
      i18n.changeLanguage("fr-FR");
      setLanguage("FR");
    } else if (value === "de") {
      i18n.changeLanguage("de-DE");
      setLanguage("DE");
    }
  };

  return (
    <div className="languageDropdown">
      <Dropdown menu={{ items: [
        {
          key: "en",
          label: <div className="languageDropdown__item" onClick={() => onLanguageChangeHandler("en")}>EN</div>
        },
        {
          key: "de",
          label: <div className="languageDropdown__item" onClick={() => onLanguageChangeHandler("de")}>DE</div>
        },
        {
          key: "fr",
          label: <div className="languageDropdown__item" onClick={() => onLanguageChangeHandler("fr")}>FR</div>
        }
      ]}} trigger={["click"]}>
        {/* eslint-disable-next-line */}
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
