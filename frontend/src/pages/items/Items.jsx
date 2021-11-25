import React, { useEffect, useState, useRef, useCallback } from "react";
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
  const containerElement = useRef(null);
  const missingCardForFullRow = useRef(0);
  const [quickEdit, setQuickEdit] = useState(false);
  const [multiEdit, setMultiEdit] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    itemsStore.loadItems();
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
          <div ref={containerElement} className="items__container">
            <div className="items__toolbar">
              <div className="items__toolbarLeft">
                {itemsStore.items.length} items
              </div>
              <div className="items__toolbarRight">
                <Tooltip
                  placement="topRight"
                  title={quickEdit ? "Hide quick edits" : "Show quick edits"}
                >
                  <EditOutlined
                    className={
                      quickEdit
                        ? "items__toolbarIcon items__toolbarIconActive"
                        : "items__toolbarIcon"
                    }
                    onClick={() => {
                      setQuickEdit(!quickEdit);
                    }}
                  />
                </Tooltip>
                <Tooltip
                  placement="topRight"
                  title={
                    multiEdit
                      ? "Deactivate multiselect edits"
                      : "Activate multiselect edits"
                  }
                >
                  <CopyOutlined
                    className={
                      multiEdit
                        ? "items__toolbarIcon items__toolbarIconActive"
                        : "items__toolbarIcon"
                    }
                    onClick={() => {
                      setMultiEdit(!multiEdit);
                    }}
                  />
                </Tooltip>
                <Tooltip
                  placement="topRight"
                  title={showFilter ? "Hide filter panel" : "Show filter panel"}
                >
                  <FilterOutlined
                    className={
                      showFilter
                        ? "items__toolbarIcon items__toolbarIconActive"
                        : "items__toolbarIcon"
                    }
                    onClick={() => {
                      setShowFilter(!showFilter);
                    }}
                  />
                </Tooltip>
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
