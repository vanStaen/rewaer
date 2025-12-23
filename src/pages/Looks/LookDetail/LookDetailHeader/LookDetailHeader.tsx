import React, { useState, useEffect } from "react";
import { Dropdown, Menu } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { looksStore } from "../../looksStore.js";
import { userStore } from "../../../../stores/userStore/userStore.js";
import { EditableTitle } from "../../../../components/EditableTitle/EditableTitle";
import { convertCodeToObjectString } from "../../../../helpers/convertCodeTo";
import { updateCategoryLook } from "../../actions/updateCategoryLook";
import { updateSeasonLook } from "../../actions/updateSeasonLook";
import { lookCategory } from "../../../../lib/data/categories";
import { seasons } from "../../../../lib/data/seasons";
import { DetailReturnArrow } from "../../../../components/DetailReturnArrow/DetailReturnArrow";

import "./LookDetailHeader.less";

export const LookDetailHeader: React.FC = observer(() => {
  const { t } = useTranslation();

  const selectedLook = looksStore.selectedLook || { id: 0, items: [], category: null, season: null, private: false, active: false, title: "" };

  const [category, setCategory] = useState<string | null>(selectedLook.category);
  const [season, setSeason] = useState<string | null>(selectedLook.season);
  const [isPrivate, setIsPrivate] = useState<boolean>(selectedLook.private);
  const [isActive, setIsActive] = useState<boolean>(selectedLook.active);
  const [selectedItems, setSelectedItems] = useState<number[]>(
    selectedLook.items ? selectedLook.items : [],
  );

  useEffect(() => {
    if (!selectedLook) return;
    setCategory(selectedLook.category);
    setSeason(selectedLook.season);
    setSelectedItems(selectedLook.items);
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

  const CategoryDropDown = lookCategory.map((category) => {
    return (
      <Menu.Item
        key={category.code}
        onClick={() => {
          categoryChangeHandler(category.code);
          setCategory(category.code);
        }}
      >
        {category[userStore.language as keyof typeof category]}
      </Menu.Item>
    );
  });

  const SeasonsDropDown = seasons.map((season) => {
    return (
      <Menu.Item
        key={season.code}
        onClick={() => {
          seasonChangeHandler(season.code);
          setSeason(season.code);
        }}
      >
        {season[userStore.language as keyof typeof season]}
      </Menu.Item>
    );
  });

  return (
    <>
      <DetailReturnArrow page="look" />
      <div className="lookdetail__header">
        <span className="lookdetail__headerTitleId">
          #{selectedLook.id}
        </span>
        {selectedItems.length > 0 && (
          <>
            <div className="lookdetail__headerPoints">&#9679;</div>
            <div className="lookdetail__headerItemCount">
              {selectedItems.length} {t("main.item")}
              {selectedItems.length > 1 && "s"}
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
          overlay={<Menu>{CategoryDropDown}</Menu>}
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
          overlay={<Menu>{SeasonsDropDown}</Menu>}
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
