import React, { useEffect, useState, useRef, useCallback } from "react";
import { observer } from "mobx-react";
import { Col, Row, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { MehOutlined } from "@ant-design/icons";

import { itemsStore } from "./itemsStore";
import { MenuBar } from "../../components/MenuBar/MenuBar";
import { ItemCard } from "./ItemCard/ItemCard";
import { ItemForm } from "./ItemForm/ItemForm";
import { Banner } from "../../components/Banner/Banner";
import { itemCategory } from "../../data/categories";
import { ToolBar } from "../../components/ToolBar/ToolBar";

import "./Items.css";

export const Items = observer(() => {
  const containerElement = useRef(null);
  const missingCardForFullRow = useRef(0);
  const [quickEdit, setQuickEdit] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    itemsStore.loadItems();
    console.log(itemCategory);
    calculateMissingCardsForFullRow();
  }, [
    itemsStore.isOutOfDate,
    containerElement.current,
    missingCardForFullRow.current,
  ]);

  const calculateMissingCardsForFullRow = useCallback(() => {
    const containerWidth =
      containerElement.current === null
        ? 0
        : containerElement.current.offsetWidth;
    const cardWidth = 240;
    const numberPerRow = Math.floor(containerWidth / cardWidth, 1);
    const numberLooks = itemsStore.items.length + 1; // +1 for the form
    const numberFullRow = Math.floor(numberLooks / numberPerRow);
    missingCardForFullRow.current =
      numberPerRow - (numberLooks - numberFullRow * numberPerRow);
  }, [containerElement.current]);

  const itemList = itemsStore.items.map((item) => {
    return (
      <Col key={item._id}>
        <ItemCard item={item} />
      </Col>
    );
  });

  const GhostCards = () => {
    let ghost = [];
    for (let i = 0; i < missingCardForFullRow.current; i++) {
      ghost.push(
        <Col key={"ghost" + i}>
          <div className="items__ghostCard"></div>
        </Col>
      );
    }
    return ghost;
  };

  return (
    <div className="items__main">
      <MenuBar />
      {itemsStore.error !== null ? (
        <div className="spinner">
          {itemsStore.error}
          <br />
          <br />
          <MehOutlined style={{ fontSize: "120px", color: "#b6c8bf" }} />
        </div>
      ) : itemsStore.isLoading ? (
        <div className="spinner">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Banner
            id="missingTag"
            desc={t("items.missingTagsAlert")}
            show={true}
          />
          <div ref={containerElement} className="items__container">
            <div className="items__toolbar">
              <div className="items__toolbarLeft">
                {itemsStore.items.length} {t("menu.items")}
              </div>
              <div className="items__toolbarRight">
                <ToolBar
                  quickEdit={quickEdit}
                  setQuickEdit={setQuickEdit}
                  showFilter={showFilter}
                  setShowFilter={setShowFilter}
                />
              </div>
            </div>
            <Row justify={"space-around"}>
              <Col>
                <ItemForm />
              </Col>
              {itemList}
              <GhostCards />
            </Row>
          </div>
        </>
      )}
    </div>
  );
});
