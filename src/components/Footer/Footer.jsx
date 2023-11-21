import React from "react";
import "./Footer.less";

export const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="footerSubContainer1">
        <div className="col">
          <div className="title">About</div>
          <div>Our Project</div>
          <div>About us</div>
        </div>
        <div className="col">
          <div className="title">Contact</div>
          <div>Report a Bug</div>
          <div>Technical Help</div>
          <div>Write us an email</div>
        </div>
        <div className="col">
          <div className="title">Socials</div>
        </div>
        <div className="col">
          <div className="title">Newsletter</div>
          <span>Get informed about all changes of Rewear App.</span>
        </div>
      </div>
      <div className="footerSubContainer2">
        <div className="leftSide">©{new Date().getFullYear()} REWAER</div>
        <div className="rightSide"> Impressum | Datenschutz & Cookie</div>
      </div>
    </div>
  );
};
