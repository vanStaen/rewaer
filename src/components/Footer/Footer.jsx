import React, { useEffect } from "react";
import "./Footer.css";

export const Footer = () => {

  let deferredPrompt;

  const addAppClickHandler = () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  }

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      console.log("Stash the event so it can be triggered later")
      deferredPrompt = e;
    });
  }, [])


  return (
    <div className="footerContainer">
      <div className="footerSubContainer">
        Contact | Impressum | About | Newsletter | Cookie
        <div>Social Media Logos</div>
        <div>Copyright ©{new Date().getFullYear()} </div>
        <div className="footerAddAsApp" onClick={addAppClickHandler}>Add app to home screen</div>
      </div>
    </div>
  );
};
