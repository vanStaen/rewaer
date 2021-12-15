import React, { useEffect, useState, useRef, useCallback } from "react";
import { observer } from "mobx-react";
import { Col, Row, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { MehOutlined } from "@ant-design/icons";

import { looksStore } from "./looksStore";
import { LookCard } from "./LookCard/LookCard";
import { LookForm } from "./LookForm/LookForm";
import { lookCategory } from "../../data/categories";
import { ToolBar } from "../../components/ToolBar/ToolBar";
import { GhostCard } from "../../components/GhostCard/GhostCard";
import { LookDetail } from "./LookDetail/LookDetail";

import "./Looks.css";

export const Looks = observer(() => {
  const containerElement = useRef(null);
  const [missingCardForFullRow, setMissingCardForFullRow] = useState(0);
  const [quickEdit, setQuickEdit] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedLook, setSelectedLook] = useState(null);
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
    setMissingCardForFullRow(missingCards === numberPerRow ? 0 : missingCards);
  }, [containerElement.current]);

  const lookList = looksStore.looks.map((look) => {
    return (
      <Col key={look._id}>
        <LookCard look={look} setSelectedLook={setSelectedLook} />
      </Col>
    );
  });

  return (
    <div className="looks__main">
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
      ) : selectedLook ? (
        <div ref={containerElement} className="looks__container">
          <LookDetail
            selectedLook={selectedLook}
            setSelectedLook={setSelectedLook}
          />
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
            <GhostCard numberOfCards={missingCardForFullRow} />
          </Row>
        </div>
      )}
    </div>
  );
});
