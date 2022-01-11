import React, { useEffect, useState } from "react";
import { Spin, Tooltip, Dropdown, Menu } from "antd";
import { observer } from "mobx-react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { EditableTitle } from "../../../components/EditableTitle/EditableTitle";
import { updateCategoryLook } from "../actions/updateCategoryLook";
import { updateSeasonLook } from "../actions/updateSeasonLook";
import { updateItemsLook } from "../actions/updateItemsLook";
import { itemsStore } from "../../Items/itemsStore";
import { looksStore } from "../looksStore";
import { userStore } from "../../../stores/userStore/userStore";
import { lookCategory } from "../../../data/categories";
import { seasons } from "../../../data/seasons";
import { convertCodeToObjectString } from "../../../helpers/convertCodeTo";
import { LookDetailFormRadio } from "./LookDetailFormElement/LookDetailFormRadio";

import "./LookDetail.css";

export const LookDetail = observer((props) => {
  const [category, setCategory] = useState(props.selectedLook.category);
  const [season, setSeason] = useState(props.selectedLook.season);
  const [selectedItems, setSelectedItems] = useState(
    props.selectedLook.items ? props.selectedLook.items : []
  );
  const [showPrivate, setShowPrivate] = useState(false);
  const [isPrivate, setIsPrivate] = useState(props.selectedLook.private);
  const [isActive, setIsActive] = useState(props.selectedLook.active);
  const { t } = useTranslation();

  useEffect(() => {
    itemsStore.loadItems();
    userStore.profilSettings &&
      setShowPrivate(userStore.profilSettings.displayPrivate);
  }, [itemsStore.isOutOfDate, userStore.profilSettings]);

  const categoryChangeHandler = (value) => {
    updateCategoryLook(props.selectedLook._id, value);
    looksStore.setIsOutOfDate(true);
  };

  const seasonChangeHandler = (value) => {
    updateSeasonLook(props.selectedLook._id, value);
    looksStore.setIsOutOfDate(true);
  };

  const numberOfPrivateItems = itemsStore.items.filter(
    (item) => item.private
  ).length;

  const itemClickHandler = (value) => {
    const valueAsInt = parseInt(value);
    const indexOfValue = selectedItems.indexOf(valueAsInt);
    if (!isActive) {
      return null;
    }
    if (indexOfValue < 0) {
      setSelectedItems([...selectedItems, valueAsInt]);
      updateItemsLook(props.selectedLook._id, [...selectedItems, valueAsInt]);
    } else {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== valueAsInt));
      updateItemsLook(
        props.selectedLook._id,
        selectedItems.filter((itemId) => itemId !== valueAsInt)
      );
    }
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

  const itemList = itemsStore.items.map((item) => {
    const displayArchived = userStore.profilSettings
      ? userStore.profilSettings.displayArchived
      : false;
    const isSelected = selectedItems.indexOf(parseInt(item._id)) >= 0;
    if (!isSelected) {
      if (!item.active && !displayArchived) {
        return null;
      } else {
        if (item.private && !showPrivate) {
          return null;
        } else {
          return (
            <div
              className={"lookDetail__item"}
              onClick={() => itemClickHandler(item._id)}
              key={item._id}
              style={{
                background: `url(${item.mediaUrlMedium})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          );
        }
      }
    }
    return null;
  });

  const selectedItemList = itemsStore.items.map((item) => {
    const isSelected = selectedItems.indexOf(parseInt(item._id)) >= 0;
    if (isSelected) {
      return (
        <div
          className={
            isActive ? "lookDetail__itemSelected" : "lookDetail__itemArchived"
          }
          onClick={() => itemClickHandler(item._id)}
          key={item._id}
          style={{
            background: `url(${item.mediaUrlMedium})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      );
    }
    return null;
  });

  return (
    <div className="lookdetail__container">
      <div className="lookdetail__backArrow">
        <Tooltip placement="bottomRight" title={t("looks.backToLooks")}>
          <ArrowLeftOutlined
            className="lookdetail__arrowIcon"
            onClick={() => {
              props.setSelectedLook(null);
            }}
          />
        </Tooltip>
      </div>

      <div className="lookdetail__header">
        <div className="lookdetail__headerTitle">
          <span className="lookdetail__headerTitleId">
            {props.selectedLook._id}
          </span>
          <div className="lookdetail__headerPoints">&#9679;</div>
          <EditableTitle
            title={props.selectedLook.title}
            id={props.selectedLook._id}
            type={"look"}
            active={props.selectedLook.active}
          />
          <div className="lookdetail__headerPoints">&#9679;</div>
          <Dropdown
            overlay={<Menu>{CategoryDropDown}</Menu>}
            placement="bottomLeft"
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
                  Select a category
                </span>
              )}
            </a>
          </Dropdown>

          <div className="lookdetail__headerPoints">&#9679;</div>
          <Dropdown
            overlay={<Menu>{SeasonsDropDown}</Menu>}
            placement="bottomLeft"
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
                  Select a season
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
                setShowPrivate(!showPrivate);
              }}
            >
              {showPrivate
                ? t("items.hidePrivateItems")
                : t("items.showPrivateItems")}
            </span>
          )}
        </div>
      </div>

      <div className="lookdetail__spacer"></div>
      <div className="lookdetail__imageWrap">
        <div
          className="lookdetail__pictureBlur"
          id={`selected_look_picture_${props.selectedLook._id}`}
          style={{
            background: `url(${props.selectedLook.mediaUrlMedium})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div
          className="lookdetail__picture"
          id={`selected_look_picture_${props.selectedLook._id}`}
          style={{
            background: `url(${props.selectedLook.mediaUrlMedium})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>

      {itemsStore.isLoading ? (
        <div className="lookDetail__itemContainer">
          <div className="lookDetail__spinner">
            <Spin size="large" />
          </div>
        </div>
      ) : (
        <div className="lookDetail__itemContainer">
          {selectedItemList}
          {isActive && itemList}
        </div>
      )}
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
          selectedLook={props.selectedLook}
          whatShouldBeRed={true}
          multiSelect={false}
          disabled={!props.selectedLook.active}
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
          selectedLook={props.selectedLook}
          whatShouldBeRed={false}
          multiSelect={false}
          disabled={false}
        />
      </div>
    </div>
  );
});
