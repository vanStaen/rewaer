import React from "react";
import { Spin, Tooltip } from "antd";
import { observer } from "mobx-react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { ItemDetailFormCategory } from "./ItemDetailFormElement/ItemDetailFormCategory";
import { ItemDetailFormStringElement } from "./ItemDetailFormElement/ItemDetailFormStringElement";
import { itemsStore } from "../itemsStore";
import { userStore } from "../../../stores/userStore/userStore";
import {
  itemCategoryMen,
  itemCategoryWomen,
  itemCategoryNB
} from "../../../data/categories";

import { colors } from "../../../data/colors";
import { pattern } from "../../../data/pattern";

import "./ItemDetail.css";

export const ItemDetail = observer((props) => {
  const { t } = useTranslation();

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
            <ItemDetailFormStringElement
              element="title"
              title="title"
              value={props.selectedItem.title}
              selectedItem={props.selectedItem} />
            <ItemDetailFormCategory
              title="category"
              element="category"
              data={
                userStore.gender === 1 ?
                  itemCategoryMen :
                  userStore.gender === 2 ?
                    itemCategoryWomen :
                    itemCategoryNB
              }
              value={props.selectedItem.category}
              selectedItem={props.selectedItem} />
            <ItemDetailFormStringElement
              element="desc"
              title="description"
              value={props.selectedItem.desc}
              selectedItem={props.selectedItem} />
            <ItemDetailFormCategory
              title="colors"
              element="colors"
              data={colors}
              value={null}
              selectedItem={props.selectedItem} />
            <ItemDetailFormCategory
              title="pattern"
              element="pattern"
              data={pattern}
              value={null}
              selectedItem={props.selectedItem} />
            brand<br />
            active/archived<br />
            favorite<br />
            private<br />
            status - 0: There, 1: Sold, 2: Thrown, 3: GivenAway, 4: Lent, 5: Lost, 6: ForSale<br />
          </div>
      }
    </div >
  );
});
