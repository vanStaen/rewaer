import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { StringElement } from "./StringElement";

describe("StringElement", () => {
  const mockHandleChange = jest.fn();

  const defaultProps = {
    value: "",
    handleChange: mockHandleChange,
    element: "title",
    title: "Title",
    disabled: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with title", () => {
    render(<StringElement {...defaultProps} />);
    expect(screen.getByText("Title:")).toBeInTheDocument();
  });

  it("displays placeholder when no value is provided", () => {
    render(<StringElement {...defaultProps} />);
    expect(screen.getByText("Enter a value")).toBeInTheDocument();
  });

  it("displays the value when provided", () => {
    render(<StringElement {...defaultProps} value="Test Value" />);
    expect(screen.getByText("Test Value")).toBeInTheDocument();
  });

  it("displays the value with hyphens as-is", () => {
    render(<StringElement {...defaultProps} value="Test-Value" />);
    expect(screen.getByText("Test-Value")).toBeInTheDocument();
  });

  it("enters edit mode when clicked and not disabled", () => {
    render(<StringElement {...defaultProps} value="Test Value" />);
    
    const displayElement = screen.getByText("Test Value");
    fireEvent.click(displayElement);

    // Check that input is now visible
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("Test Value");
  });

  it("does not enter edit mode when disabled", () => {
    render(<StringElement {...defaultProps} value="Test Value" disabled={true} />);
    
    const displayElement = screen.getByText("Test Value");
    fireEvent.click(displayElement);

    // Input should not be visible
    const input = screen.queryByRole("textbox");
    expect(input).not.toBeInTheDocument();
  });

  it("updates input value while editing", () => {
    render(<StringElement {...defaultProps} value="Test" />);
    
    // Enter edit mode
    const displayElement = screen.getByText("Test");
    fireEvent.click(displayElement);

    // Get input and change value
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New Value" } });

    expect(input).toHaveValue("New Value");
  });

  it("calls handleChange with correct value on Enter key press", () => {
    render(<StringElement {...defaultProps} value="Test" />);
    
    // Enter edit mode
    fireEvent.click(screen.getByText("Test"));

    // Change value and press Enter
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New Value" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockHandleChange).toHaveBeenCalledWith("New Value", "title");
  });

  it("replaces slashes with hyphens when saving", () => {
    render(<StringElement {...defaultProps} value="Test" />);
    
    // Enter edit mode
    fireEvent.click(screen.getByText("Test"));

    // Change value with slash and press Enter
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New/Value" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockHandleChange).toHaveBeenCalledWith("New-Value", "title");
  });

  it("exits edit mode without saving on blur", () => {
    render(<StringElement {...defaultProps} value="Original" />);
    
    // Enter edit mode
    fireEvent.click(screen.getByText("Original"));

    // Change value
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Modified" } });

    // Blur the input (cancel edit)
    fireEvent.blur(input);

    // handleChange should not be called
    expect(mockHandleChange).not.toHaveBeenCalled();
    
    // Original value should be displayed
    expect(screen.getByText("Original")).toBeInTheDocument();
  });

  it("does not call handleChange when value is empty", () => {
    render(<StringElement {...defaultProps} value="Test" />);
    
    // Enter edit mode
    fireEvent.click(screen.getByText("Test"));

    // Clear value and press Enter
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockHandleChange).not.toHaveBeenCalled();
  });

  it("renders tooltip when tooltip prop is provided", () => {
    render(<StringElement {...defaultProps} tooltip="This is a tooltip" />);
    
    const tooltipIcon = document.querySelector(".formElement__helpIcon");
    expect(tooltipIcon).toBeInTheDocument();
  });

  it("does not render tooltip when tooltip prop is not provided", () => {
    render(<StringElement {...defaultProps} />);
    
    const tooltipIcon = document.querySelector(".formElement__helpIcon");
    expect(tooltipIcon).not.toBeInTheDocument();
  });

  it("applies correct CSS classes when disabled", () => {
    render(<StringElement {...defaultProps} value="Test" disabled={true} />);
    
    const displayElement = screen.getByText("Test");
    expect(displayElement).toHaveClass("formElement__element");
    expect(displayElement.className).toContain("true");
  });

  it("applies placeholder class when no value", () => {
    render(<StringElement {...defaultProps} />);
    
    const displayElement = screen.getByText("Enter a value");
    expect(displayElement).toHaveClass("formElement__selectElement");
    expect(displayElement).toHaveClass("textCursor");
  });

  it("focuses input when entering edit mode", async () => {
    render(<StringElement {...defaultProps} value="Test" />);
    
    // Enter edit mode
    fireEvent.click(screen.getByText("Test"));

    // Wait for focus
    await waitFor(() => {
      const input = screen.getByRole("textbox");
      expect(input).toHaveFocus();
    });
  });

  it("updates when value prop changes", () => {
    const { rerender } = render(<StringElement {...defaultProps} value="Original" />);
    
    expect(screen.getByText("Original")).toBeInTheDocument();
    
    // Update value prop
    rerender(<StringElement {...defaultProps} value="Updated" />);
    
    expect(screen.getByText("Updated")).toBeInTheDocument();
    expect(screen.queryByText("Original")).not.toBeInTheDocument();
  });

  it("resets input to original value when canceled after prop change", () => {
    const { rerender } = render(<StringElement {...defaultProps} value="Original" />);
    
    // Enter edit mode
    fireEvent.click(screen.getByText("Original"));
    
    // Change value
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Modified" } });
    
    // Update prop externally
    rerender(<StringElement {...defaultProps} value="New Original" />);
    
    // Cancel edit
    fireEvent.blur(input);
    
    // Should show the updated prop value
    expect(screen.getByText("New Original")).toBeInTheDocument();
  });

  it("handles multiple element types correctly", () => {
    render(<StringElement {...defaultProps} element="brand" title="Brand" />);
    
    fireEvent.click(screen.getByText("Enter a value"));
    
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Nike" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockHandleChange).toHaveBeenCalledWith("Nike", "brand");
  });
});
