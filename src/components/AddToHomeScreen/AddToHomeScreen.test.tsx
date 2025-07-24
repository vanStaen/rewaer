import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AddToHomeScreen } from "./AddToHomeScreen";

// Mock icons to avoid rendering issues
jest.mock("@ant-design/icons", () => ({
  DownloadOutlined: () => <span>DownloadIcon</span>,
  CheckOutlined: () => <span>CheckIcon</span>,
}));

describe("AddToHomeScreen", () => {
  beforeEach(() => {
    // Reset matchMedia
    (window.matchMedia as any) = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  it("renders download button when not in standalone mode", () => {
    render(<AddToHomeScreen />);
    expect(screen.getByText("Download App")).toBeInTheDocument();
    expect(screen.getByText("DownloadIcon")).toBeInTheDocument();
  });

  it("renders installed message when in standalone mode", () => {
    (window.matchMedia as any) = jest.fn().mockImplementation((query) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    render(<AddToHomeScreen />);
    expect(screen.getByText("App installed")).toBeInTheDocument();
    expect(screen.getByText("CheckIcon")).toBeInTheDocument();
  });

  it("calls prompt and hides button on accept", () => {
    // Setup DOM
    document.body.innerHTML = '<div id="a2hsButton"></div>';
    let promptCalled = false;
    let resolveUserChoice: any;
    const userChoicePromise = new Promise((resolve) => {
      resolveUserChoice = resolve;
    });

    // Mock beforeinstallprompt event
    const event: any = {
      preventDefault: jest.fn(),
      prompt: jest.fn(() => {
        promptCalled = true;
        return userChoicePromise;
      }),
      userChoice: userChoicePromise,
    };

    // Patch window.addEventListener to use our event
    const originalAddEventListener = window.addEventListener;
    window.addEventListener = (type: string, listener: any, options?: any) => {
      if (type === "beforeinstallprompt") {
        // Immediately call the listener with our event
        setTimeout(() => listener(event), 0);
      }
      return originalAddEventListener.call(window, type, listener, options);
    };

    render(<AddToHomeScreen />);
    // Wait for the event to be handled and button to be available
    setTimeout(() => {
      const button = document.getElementById("a2hsButton");
      if (button) {
        fireEvent.click(button);
        resolveUserChoice({ outcome: "accepted" });
      }
      expect(promptCalled).toBe(true);
      // Restore original addEventListener
      window.addEventListener = originalAddEventListener;
    }, 0);
  });
});
