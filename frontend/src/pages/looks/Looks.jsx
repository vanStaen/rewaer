import React, { useEffect, useState, useRef, useCallback } from "react";
import { observer } from "mobx-react";
import { Col, Row, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { MehOutlined } from "@ant-design/icons";

import { looksStore } from "./looksStore";
import { userStore } from "../../stores/userStore/userStore";
import { LookCard } from "./LookCard/LookCard";
import { LookForm } from "./LookForm/LookForm";
import { ToolBar } from "../../components/ToolBar/ToolBar";
import { GhostCard } from "../../components/GhostCard/GhostCard";
import { LookDetail } from "./LookDetail/LookDetail";

import "./Looks.css";

export const Looks = observer(() => {
  const containerElement = useRef(null);
  const [missingCardForFullRow, setMissingCardForFullRow] = useState(0);
  const [quickEdit, setQuickEdit] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showPrivate, setShowPrivate] = useState(false);
  const [selectedLook, setSelectedLook] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    looksStore.loadLooks();
    userStore.setMenuSelected("looks");
    userStore.profilSettings &&
      setShowPrivate(userStore.profilSettings.displayPrivate);
  }, [looksStore.isOutOfDate, userStore.profilSettings]);

  useEffect(() => {
    calculateMissingCardsForFullRow();
    window.addEventListener("resize", calculateMissingCardsForFullRow);
    return () => {
      window.removeEventListener("resize", calculateMissingCardsForFullRow);
    };
  }, [
    containerElement.current,
    missingCardForFullRow,
    calculateMissingCardsForFullRow,
    looksStore.numberOfPrivateLook,
    looksStore.numberOfArchivedLook,
    userStore.profilSettings,
    showPrivate,
  ]);

  const numberOfPrivateLooks = looksStore.looks.filter(
    (look) => look.private
  ).length;

  const calculateMissingCardsForFullRow = useCallback(() => {
    const displayArchived = userStore.profilSettings
      ? userStore.profilSettings.displayArchived
      : false;
    const containerWidth =
      containerElement.current === null
        ? 0
        : containerElement.current.offsetWidth;
    const cardWidth = 240;
    const numberPerRow = Math.floor(containerWidth / cardWidth, 1);
    const numberLooks = showPrivate
      ? displayArchived
        ? looksStore.looks.length + 1
        : looksStore.looks.length + 1 - looksStore.numberOfArchivedLook
      : displayArchived
      ? looksStore.looks.length + 1 - looksStore.numberOfPrivateLook
      : looksStore.looks.length +
        1 -
        looksStore.numberOfPrivateLook -
        looksStore.numberOfArchivedLook;
    const numberFullRow = Math.floor(numberLooks / numberPerRow);
    const missingCards =
      numberPerRow - (numberLooks - numberFullRow * numberPerRow);
    setMissingCardForFullRow(missingCards === numberPerRow ? 0 : missingCards);
  }, [containerElement.current, showPrivate, userStore.profilSettings]);

  const lookList = looksStore.looks.map((look) => {
    if (!look.private || showPrivate) {
      if (!look.active && !userStore.profilSettings?.displayArchived) {
        return null;
      } else {
        return (
          <Col key={look._id}>
            <LookCard look={look} setSelectedLook={setSelectedLook} />
          </Col>
        );
      }
    }
    return null;
  });

  const totalLooks = () => {
    if (userStore.profilSettings.displayArchived) {
      if (showPrivate) {
        return looksStore.looks.length;
      } else {
        return looksStore.looks.length - looksStore.numberOfPrivateLook;
      }
    } else {
      if (showPrivate) {
        return looksStore.looks.length - looksStore.numberOfArchivedLook;
      } else {
        return (
          looksStore.looks.length -
          looksStore.numberOfArchivedLook -
          looksStore.numberOfPrivateLook
        );
      }
    }
  };

  return (
    <div className="looks__main">
      {looksStore.error !== null ? (
        <div className="spinner">
          {looksStore.error}
          <br />
          <br />
          <MehOutlined style={{ fontSize: "120px", color: "#b6c8bf" }} />
        </div>
      ) : looksStore.isLoading || userStore.isLoading ? (
        <div className="spinner">
          <Spin size="large" />
        </div>
      ) : selectedLook ? (
        <div className="looks__container">
          <LookDetail
            selectedLook={selectedLook}
            setSelectedLook={setSelectedLook}
          />
        </div>
      ) : (
        <div ref={containerElement} className="looks__container">
          <div className="looks__toolbar">
            <div className="looks__toolbarLeft">
              {totalLooks()}&nbsp;
              {t("menu.looks")}
              {numberOfPrivateLooks > 0 && (
                <>
                  {" "}
                  | &nbsp;
                  <span
                    className="link"
                    onClick={() => {
                      setShowPrivate(!showPrivate);
                    }}
                  >
                    {showPrivate
                      ? t("looks.hidePrivateLooks")
                      : t("looks.showPrivateLooks")}
                  </span>
                </>
              )}
            </div>
            <div className="looks__toolbarRight">
              <ToolBar
                quickEdit={quickEdit}
                setQuickEdit={setQuickEdit}
                showFilter={showFilter}
                setShowFilter={setShowFilter}
                allowEdit={true}
              />
            </div>
          </div>
          <Row justify={"space-around"}>
            <Col>
              <LookForm />
            </Col>
            {lookList}
            <GhostCard
              numberOfCards={missingCardForFullRow}
              width="240px"
              height="385px"
            />
          </Row>
        </div>
      )}
    </div>
  );
});
