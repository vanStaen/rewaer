import React from "react";
import { Tooltip } from "antd";
import {
  BulbOutlined,
  FormatPainterOutlined,
  RedoOutlined,
  VerticalAlignMiddleOutlined,
} from "@ant-design/icons";

import { pictureRotate } from "./pictureRotate";

import "./LookImageEditBar.css";

export const LookImageEditBar = (props) => {
  const rotate = () => {
    /* const image = document.getElementById(`selected_look_picture_${props.id}`);
    image.style.transform = "rotate(90deg)"; */
  };

  return (
    <div className="imageEditBar__imageEditBar">
      <Tooltip title="Change luminosity">
        <BulbOutlined className="pointerCursor" />
      </Tooltip>
      &nbsp;
      <Tooltip title="Change white balance">
        <FormatPainterOutlined className="pointerCursor" />
      </Tooltip>
      &nbsp;
      <Tooltip title="Rotate">
        <RedoOutlined className="pointerCursor" onClick={rotate} />
      </Tooltip>
      &nbsp;
      <Tooltip title="Flip">
        <VerticalAlignMiddleOutlined className="pointerCursor imageEditBar__rotate90" />
      </Tooltip>
    </div>
  );
};
