import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="footerSubContainer">
        Contact | Impressum | About | Newsletter | Cookie
        <div>Social Media Logos</div>
        <div>Copyright ©{new Date().getFullYear()} </div>
      </div>
    </div>
  );
};
