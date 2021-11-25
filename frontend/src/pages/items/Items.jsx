import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Col, Row, Spin, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { EditOutlined, CopyOutlined, FilterOutlined } from "@ant-design/icons";

import { itemsStore } from "./itemsStore";
import { MenuBar } from "../../components/MenuBar/MenuBar";
import { ItemCard } from "./ItemCard/ItemCard";
import { ItemForm } from "./ItemForm/ItemForm";
import { Banner } from "../../components/Banner/Banner";

import "./Items.css";

export const Items = observer(() => {
  const { t } = useTranslation();
  useEffect(() => {
    itemsStore.loadItems();
  }, [itemsStore.isOutOfDate]);

  const itemList = itemsStore.items.map((item) => {
    return (
      <Col key={item._id}>
        <ItemCard item={item} />
      </Col>
    );
  });

  return (
    <div className="items__main">
      <MenuBar />
      {itemsStore.error !== null ? (
        itemsStore.error
      ) : itemsStore.isLoading ? (
        <div className="items__spinner">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Banner
            id="missingTag"
            desc={t("items.missingTagsAlert")}
            show={true}
          />
          <div className="items__container">
            <div className="items__toolbar">
              <div className="items__toolbarLeft">
                {itemsStore.items.length} items
              </div>
              <div className="items__toolbarRight">
                <Tooltip placement="topRight" title="Show quick edits">
                  <EditOutlined className="items__toolbarIcon" />
                </Tooltip>
                <Tooltip
                  placement="topRight"
                  title="Activate multiselect edits"
                >
                  <CopyOutlined className="items__toolbarIcon items__toolbarIconActive" />
                </Tooltip>
                <Tooltip placement="topRight" title="Filter the items">
                  <FilterOutlined className="items__toolbarIcon" />
                </Tooltip>
              </div>
            </div>
            <Row justify={"space-around"}>
              <Col>
                <ItemForm />
              </Col>
              {itemList}
            </Row>
          </div>
        </>
      )}
    </div>
  );
});
