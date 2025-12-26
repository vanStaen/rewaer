import React, { useState } from "react";

import { LoginForm } from "@components/LoginForm/LoginForm";
import { SignUpForm } from "@components/SignUpForm/SignUpForm";
import { AlreadyMember } from "@components/SignUpForm/AlreadyMember";
import { LanguageDropDown } from "@components/LanguageDropDown/LanguageDropDown";
import { isMobileCheck } from "@helpers/dev/checkMobileTablet.js";

import clothesImage from "@img/clothes.jpg";

import "./Welcome.less";

export interface WelcomeProps {
  showLogin?: boolean;
}

export const Welcome: React.FC<WelcomeProps> = (props) => {
  const [showLogin, setShowLogin] = useState<boolean>(props.showLogin ?? true);
  const isMobile = isMobileCheck();

  return (
    <div className="welcome__container">
      <div className="welcome__alreadyMember">
        <AlreadyMember showLogin={showLogin} setShowLogin={setShowLogin} />
      </div>
      <div
        className="welcome__leftPanel"
        style={{ backgroundImage: `url(${clothesImage})` }}
      >
        <LanguageDropDown />
      </div>
      <div
        className="welcome__rightPanel"
        style={{ backgroundImage: isMobile ? `url(${clothesImage})` : "none" }}
      >
        {showLogin ? <LoginForm /> : <SignUpForm setShowLogin={setShowLogin} />}
      </div>
    </div>
  );
};
