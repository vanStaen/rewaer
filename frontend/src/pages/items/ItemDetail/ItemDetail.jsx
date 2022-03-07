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
} from "../../../lib/data/categories";
import { colors } from "../../../lib/data/colors";
import { pattern } from "../../../lib/data/pattern";
import { itemStatus } from "../../../lib/data/itemStatus";

import "./ItemDetail.css";

export const ItemDetail = observer((props) => {
  const { t } = useTranslation();

  const selectedItem = itemsStore.items.find(
    (item) => item._id === props.selectedItemId
  );

  console.log(userStore.friends);

  return (
    <div className="itemdetail__container">
      <div className="itemdetail__backArrow">
        <Tooltip placement="bottomRight" title={t("items.backToItems")}>
          <ArrowLeftOutlined
            className="itemdetail__arrowIcon"
            onClick={() => {
              props.hideDetailView();
            }}
          />
        </Tooltip>
      </div>

      <div className="itemdetail__imageWrap">
        <div
          className="itemdetail__pictureBlur"
          id={`selected_item_picture_${selectedItem._id}`}
          style={{
            background: `url(${selectedItem.mediaUrlMedium})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div
          className="itemdetail__picture"
          id={`selected_item_picture_${selectedItem._id}`}
          style={{
            background: `url(${selectedItem.mediaUrlMedium})`,
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
            value={selectedItem.title}
            selectedItem={selectedItem}
            disabled={!selectedItem.active}
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
            value={selectedItem.category}
            selectedItem={selectedItem}
            multiSelect={false}
            disabled={!selectedItem.active}
          />
          <ItemDetailFormStringElement
            element="brand"
            title="brand"
            value={selectedItem.brand}
            selectedItem={selectedItem}
            disabled={!selectedItem.active}
          />
          <ItemDetailFormDropDown
            title="colors"
            element="colors"
            data={colors}
            value={selectedItem.colors[0]}
            selectedItem={selectedItem}
            multiSelect={true}
            disabled={!selectedItem.active}
          />
          <ItemDetailFormDropDown
            title="pattern"
            element="pattern"
            data={pattern}
            value={selectedItem.pattern}
            selectedItem={selectedItem}
            multiSelect={false}
            disabled={!selectedItem.active}
          />
          <br />
          <ItemDetailFormRadio
            title="status"
            element="status"
            data={itemStatus}
            value={selectedItem.status}
            selectedItem={selectedItem}
            multiSelect={false}
            disabled={!selectedItem.active}
            tooltip={t("items.statusTooltip")}
          />
          <ItemDetailFormRadio
            title="private"
            element="private"
            data={[
              { code: false, en: "Public", de: "Öffentlich", fr: "Publique" },
              { code: true, en: "Private", de: "Privat", fr: "Privé" },
            ]}
            value={selectedItem.private}
            selectedItem={selectedItem}
            whatShouldBeRed={true}
            multiSelect={false}
            disabled={!selectedItem.active}
            tooltip={t("items.makePrivateItem")}
          />
          <ItemDetailFormRadio
            title="active"
            element="active"
            data={[
              { code: true, en: "Active", de: "Aktiv", fr: "Actif" },
              { code: false, en: "Archived", de: "Archiviert", fr: "Archivé" },
            ]}
            value={selectedItem.active}
            selectedItem={selectedItem}
            whatShouldBeRed={false}
            multiSelect={false}
            disabled={false}
            tooltip={t("items.archiveItem")}
          />
          <br />
          <ItemDetailFormStringElement
            element="location"
            title="location"
            value={selectedItem.location}
            selectedItem={selectedItem}
            disabled={!selectedItem.active}
            tooltip={t("items.notesTooltip")}
          />
          <ItemDetailFormStringElement
            element="notes"
            title="notes"
            value={selectedItem.notes}
            selectedItem={selectedItem}
            disabled={!selectedItem.active}
            tooltip={t("items.notesTooltip")}
          />
          List of user friends:
          {userStore.friends.length}
          {userStore.friends.map((friend) => {
            return <>name: {friend.userName}</>;
          })}
        </div>
      )}
    </div>
  );
});
