import React, { useEffect, useLayoutEffect } from "react";
import { DownloadOutlined, CheckOutlined } from "@ant-design/icons";

import "./AddToHomeScreen.less";

export const AddToHomeScreen: React.FC = () => {
  let deferredPrompt: any;
  let a2hsButton: HTMLElement | null;

  const installPromptHandler = (e: any) => {
    e.preventDefault();
    deferredPrompt = e;
    if (a2hsButton) {
      a2hsButton.style.display = "block";
    }
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", installPromptHandler);
    return () => {
      window.removeEventListener("beforeinstallprompt", installPromptHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    a2hsButton = document.getElementById("a2hsButton");
  });

  const addToHomeScreenClickHandler = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          if (a2hsButton) a2hsButton.style.display = "none";
          deferredPrompt = null;
        } else {
          // eslint-disable-next-line no-console
          console.log("User dismissed the A2HS prompt");
          if (a2hsButton) a2hsButton.style.display = "block";
        }
      });
    }
  };

  return (
    <>
      {window.matchMedia("(display-mode: standalone)").matches ? (
        <div className="a2hs__buttonDisabled" id="a2hsButton">
          <CheckOutlined /> App installed
        </div>
      ) : (
        <div
          className="a2hs__button"
          id="a2hsButton"
          onClick={addToHomeScreenClickHandler}
        >
          <DownloadOutlined /> Download App
        </div>
      )}
    </>
  );
};
