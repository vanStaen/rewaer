import React, { useEffect, useState } from "react";
import { Spin, Tooltip, Dropdown, Menu, Image } from "antd";
import { observer } from "mobx-react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { EditableTitle } from "../../../components/EditableTitle/EditableTitle";
import { updateCategoryLook } from "../actions/updateCategoryLook";
import { updateItemsLook } from "../actions/updateItemsLook";
import { itemsStore } from "../../Items/itemsStore";
import { looksStore } from "../looksStore";
import { userStore } from "../../../stores/userStore/userStore";
import { lookCategory } from "../../../data/categories";

import "./LookDetail.css";

export const LookDetail = observer((props) => {
  const [category, setCategory] = useState(props.selectedLook.category)
  const [selectedItems, setSelectedItems] = useState(props.selectedLook.items ? props.selectedLook.items : [])
  const [showPrivate, setShowPrivate] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    itemsStore.loadItems();
  }, [
    itemsStore.isOutOfDate,
  ]);

  const categoryChangeHandler = (value) => {
    updateCategoryLook(props.selectedLook._id, value);
    looksStore.setIsOutOfDate(true);
  }

  const itemClickHandler = (value) => {
    const valueAsInt = parseInt(value);
    const indexOfValue = selectedItems.indexOf(valueAsInt);
    if (indexOfValue < 0) {
      setSelectedItems([...selectedItems, valueAsInt]);
      updateItemsLook(props.selectedLook._id, [...selectedItems, valueAsInt]);
    } else {
      setSelectedItems(selectedItems.filter(itemId => itemId !== valueAsInt))
      updateItemsLook(props.selectedLook._id, selectedItems.filter(itemId => itemId !== valueAsInt));
    }
    looksStore.setIsOutOfDate(true);
  }

  const CategoryDropDown = lookCategory.map((category) => {
    return (
      <Menu.Item key={category.code} onClick={() => { categoryChangeHandler(category.en); setCategory(category.en); }}>
        {category.en}
      </Menu.Item>);
  });

  const itemList = itemsStore.items.map((item) => {
    const displayArchived = userStore.profilSettings ? userStore.profilSettings.displayArchived : false;
    const isSelected = selectedItems.indexOf(parseInt(item._id)) >= 0;
    if (!isSelected) {
      if (!item.active && !displayArchived) {
        return null;
      } else {
        if (item.private && !showPrivate) {
          return null;
        } else {
          return (
            <div className={"lookDetail__item"}
              onClick={() => itemClickHandler(item._id)}
              key={item._id}
              style={{
                background: `url(${item.mediaUrlMedium})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}>
            </div>
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
        <div className={"lookDetail__itemSelected"}
          onClick={() => itemClickHandler(item._id)}
          key={item._id}
          style={{
            background: `url(${item.mediaUrlMedium})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
        </div>
      );
    }
    return null;
  });

  return (
    <div className="lookdetail__container">
      <div className="lookdetail__backArrow">
        <Tooltip placement="bottomRight" title={t("main.back")}>
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
          <Dropdown overlay={<Menu>{CategoryDropDown}</Menu>} placement="bottomLeft">
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              {category ?
                <span className="lookdetail__headerCategory">{category}</span>
                : <span className="lookdetail__headerSelectCategory">Select a category</span>}
            </a>
          </Dropdown>

          {selectedItems.length > 0 && (
            <>
              <div className="lookdetail__headerPoints">&#9679;</div>
              {selectedItems.length} {t("main.item")}{selectedItems.length > 1 && "s"}
            </>
          )}

          <span
            className="lookdetail__headerShowPrivate link"
            onClick={() => {
              setShowPrivate(!showPrivate);
            }}
          >
            {showPrivate ? t("looks.hidePrivateLooks") : t("looks.showPrivateLooks")}
          </span>

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

      {
        itemsStore.isLoading ?
          <div className="lookDetail__itemContainer">
            <div className="lookDetail__spinner">
              <Spin size="large" />
            </div>
          </div>
          :
          <div className="lookDetail__itemContainer">
            {selectedItemList}
            {itemList}
          </div>
      }
    </div >
  );
});
