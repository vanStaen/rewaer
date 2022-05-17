import React, { useEffect, useLayoutEffect } from "react";
import { DownloadOutlined, CheckOutlined } from "@ant-design/icons";

import "./AddToHomeScreen.css";

export const AddToHomeScreen = () => {
  let deferredPrompt;
  let a2hsButton;

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", installPromptHandler);
    return () => {
      window.removeEventListener("beforeinstallprompt", installPromptHandler);
    };
  }, []);

  useLayoutEffect(() => {
    a2hsButton = document.getElementById("a2hsButton");
  });

  const installPromptHandler = (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log(e);
    console.log(deferredPrompt);
    console.log("A2HS prompt was prevented and stored!");
    a2hsButton.style.display = "block";
  };

  const addToHomeScreenClickHandler = () => {
    console.log(deferredPrompt);
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
        a2hs__button.style.display = "none";
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
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
