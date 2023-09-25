import React, { useState, useEffect } from "react";
import { Dropdown, Menu } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { looksStore } from "../../looksStore";
import { userStore } from "../../../../stores/userStore/userStore";
import { EditableTitle } from "../../../../components/EditableTitle/EditableTitle";
import { convertCodeToObjectString } from "../../../../helpers/convertCodeTo";
import { updateCategoryLook } from "../../actions/updateCategoryLook";
import { updateSeasonLook } from "../../actions/updateSeasonLook";
import { lookCategory } from "../../../../lib/data/categories";
import { seasons } from "../../../../lib/data/seasons";
import { LookDetailReturnArrow } from "./LookDetailReturnArrow";
import { LookDetailFormRadio } from "../LookDetailFormElement/LookDetailFormRadio";

import "./LookDetailHeader.less";

export const LookDetailHeader = observer(() => {
  const [category, setCategory] = useState(looksStore.selectedLook.category);
  const [season, setSeason] = useState(looksStore.selectedLook.season);
  const [isPrivate, setIsPrivate] = useState(looksStore.selectedLook.private);
  const [isActive, setIsActive] = useState(looksStore.selectedLook.active);
  const [selectedItems, setSelectedItems] = useState(
    looksStore.selectedLook.items ? looksStore.selectedLook.items : []
  );
  const { t } = useTranslation();

  useEffect(() => {
    setCategory(looksStore.selectedLook.category);
    setSeason(looksStore.selectedLook.season);
    setSelectedItems(looksStore.selectedLook.items);
    setIsPrivate(looksStore.selectedLook.private);
    setIsActive(looksStore.selectedLook.active);
  }, [looksStore.selectedLook]);

  const categoryChangeHandler = (value) => {
    updateCategoryLook(looksStore.selectedLook._id, value);
    looksStore.setIsOutOfDate(true);
  };

  const seasonChangeHandler = (value) => {
    updateSeasonLook(looksStore.selectedLook._id, value);
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
        {category[userStore.language]}
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
        {season[userStore.language]}
      </Menu.Item>
    );
  });

  return (
    <>
      <LookDetailReturnArrow />
      <div className="lookdetail__header">
        <span className="lookdetail__headerTitleId">
          #{looksStore.selectedLook._id}
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
          title={looksStore.selectedLook.title}
          id={looksStore.selectedLook._id}
          type={"look"}
          active={looksStore.selectedLook.active}
        />
        {window.innerWidth < 530 ? <br /> : <div className="lookdetail__headerPoints">&#9679;</div>}
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
