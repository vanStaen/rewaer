import React, { useEffect } from "react";
import { observer } from "mobx-react";

import { looksStore } from "../../looksStore";

import "./LookDetailReturnArrow.less";

export const LookDetailReturnArrow = observer(() => {
  const browserBackHandler = (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    looksStore.setSelectedLook(null);
  };

  useEffect(() => {
    const url = new URL(window.location);
    history.pushState({}, "", url);
    window.addEventListener("keydown", keydownEventHandler);
    window.addEventListener("popstate", browserBackHandler);
    return () => {
      window.removeEventListener("keydown", keydownEventHandler);
      window.removeEventListener("popstate", browserBackHandler);
    };
  }, []);

  return (
    <div className="lookdetail__backArrow">
      <Tooltip placement="bottomRight" title={t("looks.backToLooks")}>
        <ArrowLeftOutlined
          className="lookdetail__arrowIcon"
          onClick={() => {
            looksStore.setSelectedLook(null);
          }}
        />
      </Tooltip>
    </div>
  );
});
