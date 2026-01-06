import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DropDownElement } from "./DropDownElement";
import { itemsStore } from "../../pages/Items/itemsStore";
import { userStore } from "@stores/userStore/userStore.js";

// Mock the stores
jest.mock("../../pages/Items/itemsStore", () => ({
  itemsStore: {
    selectedItem: { id: 1 },
  },
}));

jest.mock("@stores/userStore/userStore.js", () => ({
  userStore: {
    language: "en",
  },
}));

// Mock i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("DropDownElement", () => {
  const mockData = [
    { code: "red", en: "Red", fr: "Rouge" },
    { code: "blue", en: "Blue", fr: "Bleu" },
    { code: "green", en: "Green", fr: "Vert" },
  ];

  const mockHandleChange = jest.fn();

  const defaultProps = {
    data: mockData,
    title: "Color",
    disabled: false,
    multiSelect: false,
    handleChange: mockHandleChange,
    element: "color",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the dropdown with title", () => {
    render(<DropDownElement {...defaultProps} />);
    expect(screen.getByText("Color:")).toBeInTheDocument();
  });

  it("renders the dropdown with placeholder", () => {
    render(<DropDownElement {...defaultProps} />);
    expect(screen.getByText("Select a Color")).toBeInTheDocument();
  });

  it("loads and displays options based on data prop", async () => {
    render(<DropDownElement {...defaultProps} />);
    
    // Click to open dropdown
    const select = screen.getByText("Select a Color");
    fireEvent.mouseDown(select);

    // Check if options are rendered
    await waitFor(() => {
      expect(screen.getByText("Red")).toBeInTheDocument();
      expect(screen.getByText("Blue")).toBeInTheDocument();
      expect(screen.getByText("Green")).toBeInTheDocument();
    });
  });

  it("displays selected value when value prop is provided", () => {
    render(<DropDownElement {...defaultProps} value="red" />);
    
    // The selected value should be displayed
    expect(screen.getByText("Red")).toBeInTheDocument();
  });

  it("displays multiple selected values in multiSelect mode", () => {
    render(
      <DropDownElement
        {...defaultProps}
        multiSelect={true}
        value={["red", "blue"]}
      />
    );
    
    // Both selected values should be displayed
    expect(screen.getByText("Red")).toBeInTheDocument();
    expect(screen.getByText("Blue")).toBeInTheDocument();
  });

  it("calls handleChange when a new value is selected", async () => {
    render(<DropDownElement {...defaultProps} />);
    
    // Click to open dropdown
    const select = screen.getByText("Select a Color");
    fireEvent.mouseDown(select);

    // Select an option
    await waitFor(() => {
      const option = screen.getByText("Red");
      fireEvent.click(option);
    });

    // Check if handleChange was called with correct parameters
    expect(mockHandleChange).toHaveBeenCalledWith("red", "color");
  });

  it("renders tooltip when tooltip prop is provided", () => {
    render(<DropDownElement {...defaultProps} tooltip="Select your color" />);
    
    // Check for tooltip icon
    const tooltipIcon = document.querySelector(".formElement__helpIcon");
    expect(tooltipIcon).toBeInTheDocument();
  });

  it("does not render tooltip when tooltip prop is not provided", () => {
    render(<DropDownElement {...defaultProps} />);
    
    // Tooltip icon should not be present
    const tooltipIcon = document.querySelector(".formElement__helpIcon");
    expect(tooltipIcon).not.toBeInTheDocument();
  });

  it("applies disabled class when disabled prop is true", () => {
    render(<DropDownElement {...defaultProps} disabled={true} />);
    
    const selectElement = document.querySelector(".formElement__selectDisabled");
    expect(selectElement).toBeInTheDocument();
  });

  it("applies normal class when disabled prop is false", () => {
    render(<DropDownElement {...defaultProps} disabled={false} />);
    
    const selectElement = document.querySelector(".formElement__select");
    expect(selectElement).toBeInTheDocument();
  });

  it("uses correct language from userStore", async () => {
    (userStore as any).language = "fr";
    
    render(<DropDownElement {...defaultProps} />);
    
    // Click to open dropdown
    const select = screen.getByText("Select a Color");
    fireEvent.mouseDown(select);

    // Check if French labels are rendered
    await waitFor(() => {
      expect(screen.getByText("Rouge")).toBeInTheDocument();
      expect(screen.getByText("Bleu")).toBeInTheDocument();
      expect(screen.getByText("Vert")).toBeInTheDocument();
    });

    // Reset language
    (userStore as any).language = "en";
  });

  it("renders in multiple mode when multiSelect is true", () => {
    render(<DropDownElement {...defaultProps} multiSelect={true} />);
    
    const selectElement = document.querySelector(".ant-select-multiple");
    expect(selectElement).toBeInTheDocument();
  });

  it("renders in single mode when multiSelect is false", () => {
    render(<DropDownElement {...defaultProps} multiSelect={false} />);
    
    const selectElement = document.querySelector(".ant-select-single");
    expect(selectElement).toBeInTheDocument();
  });

  it("updates when value prop changes", () => {
    const { rerender } = render(<DropDownElement {...defaultProps} value="red" />);
    
    expect(screen.getByText("Red")).toBeInTheDocument();
    
    // Update value prop
    rerender(<DropDownElement {...defaultProps} value="blue" />);
    
    expect(screen.getByText("Blue")).toBeInTheDocument();
  });

  it("handles empty value prop gracefully", () => {
    render(<DropDownElement {...defaultProps} value={undefined} />);
    
    expect(screen.getByText("Select a Color")).toBeInTheDocument();
  });
});
