import React, { useEffect } from "react";
import { Col, Row, Spin } from "antd";

import { looksStore } from "./looksStore";
import { MenuBar } from "../../components/MenuBar/MenuBar";
import LookCard from "./LookCard/LookCard";
import LookForm from "./LookForm/LookForm";

import "./Looks.css";

export const Looks = () => {
  useEffect(() => {
    looksStore.loadLooks();
  }, [looksStore.isOutOfDate]);

  const lookList = looksStore.looks.map((look) => {
    return (
      <Col key={look._id}>
        <LookCard
          look={looksStore.look}
          setIsOutOfDate={looksStore.setIsOutOfDate}
        />
      </Col>
    );
  });

  return (
    <div className="looks__main">
      <MenuBar />
      <div className="looks__container">
        {looksStore.error !== null ? (
          looksStore.error
        ) : looksStore.isLoading ? (
          <div className="looks__spinner">
            <Spin size="large" />
          </div>
        ) : (
          <Row justify={"space-around"}>
            <Col>
              <LookForm setIsOutOfDate={looksStore.setIsOutOfDate} />
            </Col>
            {lookList}
          </Row>
        )}
      </div>
    </div>
  );
};
