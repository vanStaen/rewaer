import React from "react";
import { Col } from "antd";

import "./GhostCard.css";

export const GhostCard = (props) => {
  let ghost = [];
  for (let i = 0; i < props.numberOfCards; i++) {
    ghost.push(
      <Col key={"ghost" + i}>
        <div className="ghostCard"
          style={{
            width: props.width,
            height: props.height,
          }}></div>
      </Col>
    );
  }
  return ghost;
};
