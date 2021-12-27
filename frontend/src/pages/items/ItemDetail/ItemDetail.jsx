import React, { useState } from "react";
import { Spin, Tooltip, Dropdown, Menu } from "antd";
import { observer } from "mobx-react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { EditableTitle } from "../../../components/EditableTitle/EditableTitle";
import { itemsStore } from "../itemsStore";
import { userStore } from "../../../stores/userStore/userStore";
import { itemCategoryMen, itemCategoryWomen, itemCategoryNB } from "../../../data/categories";
import { colors } from "../../../data/colors";
import { pattern } from "../../../data/pattern";

import "./ItemDetail.css";

export const ItemDetail = observer((props) => {
  const [category, setCategory] = useState(props.selectedItem.category)
  const { t } = useTranslation();


  const CategoryDropDownMen = itemCategoryMen.map((catItem) => {
    return (
      <Menu.Item
        key={catItem.code}
        onClick={() => {
          categoryChangeHandler(catItem.en);
          etCategory(catItem.en);
        }}>
        {catItem.en}
      </Menu.Item>);
  });

  const CategoryDropDownWomen = itemCategoryWomen.map((catItem) => {
    return (
      <Menu.Item
        key={catItem.code}
        onClick={() => {
          categoryChangeHandler(catItem.en);
          etCategory(catItem.en);
        }}>
        {catItem.en}
      </Menu.Item>);
  });

  const CategoryDropDownNB = itemCategoryNB.map((catItem) => {
    return (
      <Menu.Item
        key={catItem.code}
        onClick={() => {
          categoryChangeHandler(catItem.en);
          etCategory(catItem.en);
        }}>
        {catItem.en}
      </Menu.Item>);
  });


  return (
    <div className="itemdetail__container">
      <div className="itemdetail__backArrow">
        <Tooltip placement="bottomRight" title={t("items.backToItems")}>
          <ArrowLeftOutlined
            className="itemdetail__arrowIcon"
            onClick={() => {
              props.setSelectedItem(null);
            }}
          />
        </Tooltip>
      </div>

      <div className="itemdetail__header">
        <div className="itemdetail__headerTitle">
          <span className="itemdetail__headerTitleId">
            {props.selectedItem._id}
          </span>
          <div className="itemdetail__headerPoints">&#9679;</div>
          <EditableTitle
            title={props.selectedItem.title}
            id={props.selectedItem._id}
            type={"item"}
            active={props.selectedItem.active}
          />
          <div className="itemdetail__headerPoints">&#9679;</div>
          <Dropdown
            overlay={
              <Menu>
                {userStore.gender === 1 ?
                  CategoryDropDownMen :
                  userStore.gender === 2 ?
                    CategoryDropDownWomen :
                    CategoryDropDownNB
                }
              </Menu>}
            placement="bottomLeft">
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              {category ?
                <span className="itemdetail__headerCategory">{category}</span>
                : <span className="itemdetail__headerSelectCategory">Select a category</span>}
            </a>
          </Dropdown>

        </div>
      </div>

      <div className="itemdetail__spacer"></div>
      <div className="itemdetail__imageWrap">
        <div
          className="itemdetail__pictureBlur"
          id={`selected_item_picture_${props.selectedItem._id}`}
          style={{
            background: `url(${props.selectedItem.mediaUrlMedium})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div
          className="itemdetail__picture"
          id={`selected_item_picture_${props.selectedItem._id}`}
          style={{
            background: `url(${props.selectedItem.mediaUrlMedium})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>

      {
        itemsStore.isLoading ?
          <div className="itemDetail__itemContainer">
            <div className="itemDetail__spinner">
              <Spin size="large" />
            </div>
          </div>
          :
          <div className="itemDetail__itemContainer">
            Container
          </div>
      }
    </div >
  );
});
