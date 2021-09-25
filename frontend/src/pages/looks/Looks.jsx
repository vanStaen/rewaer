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

  const lookList = () => {
    if (looksStore.looks) {
      looksStore.looks.map((look) => {
        return (
          <Col key={look._id}>
            <LookCard />
          </Col>
        );
      });
    } else {
      return null;
    }
  };

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
              <LookForm />
            </Col>
            {lookList}
          </Row>
        )}
      </div>
    </div>
  );
});
