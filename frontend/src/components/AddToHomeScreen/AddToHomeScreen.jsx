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
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    a2hs__button.style.display = "block";
  };

  const addToHomeScreenClickHandler = () => {
    // hide our user interface that shows our A2HS button
    a2hs__button.style.display = "none";
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
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
