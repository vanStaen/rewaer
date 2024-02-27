import React from "react";

import "./Footer.less";

export const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="footerSubContainer1">
        <div className="col">
          <div className="title">Contact</div>
          <div>Report a Bug</div>
          <div>Technical Help</div>
          <div>Write us an email</div>
        </div>
        <div className="col">
          <div className="title">Links</div>
          <div className="link">
            <a
              href="https://www.fashionrevolution.org/"
              target="_blank"
              rel="noreferrer"
            >
              Fashion revolution
            </a>
          </div>
          <div className="link">
            <a
              href="https://wearme30times.com/"
              target="_blank"
              rel="noreferrer"
            >
              Wear me 30 times
            </a>
          </div>
        </div>
        <div className="col">
          <div className="title">Newsletter</div>
          <span>Stay informed about Rewear</span>
        </div>
      </div>

      <div className="footerSubContainer2">
        <div className="leftSide">©{new Date().getFullYear()} REWAER</div>
        <div className="rightSide">
           Impressum | Datenschutz |{" "}
          <a
            href="https://www.clementvanstaen.com"
            target="_blank"
            rel="noreferrer"
          >
            CvS
          </a>
        </div>
      </div>
    </div>
  );
};
