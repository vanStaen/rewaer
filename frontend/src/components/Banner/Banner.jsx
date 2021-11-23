import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";

import "./Banner.css";

export const Banner = observer((props) => {
  const closeHandler = () => {
    const banner = document.getElementById(props.id);
    banner.style.visibility = "hidden";
    banner.style.height = 0;
  };

  return (
    <div id={props.id} className="banner__container">
      <div className="banner__desc">{props.desc}</div>
      <div className="banner__close" onClick={closeHandler}>
        <CloseOutlined />
      </div>
    </div>
  );
});
