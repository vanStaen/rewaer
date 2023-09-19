import React, { useEffect, useState } from "react";
import { Tooltip, Dropdown, Menu } from "antd";
import { observer } from "mobx-react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { EditableTitle } from "../../../components/EditableTitle/EditableTitle";
import { updateCategoryLook } from "../actions/updateCategoryLook";
import { updateSeasonLook } from "../actions/updateSeasonLook";
import { itemsStore } from "../../Items/itemsStore";
import { looksStore } from "../looksStore";
import { userStore } from "../../../stores/userStore/userStore";
import { lookCategory } from "../../../lib/data/categories";
import { seasons } from "../../../lib/data/seasons";
import { convertCodeToObjectString } from "../../../helpers/convertCodeTo";
import { LookDetailFormRadio } from "./LookDetailFormElement/LookDetailFormRadio";
import { switchLook } from "./switchLook";
import { ItemPicker } from "./ItemPicker/ItemPicker";

import "./LookDetail.css";

export const LookDetail = observer(() => {
  const [category, setCategory] = useState(looksStore.selectedLook.category);
  const [season, setSeason] = useState(looksStore.selectedLook.season);
  const [selectedItems, setSelectedItems] = useState(
    looksStore.selectedLook.items ? looksStore.selectedLook.items : []
  );
  const [displayPictureUrl, setDisplayPictureUrl] = useState(
    looksStore.selectedLook.mediaUrlMedium
  );
  const [isPrivate, setIsPrivate] = useState(looksStore.selectedLook.private);
  const [isActive, setIsActive] = useState(looksStore.selectedLook.active);
  const { t } = useTranslation();

  useEffect(() => {
    setCategory(looksStore.selectedLook.category);
    setSeason(looksStore.selectedLook.season);
    setSelectedItems(looksStore.selectedLook.items);
    setIsPrivate(looksStore.selectedLook.private);
    setIsActive(looksStore.selectedLook.active);
    setDisplayPictureUrl(looksStore.selectedLook.mediaUrlMedium);
  }, [looksStore.selectedLook]);

  useEffect(() => {
    itemsStore.loadItems();
  }, [itemsStore.isOutOfDate]);

  useEffect(() => {
    const url = new URL(window.location);
    history.pushState({}, "", url);
    window.addEventListener("keydown", keydownEventHandler);
    window.addEventListener("popstate", browserBackHandler);
    return () => {
      window.removeEventListener("keydown", keydownEventHandler);
      window.removeEventListener("popstate", browserBackHandler);
    };
  }, []);

  const browserBackHandler = (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    looksStore.setSelectedLook(null);
  };

  const keydownEventHandler = (event) => {
    const keyPressed = event.key.toLowerCase();
    if (keyPressed === "escape") {
      event.preventDefault();
      looksStore.setSelectedLook(null);
    } else if (keyPressed === "arrowleft") {
      event.preventDefault();
      switchLook(false, looksStore.showPrivateLooks);
    } else if (keyPressed === "arrowright") {
      event.preventDefault();
      switchLook(true, looksStore.showPrivateLooks);
    }
  };

  const categoryChangeHandler = (value) => {
    updateCategoryLook(looksStore.selectedLook._id, value);
    looksStore.setIsOutOfDate(true);
  };

  const seasonChangeHandler = (value) => {
    updateSeasonLook(looksStore.selectedLook._id, value);
    looksStore.setIsOutOfDate(true);
  };

  const numberOfPrivateItems = itemsStore.items.filter(
    (item) => item.private
  ).length;

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
    <div className="lookdetail__container">
      <div className="lookdetail__backArrow">
        <Tooltip placement="bottomRight" title={t("looks.backToLooks")}>
          <ArrowLeftOutlined
            className="lookdetail__arrowIcon"
            onClick={() => {
              looksStore.setSelectedLook(null);
            }}
          />
        </Tooltip>
      </div>

      <div className="lookdetail__header">
        <div className="lookdetail__headerTitle">
          <span className="lookdetail__headerTitleId">
            {looksStore.selectedLook._id}
          </span>
          <div className="lookdetail__headerPoints">&#9679;</div>
          <EditableTitle
            title={looksStore.selectedLook.title}
            id={looksStore.selectedLook._id}
            type={"look"}
            active={looksStore.selectedLook.active}
          />
          <div className="lookdetail__headerPoints">&#9679;</div>
          <Dropdown
            overlay={<Menu>{CategoryDropDown}</Menu>}
            placement="bottomLeft"
            disabled={!isActive}
          >
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
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
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              {season !== null ? (
                <span className="lookdetail__headerCategory">
                  {
                    convertCodeToObjectString(season, seasons)[
                      userStore.language
                    ]
                  }
                </span>
              ) : (
                <span className="lookdetail__headerSelectCategory">
                  {t("looks.selectSeason")}
                </span>
              )}
            </a>
          </Dropdown>
          {selectedItems.length > 0 && (
            <>
              <div className="lookdetail__headerPoints">&#9679;</div>
              <div className="lookdetail__headerItemCount">
                {selectedItems.length} {t("main.item")}
                {selectedItems.length > 1 && "s"}
              </div>
            </>
          )}
          {numberOfPrivateItems > 0 && (
            <span
              className="lookdetail__headerShowPrivate link"
              onClick={() => {
                looksStore.setShowPrivateItems(!looksStore.showPrivateLooks);
              }}
            >
              {looksStore.showPrivateLooks
                ? t("items.hidePrivateItems")
                : t("items.showPrivateItems")}
            </span>
          )}
        </div>
      </div>

      <div className="lookDetail__rightContainer">
        <div className="lookdetail__imageWrap">
          <div
            className="lookdetail__pictureBlur"
            id={`selected_look_picture_blur_${looksStore.selectedLook._id}`}
            style={{
              background: `url(${displayPictureUrl})`,
            }}
          ></div>
          <div
            className="lookdetail__picture"
            id={`selected_look_picture_${looksStore.selectedLook._id}`}
            style={{
              background: `url(${displayPictureUrl})`,
            }}
          ></div>
        </div>
        <div className="lookDetail__actionContainer">
          <LookDetailFormRadio
            title="private"
            element="private"
            data={[
              { code: false, en: "Public", de: "Öffentlich", fr: "Publique" },
              { code: true, en: "Private", de: "Privat", fr: "Privé" },
            ]}
            value={isPrivate}
            flipValueTo={setIsPrivate}
            selectedLook={looksStore.selectedLook}
            whatShouldBeRed={true}
            multiSelect={false}
            disabled={!looksStore.selectedLook.active}
            tooltip={t("looks.makePrivateLook")}
          />
          <LookDetailFormRadio
            title="active"
            element="active"
            data={[
              { code: true, en: "Active", de: "Aktiv", fr: "Actif" },
              { code: false, en: "Archived", de: "Archiviert", fr: "Archivé" },
            ]}
            value={isActive}
            flipValueTo={setIsActive}
            selectedLook={looksStore.selectedLook}
            whatShouldBeRed={false}
            multiSelect={false}
            disabled={false}
            tooltip={t("looks.archiveLook")}
          />
        </div>
      </div>

      <ItemPicker
        selectedItems={selectedItems}
        isActive={isActive}
        setSelectedItems={setSelectedItems}
      />
    </div>
  );
});
