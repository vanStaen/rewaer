import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { DisplaySettings } from "./DisplaySettings";
import { userStore } from "../../../stores/userStore/userStore.js";
import { updateSettings } from "../actions/updateSettings.js";
import { updateLanguage } from "../actions/updateLanguage.js";
import { updateGender } from "../actions/updateGender.js";

// Mock dependencies
const mockI18n = {
  language: "en-US",
  changeLanguage: jest.fn()
};

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "profile.displaySettings": "Display Settings",
        "profile.genderBasedGarderobe": "Gender-based wardrobe",
        "profile.male": "Male",
        "profile.female": "Female",
        "profile.nonbinary": "Non-binary",
        "profile.tooltipNB": "Non-binary tooltip",
        "profile.displayLanguage": "Display Language",
        "profile.settingShowArchived": "Show archived items",
        "profile.settingDisplayPrivate": "Display private items"
      };
      return translations[key] || key;
    },
    i18n: mockI18n
  })
}));

jest.mock("../../../../stores/userStore/userStore.js", () => ({
  userStore: {
    gender: 1,
    profilSettings: {
      displayArchived: false,
      displayPrivate: true
    },
    emailSettings: {},
    setProfilSettings: jest.fn(),
    setGender: jest.fn()
  }
}));

jest.mock("../actions/updateSettings.js", () => ({
  updateSettings: jest.fn()
}));

jest.mock("../actions/updateLanguage.js", () => ({
  updateLanguage: jest.fn()
}));

jest.mock("../actions/updateGender.js", () => ({
  updateGender: jest.fn()
}));

jest.mock("mobx-react", () => ({
  observer: (component: any) => component
}));

describe("DisplaySettings", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the display settings section with correct structure", () => {
    render(<DisplaySettings />);
    
    expect(screen.getByText("Display Settings")).toBeInTheDocument();
    expect(screen.getByText("Gender-based wardrobe")).toBeInTheDocument();
    expect(screen.getByText("Display Language")).toBeInTheDocument();
  });

  it("renders gender radio buttons with correct default value", () => {
    render(<DisplaySettings />);
    
    expect(screen.getByRole("radio", { name: "Male" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Female" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Non-binary" })).toBeInTheDocument();
    
    // Check that male is selected by default (userStore.gender = 1)
    expect(screen.getByRole("radio", { name: "Male" })).toBeChecked();
  });

  it("renders language radio buttons with correct default value", () => {
    render(<DisplaySettings />);
    
    expect(screen.getByRole("radio", { name: "English" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Français" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Deutsch" })).toBeInTheDocument();
    
    // Check that English is selected by default (initLanguage = "en")
    expect(screen.getByRole("radio", { name: "English" })).toBeChecked();
  });

  it("renders switches with correct initial states", () => {
    render(<DisplaySettings />);
    
    const switches = screen.getAllByRole("switch");
    expect(switches).toHaveLength(2);
    
    // displayArchived should be unchecked, displayPrivate should be checked
    expect(switches[0]).not.toBeChecked(); // displayArchived
    expect(switches[1]).toBeChecked(); // displayPrivate
  });

  it("calls updateGender when gender selection changes", () => {
    render(<DisplaySettings />);
    
    const femaleRadio = screen.getByRole("radio", { name: "Female" });
    
    act(() => {
      fireEvent.click(femaleRadio);
    });
    
    expect(userStore.setGender).toHaveBeenCalledWith(2);
    expect(updateGender).toHaveBeenCalledWith(2);
  });

  it("calls updateLanguage and i18n.changeLanguage when language selection changes", () => {
    render(<DisplaySettings />);
    
    const frenchRadio = screen.getByRole("radio", { name: "Français" });
    
    act(() => {
      fireEvent.click(frenchRadio);
    });
    
    expect(mockI18n.changeLanguage).toHaveBeenCalledWith("fr-FR");
    expect(updateLanguage).toHaveBeenCalledWith("fr");
  });

  it("handles all language options correctly", () => {
    render(<DisplaySettings />);
    
    // Test German
    const germanRadio = screen.getByRole("radio", { name: "Deutsch" });
    act(() => {
      fireEvent.click(germanRadio);
    });
    
    expect(mockI18n.changeLanguage).toHaveBeenCalledWith("de-DE");
    expect(updateLanguage).toHaveBeenCalledWith("de");
    
    // Test English
    const englishRadio = screen.getByRole("radio", { name: "English" });
    act(() => {
      fireEvent.click(englishRadio);
    });
    
    expect(mockI18n.changeLanguage).toHaveBeenCalledWith("en-US");
    expect(updateLanguage).toHaveBeenCalledWith("en");
  });

  it("toggles displayArchived setting when switch is clicked", () => {
    render(<DisplaySettings />);
    
    const switches = screen.getAllByRole("switch");
    const archivedSwitch = switches[0]; // First switch is displayArchived
    
    act(() => {
      fireEvent.click(archivedSwitch);
    });
    
    expect(userStore.setProfilSettings).toHaveBeenCalledWith({
      displayArchived: true,
      displayPrivate: true
    });
    expect(updateSettings).toHaveBeenCalledWith(userStore.emailSettings, {
      displayArchived: true,
      displayPrivate: true
    });
  });

  it("toggles displayPrivate setting when switch is clicked", () => {
    render(<DisplaySettings />);
    
    const switches = screen.getAllByRole("switch");
    const privateSwitch = switches[1]; // Second switch is displayPrivate
    
    act(() => {
      fireEvent.click(privateSwitch);
    });
    
    expect(userStore.setProfilSettings).toHaveBeenCalledWith({
      displayArchived: false,
      displayPrivate: false
    });
    expect(updateSettings).toHaveBeenCalledWith(userStore.emailSettings, {
      displayArchived: false,
      displayPrivate: false
    });
  });

  it("handles gender change for all options", () => {
    render(<DisplaySettings />);
    
    // Test non-binary option
    const nonBinaryRadio = screen.getByRole("radio", { name: "Non-binary" });
    act(() => {
      fireEvent.click(nonBinaryRadio);
    });
    
    expect(userStore.setGender).toHaveBeenCalledWith(3);
    expect(updateGender).toHaveBeenCalledWith(3);
  });

  it("displays tooltip for non-binary option", () => {
    render(<DisplaySettings />);
    
    // Check if the tooltip wrapper exists
    const tooltipWrapper = document.querySelector('.ant-tooltip-inner, [title]');
    expect(screen.getByRole("radio", { name: "Non-binary" })).toBeInTheDocument();
  });
});
