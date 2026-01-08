import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { notification } from "antd";
import { DeleteAccountButton } from "./DeleteAccountButton";
import { authStore } from "@stores/authStore/authStore";
import { archiveAccount } from "../../actions/archiveAccount";

// Mock dependencies
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "profile.deleteAccount": "Delete Account",
        "profile.areYouSure": "Are you sure?",
        "profile.willBeArchived": "Your account will be archived",
        "profile.loggingToReactivate": "Log in again to reactivate",
      };
      return translations[key] || key;
    },
  }),
}));

jest.mock("../../actions/archiveAccount", () => ({
  archiveAccount: jest.fn(),
}));

jest.mock("../../../../stores/authStore/authStore", () => ({
  authStore: {
    logout: jest.fn(),
  },
}));

jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  notification: {
    error: jest.fn(),
  },
}));

describe("DeleteAccountButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders the initial delete account button", () => {
    render(<DeleteAccountButton />);

    const deleteButton = screen.getByRole("button", {
      name: /delete account/i,
    });
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).not.toBeDisabled();
  });

  it("shows confirmation button when delete button is clicked", () => {
    render(<DeleteAccountButton />);

    const deleteButton = screen.getByRole("button", {
      name: /delete account/i,
    });
    act(() => {
      fireEvent.click(deleteButton);
    });

    expect(deleteButton).toBeDisabled();
    expect(
      screen.getByRole("button", { name: /are you sure\? \.\.\. 5/i }),
    ).toBeInTheDocument();
  });

  it("counts down from 5 to 1 and then hides confirmation button", async () => {
    render(<DeleteAccountButton />);

    const deleteButton = screen.getByRole("button", {
      name: /delete account/i,
    });
    act(() => {
      fireEvent.click(deleteButton);
    });

    // Check initial countdown
    expect(
      screen.getByRole("button", { name: /are you sure\? \.\.\. 5/i }),
    ).toBeInTheDocument();

    // Advance timer by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(
      screen.getByRole("button", { name: /are you sure\? \.\.\. 4/i }),
    ).toBeInTheDocument();

    // Advance timer by another second
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(
      screen.getByRole("button", { name: /are you sure\? \.\.\. 3/i }),
    ).toBeInTheDocument();

    // Advance timer by another second
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(
      screen.getByRole("button", { name: /are you sure\? \.\.\. 2/i }),
    ).toBeInTheDocument();

    // Advance timer by another second
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(
      screen.getByRole("button", { name: /are you sure\? \.\.\. 1/i }),
    ).toBeInTheDocument();

    // Advance timer by final second
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Confirmation button should be gone and main button should be enabled
    expect(
      screen.queryByRole("button", { name: /are you sure/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /delete account/i }),
    ).not.toBeDisabled();
  });

  it("calls archiveAccount and logout when confirmation button is clicked", () => {
    render(<DeleteAccountButton />);

    const deleteButton = screen.getByRole("button", {
      name: /delete account/i,
    });
    act(() => {
      fireEvent.click(deleteButton);
    });

    const confirmButton = screen.getByRole("button", {
      name: /are you sure\? \.\.\. 5/i,
    });
    act(() => {
      fireEvent.click(confirmButton);
    });

    expect(archiveAccount).toHaveBeenCalledWith(true);
    expect(authStore.logout).toHaveBeenCalled();
    expect(notification.error).toHaveBeenCalledWith({
      message: expect.any(Object),
      placement: "bottomRight",
    });
  });

  it("displays notification with correct message when account is deleted", () => {
    render(<DeleteAccountButton />);

    const deleteButton = screen.getByRole("button", {
      name: /delete account/i,
    });
    act(() => {
      fireEvent.click(deleteButton);
    });

    const confirmButton = screen.getByRole("button", {
      name: /are you sure\? \.\.\. 5/i,
    });
    act(() => {
      fireEvent.click(confirmButton);
    });

    expect(notification.error).toHaveBeenCalledWith({
      message: (
        <React.Fragment>
          <b>Your account will be archived</b>
          <React.Fragment>Log in again to reactivate</React.Fragment>
        </React.Fragment>
      ),
      placement: "bottomRight",
    });
  });
});
