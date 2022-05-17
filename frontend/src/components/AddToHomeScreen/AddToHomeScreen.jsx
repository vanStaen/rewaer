import React, { useEffect } from "react";

import "./AddToHomeScreen.css";

export const AddToHomeScreen = (props) => {
  let deferredPrompt;

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", installPromptHandler);
    return () => {
      window.removeEventListener("beforeinstallprompt", installPromptHandler);
    };
  }, []);

  const installPromptHandler = (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log("A2HS prompt was prevented and stored!");
    a2hs__button.style.display = "block";
  };

  const addToHomeScreenClickHandler = () => {
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
    <div className="a2hs__button" onClick={addToHomeScreenClickHandler}>
      Add to home screen
    </div>
  );
};
