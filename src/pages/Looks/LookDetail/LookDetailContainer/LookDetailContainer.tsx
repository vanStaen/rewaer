import React, { useState, useEffect } from "react";
import { Dropdown } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { looksStore } from "../../looksStore";
import { userStore } from "@stores/userStore/userStore.js";
import { EditableTitle } from "@components/EditableTitle/EditableTitle";
import { convertCodeToObjectString } from "@helpers/convertCodeTo";
import { updateCategoryLook } from "../../actions/updateCategoryLook";
import { updateSeasonLook } from "../../actions/updateSeasonLook";
import { lookCategory } from "@lib/data/categories";
import { seasons } from "@lib/data/seasons";

import "./LookDetailContainer.less";

export const LookDetailHeader: React.FC = observer(() => {
  const { t } = useTranslation();

  const selectedLook = looksStore.selectedLook || {
    id: 0,
    items: [],
    category: null,
    season: null,
    private: false,
    active: false,
    title: "",
  };

  const [category, setCategory] = useState<string | null>(
    selectedLook.category,
  );
  const [season, setSeason] = useState<string>(selectedLook.season || "");
  const [isPrivate, setIsPrivate] = useState<boolean>(selectedLook.private);
  const [isActive, setIsActive] = useState<boolean>(selectedLook.active);
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>(
    selectedLook.items
      ? selectedLook.items.map((item) =>
          typeof item === "number" ? item : parseInt(item.id.toString()),
        )
      : [],
  );

  useEffect(() => {
    if (!selectedLook) return;
    setCategory(selectedLook.category);
    setSeason(selectedLook.season || "");
    setSelectedItemIds(
      selectedLook.items
        ? selectedLook.items.map((item) =>
            typeof item === "number" ? item : parseInt(item.id.toString()),
          )
        : [],
    );
    setIsPrivate(selectedLook.private);
    setIsActive(selectedLook.active);
  }, [selectedLook]);

  const categoryChangeHandler = (value: string): void => {
    updateCategoryLook(selectedLook.id, value);
    looksStore.setIsOutOfDate(true);
  };

  const seasonChangeHandler = (value: string): void => {
    updateSeasonLook(selectedLook.id, value);
    looksStore.setIsOutOfDate(true);
  };

  const categoryMenuItems = lookCategory.map((cat) => ({
    key: cat.code,
    label: cat[userStore.language as keyof typeof cat],
    onClick: () => {
      categoryChangeHandler(cat.code);
      setCategory(cat.code);
    },
  }));

  const seasonMenuItems = seasons.map((season) => ({
    key: season.code,
    label: season[userStore.language as keyof typeof season],
    onClick: () => {
      seasonChangeHandler(season.code);
      setSeason(season.code);
    },
  }));

  return (
    <>
      <div className="lookdetail__header">
        <span className="lookdetail__headerTitleId">#{selectedLook.id}</span>
        {selectedItemIds.length > 0 && (
          <>
            <div className="lookdetail__headerPoints">&#9679;</div>
            <div className="lookdetail__headerItemCount">
              {selectedItemIds.length} {t("main.item")}
              {selectedItemIds.length > 1 && "s"}
            </div>
          </>
        )}
        <div className="lookdetail__headerPoints">&#9679;</div>
        <EditableTitle
          title={selectedLook.title}
          id={selectedLook.id}
          type={"look"}
          active={selectedLook.active}
        />
        {window.innerWidth < 530 ? (
          <br />
        ) : (
          <div className="lookdetail__headerPoints">&#9679;</div>
        )}
        <Dropdown
          menu={{ items: categoryMenuItems }}
          placement="bottomLeft"
          disabled={!isActive}
        >
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            {category !== null ? (
              <span className="lookdetail__headerCategory">
                {
                  convertCodeToObjectString(category, lookCategory)[
                    userStore.language
                  ]
                }
              </span>
            ) : (
              <span className="lookdetail__headerSelectCategory">
                {t("looks.selectCategory")}
              </span>
            )}
          </a>
        </Dropdown>
        <div className="lookdetail__headerPoints">&#9679;</div>
        <Dropdown
          menu={{ items: seasonMenuItems }}
          placement="bottomLeft"
          disabled={!isActive}
        >
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            {season !== null ? (
              <span className="lookdetail__headerCategory">
                {convertCodeToObjectString(season, seasons)[userStore.language]}
              </span>
            ) : (
              <span className="lookdetail__headerSelectCategory">
                {t("looks.selectSeason")}
              </span>
            )}
          </a>
        </Dropdown>
      </div>
    </>
  );
});
