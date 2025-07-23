import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { EmailSettings } from "./EmailSettings";
import { userStore } from "../../../stores/userStore/userStore.js";
import { updateSettings } from "../actions/updateSettings";

// Mock dependencies
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "profile.emailSettings": "Email Settings",
        "profile.settingSendEmailOnFriendRequest": "Send email on friend request",
        "profile.settingSendEmailWhenNewMessage": "Send email when new message",
        "profile.settingKeepMeInformedAboutRewaer": "Keep me informed about Rewaer"
      };
      return translations[key] || key;
    }
  })
}));

jest.mock("../../../stores/userStore/userStore.js", () => ({
  userStore: {
    emailSettings: {
      sendEmailFriendRequest: true,
      sendEmailNewMessage: false,
      sendEmailMarketing: true
    },
    profilSettings: {},
    setEmailSettings: jest.fn()
  }
}));

jest.mock("../actions/updateSettings", () => ({
  updateSettings: jest.fn()
}));

jest.mock("mobx-react", () => ({
  observer: (component: any) => component
}));

describe("EmailSettings", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the email settings section with correct structure", () => {
    render(<EmailSettings />);
    
    expect(screen.getByText("Email Settings")).toBeInTheDocument();
    expect(screen.getByText("Send email on friend request")).toBeInTheDocument();
    expect(screen.getByText("Send email when new message")).toBeInTheDocument();
    expect(screen.getByText("Keep me informed about Rewaer")).toBeInTheDocument();
  });

  it("renders switches with correct initial states", () => {
    render(<EmailSettings />);
    
    const switches = screen.getAllByRole("switch");
    expect(switches).toHaveLength(3);
    
    // Based on mock data: sendEmailFriendRequest: true, sendEmailNewMessage: false, sendEmailMarketing: true
    expect(switches[0]).toBeChecked(); // sendEmailFriendRequest
    expect(switches[1]).not.toBeChecked(); // sendEmailNewMessage
    expect(switches[2]).toBeChecked(); // sendEmailMarketing
  });

  it("toggles sendEmailFriendRequest setting when first switch is clicked", () => {
    render(<EmailSettings />);
    
    const switches = screen.getAllByRole("switch");
    const friendRequestSwitch = switches[0];
    
    act(() => {
      fireEvent.click(friendRequestSwitch);
    });
    
    expect(userStore.setEmailSettings).toHaveBeenCalledWith({
      sendEmailFriendRequest: false,
      sendEmailNewMessage: false,
      sendEmailMarketing: true
    });
    expect(updateSettings).toHaveBeenCalledWith(
      {
        sendEmailFriendRequest: false,
        sendEmailNewMessage: false,
        sendEmailMarketing: true
      },
      userStore.profilSettings
    );
  });

  it("toggles sendEmailNewMessage setting when second switch is clicked", () => {
    render(<EmailSettings />);
    
    const switches = screen.getAllByRole("switch");
    const newMessageSwitch = switches[1];
    
    act(() => {
      fireEvent.click(newMessageSwitch);
    });
    
    expect(userStore.setEmailSettings).toHaveBeenCalledWith({
      sendEmailFriendRequest: true,
      sendEmailNewMessage: true,
      sendEmailMarketing: true
    });
    expect(updateSettings).toHaveBeenCalledWith(
      {
        sendEmailFriendRequest: true,
        sendEmailNewMessage: true,
        sendEmailMarketing: true
      },
      userStore.profilSettings
    );
  });

  it("toggles sendEmailMarketing setting when third switch is clicked", () => {
    render(<EmailSettings />);
    
    const switches = screen.getAllByRole("switch");
    const marketingSwitch = switches[2];
    
    act(() => {
      fireEvent.click(marketingSwitch);
    });
    
    expect(userStore.setEmailSettings).toHaveBeenCalledWith({
      sendEmailFriendRequest: true,
      sendEmailNewMessage: false,
      sendEmailMarketing: false
    });
    expect(updateSettings).toHaveBeenCalledWith(
      {
        sendEmailFriendRequest: true,
        sendEmailNewMessage: false,
        sendEmailMarketing: false
      },
      userStore.profilSettings
    );
  });

  it("renders the correct divider with proper orientation", () => {
    render(<EmailSettings />);
    
    const divider = document.querySelector(".ant-divider");
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass("ant-divider-horizontal");
    expect(divider).toHaveClass("ant-divider-plain");
  });

  it("has proper CSS classes on container and settings", () => {
    render(<EmailSettings />);
    
    const container = document.querySelector(".EditSettings__subContainer");
    expect(container).toBeInTheDocument();
    
    const settings = document.querySelectorAll(".EditSettings__singleSetting");
    expect(settings).toHaveLength(3);
  });
});
