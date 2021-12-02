import React from "react";
import { Col } from "antd";

import "./GhostCards.css";

export const GhostCards = (props) => {
  let ghost = [];
  for (let i = 0; i < props.numberOfCards; i++) {
    ghost.push(
      <Col key={"ghost" + i}>
        <div className="ghostCard"></div>
      </Col>
    );
  }
  return ghost;
};
