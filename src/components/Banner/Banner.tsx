import React, { useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";

import "./Banner.less";

export interface BannerProps {
  id: string;
  desc: React.ReactNode;
  show: boolean;
}

export const Banner: React.FC<BannerProps> = observer((props) => {
  const closeHandler = () => {
    const banner = document.getElementById(props.id);
    if (banner) {
      banner.style.maxHeight = "0";
      setTimeout(() => {
        banner.style.visibility = "hidden";
      }, 500);
    }
  };

  useEffect(() => {
    const banner = document.getElementById(props.id);
    if (!banner) return;
    if (props.show) {
      banner.style.maxHeight = "0";
      banner.style.visibility = "hidden";
      setTimeout(() => {
        banner.style.visibility = "visible";
        banner.style.maxHeight = "100px";
      }, 2000);
    } else {
      banner.style.maxHeight = "0";
      setTimeout(() => {
        banner.style.visibility = "hidden";
      }, 500);
    }
  }, [props.id, props.show]);

  return (
    <div id={props.id} className="banner__container">
      <div className="banner__desc">{props.desc}</div>
      <div className="banner__close" data-testid="closeButton" onClick={closeHandler}>
        <CloseOutlined />
      </div>
    </div>
  );
});
