import React from "react";
import "./GhostCard.css";

export const GhostCard = (props) => {
  const margin = props.margin ? props.margin : [0, 0, 0, 0];
  const ghost = [];
  for (let i = 0; i < props.numberOfCards; i++) {
    ghost.push(
      <div
        key={"ghost" + i}
        className="ghostCard"
        style={{
          width: props.width,
          height: props.height,
          marginTop: margin[0],
          marginRight: margin[1],
          marginBottom: margin[2],
          marginLeft: margin[3],
        }}
      ></div>,
    );
  }
  return ghost;
};
