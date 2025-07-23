import React from "react";
import { useTranslation } from "react-i18next";

export interface AlreadyMemberProps {
  showLogin: boolean;
  setShowLogin: (show: boolean) => void;
}

export const AlreadyMember: React.FC<AlreadyMemberProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div style={{ paddingTop: "15px" }}>
      {props.showLogin ? (
        <>
          <div className="inlineBlock">{t("login.newHere")}?</div>
          <div className="inlineBlock">
            &nbsp;
            <span
              className="link"
              onClick={() => props.setShowLogin(!props.showLogin)}
            >
              {t("login.signUp")}
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="inlineBlock">{t("login.member")}?</div>
          <div className="inlineBlock">
            &nbsp;
            <span
              className="link"
              onClick={() => props.setShowLogin(!props.showLogin)}
            >
              {t("login.login")}
            </span>
          </div>
        </>
      )}
    </div>
  );
};
