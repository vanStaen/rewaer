import React, { useEffect } from "react";

import { useTranslation } from "react-i18next";
import { Edit } from "./Edit";
import { Filter } from "./Filter";

import { looksStore } from "../../pages/Looks/looksStore";
import { itemsStore } from "../../pages/Items/itemsStore";

import "./ToolBar.css";

const TRESHOLD_SCROLL_TOOL_BAR_COLOR_CHANGE = 80;

export const ToolBar = (props) => {
  const { t } = useTranslation();
  const { page } = props;

  const scrollhandler = () => {
    const elementForm = document.getElementById("toolbar");
    if (window.scrollY > TRESHOLD_SCROLL_TOOL_BAR_COLOR_CHANGE) {
      elementForm.style.color = "white";
      elementForm.style.backgroundColor = "rgba(181,200,190,.95)";
    } else {
      elementForm.style.color = "#aaa";
      elementForm.style.backgroundColor = "rgba(255,255,255,.95)";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollhandler);
    return () => {
      window.removeEventListener("scroll", scrollhandler);
    };
  }, [scrollhandler]);

  return (
    <>
      <div className="ToolBar__toolbar" id="toolbar">
        <div className="ToolBar__toolbarLeft">
          {props.total}&nbsp;
          {t(`menu.${page}`)}
          {page === "looks" && looksStore.numberOfPrivateLook > 0 && (
            <>
              {" "}
              | &nbsp;
              <span
                className="link"
                onClick={() => {
                  looksStore.setShowPrivateLooks(!looksStore.showPrivateLooks);
                }}
              >
                {looksStore.showPrivateLooks
                  ? t("looks.hidePrivateLooks")
                  : t("looks.showPrivateLooks")}
              </span>
            </>
          )}
          {page === "items" && itemsStore.numberOfPrivateItem > 0 && (
            <>
              {" "}
              |
              <span
                className="link"
                onClick={() => {
                  itemsStore.setShowPrivateItems(!itemsStore.showPrivateItems);
                }}
              >
                &nbsp;
                {itemsStore.showPrivateItems
                  ? t("items.hidePrivateItems")
                  : t("items.showPrivateItems")}
              </span>
            </>
          )}
        </div>
        <div className="ToolBar__toolbarRight">
          <Edit />
          <Filter />
        </div>
      </div>
    </>
  );
};
