import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { EditSettings } from "../Settings/EditSettings";
import { authStore } from "../../stores/authStore/authStore.js";
import { userStore } from "../../stores/userStore/userStore.js";

// Mock dependencies
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "profile.editYourSetting": "Edit Your Settings",
        "profile.accountSettings": "Account Settings",
        "profile.displaySettings": "Display Settings",
        "profile.profileSettings": "Profile Settings",
        "profile.emailSettings": "Email Settings",
        "profile.dangerZone": "Danger Zone"
      };
      return translations[key] || key;
    }
  })
}));

jest.mock("../../helpers/dev/checkMobileTablet.js", () => ({
  isMobileCheck: jest.fn(() => false)
}));

jest.mock("../../stores/authStore/authStore.js", () => ({
  authStore: {
    hasAccess: true
  }
}));

jest.mock("../../stores/userStore/userStore.js", () => ({
  userStore: {
    isLoading: false
  }
}));

jest.mock("./UserSettings/UserSettings.tsx", () => ({
  UserSettings: () => <div data-testid="user-settings">User Settings Component</div>
}));

jest.mock("./DisplaySettings/DisplaySettings.tsx", () => ({
  DisplaySettings: () => <div data-testid="display-settings">Display Settings Component</div>
}));

jest.mock("./EmailSettings/EmailSettings.tsx", () => ({
  EmailSettings: () => <div data-testid="email-settings">Email Settings Component</div>
}));

jest.mock("./ProfileSettings/ProfileSettings.tsx", () => ({
  ProfileSettings: () => <div data-testid="profile-settings">Profile Settings Component</div>
}));

jest.mock("./DangerZone/DangerZone.tsx", () => ({
  DangerZone: () => <div data-testid="danger-zone">Danger Zone Component</div>
}));

jest.mock("mobx-react", () => ({
  observer: (component: any) => component
}));

describe("EditSettings", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset store states
    authStore.hasAccess = true;
    userStore.isLoading = false;
  });

  it("renders the edit settings page with correct structure", () => {
    authStore.hasAccess = true;
    
    render(<EditSettings />);
    
    expect(screen.getByText("Edit Your Settings")).toBeInTheDocument();
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(screen.getByTestId("user-settings")).toBeInTheDocument();
  });

  it("navigates to home when user has no access", () => {
    authStore.hasAccess = false;
    
    render(<EditSettings />);
    
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("shows loading spinner when userStore is loading", () => {
    authStore.hasAccess = true;
    userStore.isLoading = true;
    
    render(<EditSettings />);

    const spinner = document.querySelector(".spinner");
    expect(spinner).toBeInTheDocument();
    expect(screen.queryByText("Edit Your Settings")).not.toBeInTheDocument();
  });

  it("renders segmented control with all options", () => {
    authStore.hasAccess = true;
    
    render(<EditSettings />);
    
    expect(screen.getByText("Account Settings")).toBeInTheDocument();
    expect(screen.getByText("Display Settings")).toBeInTheDocument();
    expect(screen.getByText("Profile Settings")).toBeInTheDocument();
    expect(screen.getByText("Email Settings")).toBeInTheDocument();
    expect(screen.getByText("Danger Zone")).toBeInTheDocument();
  });

  it("renders UserSettings component by default", () => {
    authStore.hasAccess = true;
    
    render(<EditSettings />);
    
    expect(screen.getByTestId("user-settings")).toBeInTheDocument();
    expect(screen.queryByTestId("display-settings")).not.toBeInTheDocument();
  });

  it("switches to DisplaySettings when option 2 is selected", () => {
    authStore.hasAccess = true;
    
    render(<EditSettings />);
    
    const displayOption = screen.getByText("Display Settings");
    
    act(() => {
      fireEvent.click(displayOption);
    });
    
    expect(screen.getByTestId("display-settings")).toBeInTheDocument();
    expect(screen.queryByTestId("user-settings")).not.toBeInTheDocument();
  });

  it("switches to ProfileSettings when option 3 is selected", () => {
    authStore.hasAccess = true;
    
    render(<EditSettings />);
    
    const profileOption = screen.getByText("Profile Settings");
    
    act(() => {
      fireEvent.click(profileOption);
    });
    
    expect(screen.getByTestId("profile-settings")).toBeInTheDocument();
    expect(screen.queryByTestId("user-settings")).not.toBeInTheDocument();
  });

  it("switches to EmailSettings when option 4 is selected", () => {
    authStore.hasAccess = true;
    
    render(<EditSettings />);
    
    const emailOption = screen.getByText("Email Settings");
    
    act(() => {
      fireEvent.click(emailOption);
    });
    
    expect(screen.getByTestId("email-settings")).toBeInTheDocument();
    expect(screen.queryByTestId("user-settings")).not.toBeInTheDocument();
  });

  it("switches to DangerZone when option 5 is selected", () => {
    authStore.hasAccess = true;
    
    render(<EditSettings />);
    
    const dangerOption = screen.getByText("Danger Zone");
    
    act(() => {
      fireEvent.click(dangerOption);
    });
    
    expect(screen.getByTestId("danger-zone")).toBeInTheDocument();
    expect(screen.queryByTestId("user-settings")).not.toBeInTheDocument();
  });

  it("handles mobile view correctly", () => {
    authStore.hasAccess = true;
    const { isMobileCheck } = require("../../helpers/dev/checkMobileTablet.js");
    isMobileCheck.mockReturnValue(true);
    
    render(<EditSettings />);
    
    // On mobile, labels should not be shown but icons should still be present
    const segmentedControl = screen.getByRole("radiogroup");
    expect(segmentedControl).toBeInTheDocument();
  });

  it("has proper CSS classes on main elements", () => {
    authStore.hasAccess = true;
    
    render(<EditSettings />);
    
    const mainContainer = document.querySelector(".EditSettings__main");
    expect(mainContainer).toBeInTheDocument();
    
    const container = document.querySelector(".EditSettings__container");
    expect(container).toBeInTheDocument();
    
    const centerDiv = document.querySelector(".EditSettings__centerDiv");
    expect(centerDiv).toBeInTheDocument();
    
    const title = document.querySelector(".EditSettings__title");
    expect(title).toBeInTheDocument();
  });
});
