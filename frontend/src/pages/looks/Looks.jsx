import React, { useEffect, useState, useRef, useCallback } from "react";
import { observer } from "mobx-react";
import { Col, Row, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { MehOutlined } from "@ant-design/icons";

import { looksStore } from "./looksStore";
import { MenuBar } from "../../components/MenuBar/MenuBar";
import { LookCard } from "./LookCard/LookCard";
import { LookForm } from "./LookForm/LookForm";
import { lookCategory } from "../../data/categories";
import { ToolBar } from "../../components/ToolBar/ToolBar";
import { GhostCards } from "../../components/Cards/GhostCards/GhostCards";

import "./Looks.css";

export const Looks = observer(() => {
  const containerElement = useRef(null);
  const [missingCardForFullRow, setMissingCardForFullRow] = useState(0);
  const [quickEdit, setQuickEdit] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    looksStore.loadLooks();
    console.log(lookCategory);
    calculateMissingCardsForFullRow();
    window.addEventListener("resize", calculateMissingCardsForFullRow);
    return () => {
      window.removeEventListener("resize", calculateMissingCardsForFullRow);
    };
  }, [
    looksStore.isOutOfDate,
    containerElement.current,
    missingCardForFullRow,
    calculateMissingCardsForFullRow,
  ]);

  const calculateMissingCardsForFullRow = useCallback(() => {
    const containerWidth =
      containerElement.current === null
        ? 0
        : containerElement.current.offsetWidth;
    const cardWidth = 240;
    const numberPerRow = Math.floor(containerWidth / cardWidth, 1);
    const numberLooks = looksStore.looks.length + 1; // +1 for the form
    const numberFullRow = Math.floor(numberLooks / numberPerRow);
    const missingCards =
      numberPerRow - (numberLooks - numberFullRow * numberPerRow);
    setMissingCardForFullRow(missingCards === numberFullRow ? 0 : missingCards);
  }, [containerElement.current]);

  const lookList = looksStore.looks.map((look) => {
    return (
      <Col key={look._id}>
        <LookCard look={look} />
      </Col>
    );
  });

  return (
    <div className="looks__main">
      <MenuBar />
      {looksStore.error !== null ? (
        <div className="spinner">
          {looksStore.error}
          <br />
          <br />
          <MehOutlined style={{ fontSize: "120px", color: "#b6c8bf" }} />
        </div>
      ) : looksStore.isLoading ? (
        <div className="spinner">
          <Spin size="large" />
        </div>
      ) : (
        <div ref={containerElement} className="looks__container">
          <div className="looks__toolbar">
            <div className="looks__toolbarLeft">
              {looksStore.looks.length} {t("menu.looks")}
            </div>
            <div className="looks__toolbarRight">
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
              <LookForm />
            </Col>
            {lookList}
            <GhostCards numberOfCards={missingCardForFullRow} />
          </Row>
        </div>
      )}
    </div>
  );
});
