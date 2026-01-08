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
    await act(async () => {
      fireEvent.click(screen.getByText("EN"));
      fireEvent.click(screen.getByText("DE"));
    });
    expect(changeLanguage).toHaveBeenCalledWith("de-DE");
    expect(screen.getAllByText("DE")[1]).toBeInTheDocument();
  });
});
