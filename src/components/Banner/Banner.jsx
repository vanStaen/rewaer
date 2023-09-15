import React, { useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";

import "./Banner.css";

export const Banner = observer((props) => {
  const closeHandler = () => {
    const banner = document.getElementById(props.id);
    banner.style.maxHeight = 0;
    setTimeout(() => {
      banner.style.visibility = "hidden";
    }, 500);
  };

  useEffect(() => {
    const banner = document.getElementById(props.id);
    if (props.show) {
      banner.style.maxHeight = 0;
      banner.style.visibility = "hidden";
      setTimeout(() => {
        banner.style.visibility = "visible";
        banner.style.maxHeight = "100px";
      }, 2000);
    } else {
      banner.style.maxHeight = 0;
      setTimeout(() => {
        banner.style.visibility = "hidden";
      }, 500);
    }
  }, [props.id, props.show]);

  return (
    <div id={props.id} className="banner__container">
      <div className="banner__desc">{props.desc}</div>
      <div className="banner__close" onClick={closeHandler}>
        <CloseOutlined />
      </div>
    </div>
  );
});
