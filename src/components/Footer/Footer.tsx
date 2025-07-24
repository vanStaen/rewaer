import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import "./Footer.less";

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => { 
    const footerHeight = document.getElementById("footerContainer")?.offsetHeight;
    if (footerHeight) {
      const footerHeightTotal = footerHeight + 30; // 30px for padding
      document.documentElement.style.setProperty('--footerHeight', `${footerHeightTotal}px`);
    }
  }, []);
      
  return (
    <div className="footerContainer" id={"footerContainer"}>
      <div className="footerSubContainer1">
        <div className="col">
          <div className="title">{t("footer.contact")}</div>
          <div>{t("footer.reportBug")}</div>
          <div>{t("footer.contactUs")}</div>
        </div>
        <div className="col">
          <div className="title">{t("footer.links")}</div>
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
          <div className="title">{t("footer.newsletter")}</div>
          <span>{t("footer.stayInformed")}</span>
        </div>
      </div>

      <div className="footerSubContainer2">
        <div className="leftSide">©{new Date().getFullYear()} REWAER</div>
        <div className="rightSide">
          <div className="inlineBlock">{t("footer.impressum")}</div>{" "}|{" "} 
          <div className="inlineBlock">{t("footer.datenschutz")}</div>{" "}|{" "} 
          <div className="inlineBlock">{t("footer.termsOfService")}</div>{" "}|{" "} 
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