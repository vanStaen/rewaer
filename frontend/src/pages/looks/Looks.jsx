import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Col, Row, Spin } from "antd";

import { looksStore } from "./looksStore";
import { MenuBar } from "../../components/MenuBar/MenuBar";
import { LookCard } from "./LookCard/LookCard";
import { LookForm } from "./LookForm/LookForm";

import "./Looks.css";

export const Looks = observer(() => {
  useEffect(() => {
    looksStore.loadLooks();
  }, [looksStore.isOutOfDate]);

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
        looksStore.error
      ) : looksStore.isLoading ? (
        <div className="looks__spinner">
          <Spin size="large" />
        </div>
      ) : (
        <div className="looks__container">
          <Row justify={"space-around"}>
            <Col>
              <LookForm />
            </Col>
            {lookList}
          </Row>
        </div>
      )}
    </div>
  );
});
