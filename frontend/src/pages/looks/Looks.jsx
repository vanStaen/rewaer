import React, { useEffect, useState, useRef, useCallback } from "react";
import { observer } from "mobx-react";
import { Col, Row, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { MehOutlined } from "@ant-design/icons";

import { looksStore } from "./looksStore";
import { authStore } from "../../stores/authStore/authStore";
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
  const [selectedLook, setSelectedLook] = useState(null);
  const originalScrollPosition = useRef(null);
  const lastKnownScrollPosition = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    looksStore.loadLooks();
    userStore.setMenuSelected("looks");
    userStore.profilSettings &&
      looksStore.setShowPrivate(userStore.profilSettings.displayPrivate);
  }, [looksStore.isOutOfDate, userStore.profilSettings]);

  useEffect(() => {
    if (authStore.hasAccess === false) {
      console.log("authStore.hasAccess:", authStore.hasAccess);
      window.location.href = "../";
    }
  }, [authStore.hasAccess]);

  useEffect(() => {
    calculateMissingCardsForFullRow();
  }, [
    containerElement.current,
    missingCardForFullRow,
    calculateMissingCardsForFullRow,
    looksStore.numberOfPrivateLook,
    looksStore.numberOfArchivedLook,
    looksStore.showPrivate,
    looksStore.looks,
    userStore.profilSettings,
  ]);

  useEffect(() => {
    if (!selectedLook) {
      window.scroll({
        top: originalScrollPosition.current,
        left: 0,
        behavior: "smooth",
      });
    } else {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [selectedLook]);

  useEffect(() => {
    window.addEventListener("resize", calculateMissingCardsForFullRow);
    window.addEventListener("scroll", scrollEventHandler);
    window.addEventListener("popstate", browserBackHandler);
    return () => {
      window.removeEventListener("resize", calculateMissingCardsForFullRow);
      window.removeEventListener("scroll", scrollEventHandler);
      window.removeEventListener("popstate", browserBackHandler);
    };
  }, []);

  const showDetailView = (id) => {
    setSelectedLook(id);
    originalScrollPosition.current = lastKnownScrollPosition.current;
  };

  const hideDetailView = () => {
    setSelectedLook(null);
  };

  const scrollEventHandler = () => {
    lastKnownScrollPosition.current = window.scrollY;
  };

  const browserBackHandler = (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    history.go(1);
    setSelectedLook(null);
  };

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
    const numberLooks = looksStore.showPrivate
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
  }, [
    containerElement.current,
    looksStore.showPrivate,
    userStore.profilSettings,
  ]);

  const lookList = looksStore.looks.map((look) => {
    if (!look.private || looksStore.showPrivate) {
      if (!look.active && !userStore.profilSettings?.displayArchived) {
        return null;
      } else {
        return (
          <Col key={look._id}>
            <LookCard look={look} showDetailView={showDetailView} />
          </Col>
        );
      }
    }
    return null;
  });

  const totalLooks = () => {
    if (userStore.profilSettings.displayArchived) {
      if (looksStore.showPrivate) {
        return looksStore.looks.length;
      } else {
        return looksStore.looks.length - looksStore.numberOfPrivateLook;
      }
    } else {
      if (looksStore.showPrivate) {
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
            hideDetailView={hideDetailView}
          />
        </div>
      ) : (
        <div ref={containerElement} className="looks__container">
          <div className="looks__toolbar">
            <div className="looks__toolbarLeft">
              {totalLooks()}&nbsp;
              {t("menu.looks")}
              {looksStore.numberOfPrivateLook > 0 && (
                <>
                  {" "}
                  | &nbsp;
                  <span
                    className="link"
                    onClick={() => {
                      looksStore.setShowPrivate(!looksStore.showPrivate);
                    }}
                  >
                    {looksStore.showPrivate
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
