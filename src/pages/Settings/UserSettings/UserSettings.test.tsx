import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { UserSettings } from "./UserSettings";
import { resetPasswordLink } from "../actions/resetPasswordLink";

// Mock dependencies
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "profile.accountSettings": "Account Settings",
        "profile.triggerPasswordReset": "Reset your password",
        "main.clickHere": "Click here",
      };
      return translations[key] || key;
    },
  }),
}));

jest.mock("./UserNameUpdate/UserNameUpdate.tsx", () => ({
  UserNameUpdate: () => (
    <div data-testid="username-update">Username Update Component</div>
  ),
}));

jest.mock("../actions/resetPasswordLink", () => ({
  resetPasswordLink: jest.fn(() => Promise.resolve()),
}));

jest.mock("mobx-react", () => ({
  observer: (component: any) => component,
}));

describe("UserSettings", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the user settings section with correct structure", () => {
    render(<UserSettings />);

    expect(screen.getByText("Account Settings")).toBeInTheDocument();
    expect(screen.getByText("Reset your password")).toBeInTheDocument();
    expect(screen.getByText("Click here")).toBeInTheDocument();
  });

  it("renders the divider with correct orientation and style", () => {
    render(<UserSettings />);

    const divider = document.querySelector(".ant-divider");
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass("ant-divider-horizontal");
    expect(divider).toHaveClass("ant-divider-plain");
  });

  it("includes the UserNameUpdate component", () => {
    render(<UserSettings />);

    expect(screen.getByTestId("username-update")).toBeInTheDocument();
  });

  it("calls resetPasswordLink when reset password link is clicked", () => {
    render(<UserSettings />);

    const resetLink = screen.getByText("Click here");

    act(() => {
      fireEvent.click(resetLink);
    });

    expect(resetPasswordLink).toHaveBeenCalledTimes(1);
  });

  it("has proper CSS classes on elements", () => {
    render(<UserSettings />);

    const container = document.querySelector(".EditSettings__subContainer");
    expect(container).toBeInTheDocument();

    const singleSetting = document.querySelector(
      ".EditSettings__singleSetting",
    );
    expect(singleSetting).toBeInTheDocument();

    const resetLink = document.querySelector(".EditSettings__link");
    expect(resetLink).toBeInTheDocument();
    expect(resetLink).toHaveTextContent("Click here");
  });

  it("renders the reset password text and link in correct order", () => {
    render(<UserSettings />);

    const settingElement = document.querySelector(
      ".EditSettings__singleSetting",
    );
    expect(settingElement).toHaveTextContent("Reset your password Click here");
  });

  it("reset password link has correct styling class", () => {
    render(<UserSettings />);

    const resetLink = screen.getByText("Click here");
    expect(resetLink).toHaveClass("EditSettings__link");
    expect(resetLink.tagName).toBe("SPAN");
  });
});
