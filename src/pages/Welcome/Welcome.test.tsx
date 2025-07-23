import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Welcome } from "./Welcome";

jest.mock("../../components/LoginForm/LoginForm", () => ({
  LoginForm: () => <div>LoginForm</div>,
}));

jest.mock("../../components/SignUpForm/SignUpForm", () => ({
  SignUpForm: ({ setShowLogin }: any) => (
    <div>
      SignUpForm
      <button onClick={() => setShowLogin(true)}>Back to Login</button>
    </div>
  ),
}));

jest.mock("../../components/SignUpForm/AlreadyMember", () => ({
  AlreadyMember: ({ showLogin, setShowLogin }: any) => (
    <button onClick={() => setShowLogin(!showLogin)}>
      {showLogin ? "Go to Sign Up" : "Go to Login"}
    </button>
  ),
}));

jest.mock("../../components/LanguageDropDown/LanguageDropDown", () => ({
  LanguageDropDown: () => <div>LanguageDropDown</div>,
}));

jest.mock("../../helpers/dev/checkMobileTablet.js", () => ({
  isMobileCheck: jest.fn(() => false)
}));

describe("Welcome", () => {
  it("renders LoginForm by default", () => {
    render(<Welcome />);
    expect(screen.getByText("LoginForm")).toBeInTheDocument();
    expect(screen.getByText("Go to Sign Up")).toBeInTheDocument();
    expect(screen.getByText("LanguageDropDown")).toBeInTheDocument();
  });

  it("toggles to SignUpForm when AlreadyMember button is clicked", () => {
    render(<Welcome />);
    fireEvent.click(screen.getByText("Go to Sign Up"));
    expect(screen.getByText("SignUpForm")).toBeInTheDocument();
    expect(screen.getByText("Go to Login")).toBeInTheDocument();
  });

  it("toggles back to LoginForm from SignUpForm", () => {
    render(<Welcome />);
    fireEvent.click(screen.getByText("Go to Sign Up"));
    fireEvent.click(screen.getByText("Go to Login"));
    expect(screen.getByText("LoginForm")).toBeInTheDocument();
  });
});
