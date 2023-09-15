import React, { useState } from "react";

import { LoginForm } from "../../components/LoginForm/LoginForm";
import { SignUpForm } from "../../components/SignUpForm/SignUpForm";
import { AlreadyMember } from "../../components/SignUpForm/AlreadyMember";
import { LanguageDropDown } from "../../components/LanguageDropDown/LanguageDropDown";

import "./Welcome.css";

export const Welcome = (props) => {
  const [showLogin, setShowLogin] = useState(props.showLogin ?? true);

  return (
    <div>
      <div className="welcome__alreadyMember">
        <AlreadyMember showLogin={showLogin} setShowLogin={setShowLogin} />
      </div>
      <div className="welcome__leftPanel">
        <LanguageDropDown />
      </div>
      <div className="welcome__rightPanel">
        {showLogin ? <LoginForm /> : <SignUpForm setShowLogin={setShowLogin} />}
      </div>
    </div>
  );
};
