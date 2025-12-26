import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ProfileSettings } from "./ProfileSettings";
import { userStore } from "@stores/userStore/userStore.js";
import { updateSettings } from "../actions/updateSettings";

// Mock dependencies
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "profile.profileSettings": "Profile Settings",
        "profile.settingShowLastOnline": "Show last seen online",
        "profile.settingHideAccount": "Hide account to strangers",
        "profile.hideLooksToStrangers": "Hide looks to strangers",
        "profile.hideItemsToStrangers": "Hide items to strangers",
        "profile.settingShowLastName": "Show last name",
      };
      return translations[key] || key;
    },
  }),
}));

jest.mock("../../../stores/userStore/userStore.js", () => ({
  userStore: {
    profilSettings: {
      showLastSeenOnline: true,
      hideProfilToStrangers: false,
      hideLooksToStrangers: true,
      hideItemsToStrangers: false,
      showLastName: true,
    },
    emailSettings: {},
    setProfilSettings: jest.fn(),
  },
}));

jest.mock("../actions/updateSettings", () => ({
  updateSettings: jest.fn(),
}));

jest.mock("mobx-react", () => ({
  observer: (component: any) => component,
}));

describe("ProfileSettings", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the profile settings section with correct structure", () => {
    render(<ProfileSettings />);

    expect(screen.getByText("Profile Settings")).toBeInTheDocument();
    expect(screen.getByText("Show last seen online")).toBeInTheDocument();
    expect(screen.getByText("Hide account to strangers")).toBeInTheDocument();
    expect(screen.getByText("Hide looks to strangers")).toBeInTheDocument();
    expect(screen.getByText("Hide items to strangers")).toBeInTheDocument();
    expect(screen.getByText("Show last name")).toBeInTheDocument();
  });

  it("renders switches with correct initial states", () => {
    render(<ProfileSettings />);

    const switches = screen.getAllByRole("switch");
    expect(switches).toHaveLength(5);

    // Based on mock data
    expect(switches[0]).toBeChecked(); // showLastSeenOnline: true
    expect(switches[1]).not.toBeChecked(); // hideProfilToStrangers: false
    expect(switches[2]).toBeChecked(); // hideLooksToStrangers: true
    expect(switches[3]).not.toBeChecked(); // hideItemsToStrangers: false
    expect(switches[4]).toBeChecked(); // showLastName: true
  });

  it("renders spacer elements between settings", () => {
    render(<ProfileSettings />);

    const spacers = document.querySelectorAll(".EditSettings__Spacer");
    expect(spacers).toHaveLength(4);
  });

  it("toggles showLastSeenOnline setting when first switch is clicked", () => {
    render(<ProfileSettings />);

    const switches = screen.getAllByRole("switch");
    const lastSeenSwitch = switches[0];

    act(() => {
      fireEvent.click(lastSeenSwitch);
    });

    expect(userStore.setProfilSettings).toHaveBeenCalledWith({
      showLastSeenOnline: false,
      hideProfilToStrangers: false,
      hideLooksToStrangers: true,
      hideItemsToStrangers: false,
      showLastName: true,
    });
    expect(updateSettings).toHaveBeenCalledWith(userStore.emailSettings, {
      showLastSeenOnline: false,
      hideProfilToStrangers: false,
      hideLooksToStrangers: true,
      hideItemsToStrangers: false,
      showLastName: true,
    });
  });

  it("toggles hideProfilToStrangers setting when second switch is clicked", () => {
    render(<ProfileSettings />);

    const switches = screen.getAllByRole("switch");
    const hideProfilSwitch = switches[1];

    act(() => {
      fireEvent.click(hideProfilSwitch);
    });

    expect(userStore.setProfilSettings).toHaveBeenCalledWith({
      showLastSeenOnline: true,
      hideProfilToStrangers: true,
      hideLooksToStrangers: true,
      hideItemsToStrangers: false,
      showLastName: true,
    });
    expect(updateSettings).toHaveBeenCalledWith(userStore.emailSettings, {
      showLastSeenOnline: true,
      hideProfilToStrangers: true,
      hideLooksToStrangers: true,
      hideItemsToStrangers: false,
      showLastName: true,
    });
  });

  it("toggles hideLooksToStrangers setting when third switch is clicked", () => {
    render(<ProfileSettings />);

    const switches = screen.getAllByRole("switch");
    const hideLooksSwitch = switches[2];

    act(() => {
      fireEvent.click(hideLooksSwitch);
    });

    expect(userStore.setProfilSettings).toHaveBeenCalledWith({
      showLastSeenOnline: true,
      hideProfilToStrangers: false,
      hideLooksToStrangers: false,
      hideItemsToStrangers: false,
      showLastName: true,
    });
    expect(updateSettings).toHaveBeenCalledWith(userStore.emailSettings, {
      showLastSeenOnline: true,
      hideProfilToStrangers: false,
      hideLooksToStrangers: false,
      hideItemsToStrangers: false,
      showLastName: true,
    });
  });

  it("toggles hideItemsToStrangers setting when fourth switch is clicked", () => {
    render(<ProfileSettings />);

    const switches = screen.getAllByRole("switch");
    const hideItemsSwitch = switches[3];

    act(() => {
      fireEvent.click(hideItemsSwitch);
    });

    expect(userStore.setProfilSettings).toHaveBeenCalledWith({
      showLastSeenOnline: true,
      hideProfilToStrangers: false,
      hideLooksToStrangers: true,
      hideItemsToStrangers: true,
      showLastName: true,
    });
    expect(updateSettings).toHaveBeenCalledWith(userStore.emailSettings, {
      showLastSeenOnline: true,
      hideProfilToStrangers: false,
      hideLooksToStrangers: true,
      hideItemsToStrangers: true,
      showLastName: true,
    });
  });

  it("toggles showLastName setting when fifth switch is clicked", () => {
    render(<ProfileSettings />);

    const switches = screen.getAllByRole("switch");
    const showLastNameSwitch = switches[4];

    act(() => {
      fireEvent.click(showLastNameSwitch);
    });

    expect(userStore.setProfilSettings).toHaveBeenCalledWith({
      showLastSeenOnline: true,
      hideProfilToStrangers: false,
      hideLooksToStrangers: true,
      hideItemsToStrangers: false,
      showLastName: false,
    });
    expect(updateSettings).toHaveBeenCalledWith(userStore.emailSettings, {
      showLastSeenOnline: true,
      hideProfilToStrangers: false,
      hideLooksToStrangers: true,
      hideItemsToStrangers: false,
      showLastName: false,
    });
  });

  it("renders the correct divider with proper orientation", () => {
    render(<ProfileSettings />);

    const divider = document.querySelector(".ant-divider");
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass("ant-divider-horizontal");
    expect(divider).toHaveClass("ant-divider-plain");
  });

  it("has proper CSS classes on container and settings", () => {
    render(<ProfileSettings />);

    const container = document.querySelector(".EditSettings__subContainer");
    expect(container).toBeInTheDocument();

    const settings = document.querySelectorAll(".EditSettings__singleSetting");
    expect(settings).toHaveLength(5);
  });
});
