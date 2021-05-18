import React, { Component } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

import './Auth.css';

class AuthPage extends Component {
  render() {
    return (
      <div className="auth__main">
        <div className="auth__centeredlogin">
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default AuthPage;
