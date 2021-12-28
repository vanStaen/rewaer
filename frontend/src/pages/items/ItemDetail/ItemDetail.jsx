import React from "react";
import { Spin, Tooltip, Dropdown, Menu } from "antd";
import { observer } from "mobx-react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { ItemDetailFormCategory } from "./ItemDetailFormElement/ItemDetailFormCategory";
import { ItemDetailFormStringElement } from "./ItemDetailFormElement/ItemDetailFormStringElement";
import { itemsStore } from "../itemsStore";
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
            <ItemDetailFormStringElement element="title" selectedItem={props.selectedItem} />
            <ItemDetailFormCategory selectedItem={props.selectedItem} />
          </div>
      }
    </div >
  );
});
