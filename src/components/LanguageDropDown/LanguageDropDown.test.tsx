import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { LanguageDropDown } from "./LanguageDropDown";

// Mock i18n
const changeLanguage = jest.fn();
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: {
      language: "en-US",
      changeLanguage,
    },
  }),
}));

describe("LanguageDropDown", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with initial language", () => {
    render(<LanguageDropDown />);
    expect(screen.getByText("EN")).toBeInTheDocument();
  });

  it("shows menu and changes language to DE", async () => {
    render(<LanguageDropDown />);

    // Click to open dropdown
    const languageButton = screen.getByText("EN");
    await act(async () => {
      fireEvent.click(languageButton);
    });

    // Wait for menu to appear and click DE option
    await act(async () => {
      const menuItems = document.querySelectorAll(".languageDropdown__item");
      const deOption = Array.from(menuItems).find(
        (item) => item.textContent === "DE",
      );
      if (deOption) {
        fireEvent.click(deOption);
      }
    });

    expect(changeLanguage).toHaveBeenCalledWith("de-DE");
  });
});
