import React, { useEffect, useState, useRef, useCallback } from "react";
import { observer } from "mobx-react";
import { Col, Row, Spin, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { EditOutlined, FilterOutlined } from "@ant-design/icons";
import { MehOutlined } from "@ant-design/icons";

import { looksStore } from "./looksStore";
import { MenuBar } from "../../components/MenuBar/MenuBar";
import { LookCard } from "./LookCard/LookCard";
import { LookForm } from "./LookForm/LookForm";
import { lookCategory } from "../../data/categories";

import "./Looks.css";

export const Looks = observer(() => {
  const containerElement = useRef(null);
  const missingCardForFullRow = useRef(0);
  const [quickEdit, setQuickEdit] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    looksStore.loadLooks();
    console.log(lookCategory);
    calculateMissingCardsForFullRow();
  }, [
    looksStore.isOutOfDate,
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
    const numberLooks = looksStore.looks.length + 1; // +1 for the form
    const numberFullRow = Math.floor(numberLooks / numberPerRow);
    missingCardForFullRow.current =
      numberPerRow - (numberLooks - numberFullRow * numberPerRow);
  }, [containerElement.current]);

  const lookList = looksStore.looks.map((look) => {
    return (
      <Col key={look._id}>
        <LookCard look={look} />
      </Col>
    );
  });

  const GhostCards = () => {
    let ghost = [];
    for (let i = 0; i < missingCardForFullRow.current; i++) {
      ghost.push(
        <Col key={"ghost" + i}>
          <div className="looks__ghostCard"></div>
        </Col>
      );
    }
    return ghost;
  };

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
                  {looksStore.looks.length} looks
            </div>
                <div className="looks__toolbarRight">
                  <Tooltip
                    placement="topRight"
                    title={
                      quickEdit ? t("main.hideQuickEdit") : t("main.showQuickEdit")
                    }
                  >
                    <EditOutlined
                      className={
                        quickEdit
                          ? "looks__toolbarIcon looks__toolbarIconActive"
                          : "looks__toolbarIcon"
                      }
                      onClick={() => {
                        setQuickEdit(!quickEdit);
                      }}
                    />
                  </Tooltip>
                  <Tooltip
                    placement="topRight"
                    title={showFilter ? t("main.hideFilter") : t("main.showFilter")}
                  >
                    <FilterOutlined
                      className={
                        showFilter
                          ? "looks__toolbarIcon looks__toolbarIconActive"
                          : "looks__toolbarIcon"
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
                  <LookForm />
                </Col>
                {lookList}
                <GhostCards />
              </Row>
            </div>
          )}
    </div>
  );
});
