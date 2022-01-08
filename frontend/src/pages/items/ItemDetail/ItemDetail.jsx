import React from "react";
import { Spin, Tooltip } from "antd";
import { observer } from "mobx-react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { ItemDetailFormDropDown } from "./ItemDetailFormElement/ItemDetailFormDropDown";
import { ItemDetailFormStringElement } from "./ItemDetailFormElement/ItemDetailFormStringElement";
import { ItemDetailFormRadio } from "./ItemDetailFormElement/ItemDetailFormRadio";
import { itemsStore } from "../itemsStore";
import { userStore } from "../../../stores/userStore/userStore";

import {
  itemCategoryMen,
  itemCategoryWomen,
  itemCategoryNB,
} from "../../../data/categories";
import { colors } from "../../../data/colors";
import { pattern } from "../../../data/pattern";
import { itemStatus } from "../../../data/itemStatus";

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

      {itemsStore.isLoading ? (
        <div className="itemDetail__itemContainer">
          <div className="itemDetail__spinner">
            <Spin size="large" />
          </div>
        </div>
      ) : (
        <div className="itemDetail__itemContainer">
          <ItemDetailFormStringElement
            element="title"
            title="title"
            value={props.selectedItem.title}
            selectedItem={props.selectedItem}
            disabled={!props.selectedItem.active}
          />
          <ItemDetailFormDropDown
            title="category"
            element="category"
            data={
              userStore.gender === 1
                ? itemCategoryMen
                : userStore.gender === 2
                ? itemCategoryWomen
                : itemCategoryNB
            }
            value={props.selectedItem.category}
            selectedItem={props.selectedItem}
            multiSelect={false}
            disabled={!props.selectedItem.active}
          />
          <ItemDetailFormDropDown
            title="colors"
            element="colors"
            data={colors}
            value={null}
            selectedItem={props.selectedItem}
            multiSelect={true}
            disabled={!props.selectedItem.active}
          />
          <ItemDetailFormDropDown
            title="pattern"
            element="pattern"
            data={pattern}
            value={props.selectedItem.pattern}
            selectedItem={props.selectedItem}
            multiSelect={false}
            disabled={!props.selectedItem.active}
          />
          <ItemDetailFormStringElement
            element="notes"
            title="notes"
            value={props.selectedItem.notes}
            selectedItem={props.selectedItem}
            disabled={!props.selectedItem.active}
          />
          <ItemDetailFormStringElement
            element="brand"
            title="brand"
            value={props.selectedItem.brand}
            selectedItem={props.selectedItem}
            disabled={!props.selectedItem.active}
          />
          <ItemDetailFormRadio
            title="status"
            element="status"
            data={itemStatus}
            value={props.selectedItem.status}
            selectedItem={props.selectedItem}
            multiSelect={false}
            disabled={!props.selectedItem.active}
          />
          <ItemDetailFormRadio
            title="active"
            element="active"
            data={[
              { code: true, en: "Active", de: "Aktiv", fr: "Actif" },
              { code: false, en: "Archived", de: "Archiviert", fr: "Archivé" },
            ]}
            value={props.selectedItem.active}
            selectedItem={props.selectedItem}
            whatShouldBeRed={false}
            multiSelect={false}
            disabled={false}
          />

          <ItemDetailFormRadio
            title="private"
            element="private"
            data={[
              { code: false, en: "Public", de: "Öffentlich", fr: "Publique" },
              { code: true, en: "Private", de: "Privat", fr: "Privé" },
            ]}
            value={props.selectedItem.private}
            selectedItem={props.selectedItem}
            whatShouldBeRed={true}
            multiSelect={false}
            disabled={!props.selectedItem.active}
          />
          <br />
        </div>
      )}
    </div>
  );
});
