import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import "./Footer.less";

// TODO: finish translation

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
          <div>{t("footer.writeEmail")}</div>
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
          {" "}
          {t("footer.impressum")} | {t("footer.datenschutz")} |{" "}
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