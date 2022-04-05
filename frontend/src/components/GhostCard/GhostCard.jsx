import React from "react";
import { Col } from "antd";

import "./GhostCard.css";

export const GhostCard = (props) => {
  let ghost = [];
  for (let i = 0; i < props.numberOfCards; i++) {
    ghost.push(
      <Col key={"ghost" + i}>
        <div
          className="ghostCard"
          style={{
            width: props.width,
            height: props.height,
            marginTop: props.margin[0],
            marginRight: props.margin[1],
            marginBottom: props.margin[2],
            marginLeft: props.margin[3],
          }}
        ></div>
      </Col>
    );
  }
  return ghost;
};
