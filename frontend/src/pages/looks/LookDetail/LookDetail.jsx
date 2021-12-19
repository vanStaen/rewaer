import React, { useEffect, useState } from "react";
import { notification, Spin, Popconfirm, Tooltip, Dropdown, Menu } from "antd";
import { observer } from "mobx-react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { EditableTitle } from "../../../components/EditableTitle/EditableTitle";
import { updateCategoryLook } from "../actions/updateCategoryLook";
import { itemsStore } from "../../Items/itemsStore";
import { looksStore } from "../looksStore";
import { lookCategory } from "../../../data/categories";

import "./LookDetail.css";

export const LookDetail = observer((props) => {
  const [category, setCategory] = useState(props.selectedLook.category)
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

  const CategoryDropDown = lookCategory.map((category) => {
    return (
      <Menu.Item onClick={() => { categoryChangeHandler(category.en); setCategory(category.en); }}>
        {category.en}
      </Menu.Item>);
  });

  const itemList = itemsStore.items.map((item) => {
    return (
      <div className="lookDetail__item"
        style={{
          background: `url(${item.mediaUrlMedium})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
      </div>
    );
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
          &nbsp;|&nbsp;
          <EditableTitle
            title={props.selectedLook.title}
            id={props.selectedLook._id}
            type={"look"}
            active={props.selectedLook.active}
          />
          &nbsp;|&nbsp;
          <Dropdown overlay={<Menu>{CategoryDropDown}</Menu>} placement="bottomLeft">
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              {category ?
                <span className="lookdetail__headerCategory">{category}</span>
                : <span className="lookdetail__headerSelectCategory">Select a category</span>}
            </a>
          </Dropdown>
        </div>
      </div>

      <div className="lookdetail__spacer"></div>
      <div class="lookdetail__imageWrap">
        <div
          className="lookdetail__pictureBlur"
          id={`selected_look_picture_${props.selectedLook._id}`}
          style={{
            background: `url(${props.selectedLook.mediaUrlMedium})`,
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
            {itemList}
          </div>
      }
    </div >
  );
});
