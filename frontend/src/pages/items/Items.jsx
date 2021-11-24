import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Col, Row, Spin } from "antd";

import { itemsStore } from "./itemsStore";
import { MenuBar } from "../../components/MenuBar/MenuBar";
import { ItemCard } from "./ItemCard/ItemCard";
import { ItemForm } from "./ItemForm/ItemForm";
import { Banner } from "../../components/Banner/Banner";

import "./Items.css";

export const Items = observer(() => {
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
      <Banner
        id="missingTag"
        desc="Some items are missing mandatory tags/attributes. Click here to add
        those."
        show={true}
      />
      <div className="items__container">
        {itemsStore.error !== null ? (
          itemsStore.error
        ) : itemsStore.isLoading ? (
          <div className="items__spinner">
            <Spin size="large" />
          </div>
        ) : (
          <Row justify={"space-around"}>
            <Col>
              <ItemForm />
            </Col>
            {itemList}
          </Row>
        )}
      </div>
    </div>
  );
});
