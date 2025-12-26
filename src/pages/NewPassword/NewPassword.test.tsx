import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { notification } from "antd";
import { NewPassword } from "./NewPassword";
import { postTokenVerify } from "./postTokenVerify";
import { postChangePassword } from "./postChangePassword";

// Mock external dependencies
jest.mock("./postTokenVerify");
jest.mock("./postChangePassword");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    key: "test-token-123",
  }),
}));
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));
jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  notification: {
    success: jest.fn(),
    warning: jest.fn(),
    error: jest.fn(),
  },
}));

const mockPostTokenVerify = postTokenVerify as jest.MockedFunction<
  typeof postTokenVerify
>;
const mockPostChangePassword = postChangePassword as jest.MockedFunction<
  typeof postChangePassword
>;
const mockNotification = notification as jest.Mocked<typeof notification>;

// Mock window.location
const mockLocation = {
  href: "",
  assign: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("NewPassword", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPostTokenVerify.mockResolvedValue(true);
    mockPostChangePassword.mockResolvedValue(true);
    mockLocation.href = "";
  });

  it("renders the component with correct form elements", () => {
    renderWithRouter(<NewPassword />);

    expect(screen.getByText("login.setNewPassword")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("login.chooseNewPassword"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("login.pleaseConfirmNewPassword"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /login.updatePassword/i }),
    ).toBeInTheDocument();
  });

  it("verifies token on component mount", async () => {
    renderWithRouter(<NewPassword />);

    await waitFor(() => {
      expect(mockPostTokenVerify).toHaveBeenCalledWith("test-token-123");
    });
  });

  it("shows error notification for invalid token", async () => {
    mockPostTokenVerify.mockResolvedValue(false);

    renderWithRouter(<NewPassword />);

    await waitFor(() => {
      expect(mockNotification.error).toHaveBeenCalledWith({
        message: "login.linkNotValid",
        placement: "topLeft",
        duration: 0,
      });
    });
  });

  it("disables submit button when token is invalid", async () => {
    mockPostTokenVerify.mockResolvedValue(false);

    renderWithRouter(<NewPassword />);

    await waitFor(() => {
      const submitButton = screen.getByRole("button");
      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveTextContent("login.linkNotValidAnymore");
    });
  });

  it("submits form with valid password", async () => {
    renderWithRouter(<NewPassword />);

    const passwordInput = screen.getByPlaceholderText(
      "login.chooseNewPassword",
    );
    const confirmInput = screen.getByPlaceholderText(
      "login.pleaseConfirmNewPassword",
    );
    const submitButton = screen.getByRole("button", {
      name: /login.updatePassword/i,
    });

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "newPassword123" } });
      fireEvent.change(confirmInput, { target: { value: "newPassword123" } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockPostChangePassword).toHaveBeenCalledWith(
        "test-token-123",
        "newPassword123",
      );
    });
  });

  it("shows success notification on successful password change", async () => {
    renderWithRouter(<NewPassword />);

    const passwordInput = screen.getByPlaceholderText(
      "login.chooseNewPassword",
    );
    const confirmInput = screen.getByPlaceholderText(
      "login.pleaseConfirmNewPassword",
    );
    const submitButton = screen.getByRole("button", {
      name: /login.updatePassword/i,
    });

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "newPassword123" } });
      fireEvent.change(confirmInput, { target: { value: "newPassword123" } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockNotification.success).toHaveBeenCalledWith({
        message: "login.passwordReseted",
        placement: "topLeft",
      });
    });
  });

  it("shows warning notification on failed password change", async () => {
    mockPostChangePassword.mockResolvedValue(false);
    renderWithRouter(<NewPassword />);

    const passwordInput = screen.getByPlaceholderText(
      "login.chooseNewPassword",
    );
    const confirmInput = screen.getByPlaceholderText(
      "login.pleaseConfirmNewPassword",
    );
    const submitButton = screen.getByRole("button", {
      name: /login.updatePassword/i,
    });

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "newPassword123" } });
      fireEvent.change(confirmInput, { target: { value: "newPassword123" } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockNotification.warning).toHaveBeenCalledWith({
        message: "login.passwordNotChanged",
        placement: "topLeft",
      });
    });
  });

  it("handles API error gracefully", async () => {
    const error = new Error("API Error");
    mockPostChangePassword.mockRejectedValue(error);
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    renderWithRouter(<NewPassword />);

    const passwordInput = screen.getByPlaceholderText(
      "login.chooseNewPassword",
    );
    const confirmInput = screen.getByPlaceholderText(
      "login.pleaseConfirmNewPassword",
    );
    const submitButton = screen.getByRole("button", {
      name: /login.updatePassword/i,
    });

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "newPassword123" } });
      fireEvent.change(confirmInput, { target: { value: "newPassword123" } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockNotification.warning).toHaveBeenCalledWith({
        message: "API Error",
        placement: "topLeft",
      });
      expect(consoleSpy).toHaveBeenCalledWith(error);
    });

    consoleSpy.mockRestore();
  });

  it("shows loading state during form submission", async () => {
    mockPostChangePassword.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(true), 100)),
    );

    renderWithRouter(<NewPassword />);

    const passwordInput = screen.getByPlaceholderText(
      "login.chooseNewPassword",
    );
    const confirmInput = screen.getByPlaceholderText(
      "login.pleaseConfirmNewPassword",
    );
    const submitButton = screen.getByRole("button", {
      name: /login.updatePassword/i,
    });

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "newPassword123" } });
      fireEvent.change(confirmInput, { target: { value: "newPassword123" } });
      fireEvent.click(submitButton);
    });

    expect(
      screen.getByTestId("loading-icon") ||
        screen.getByRole("img", { hidden: true }),
    ).toBeInTheDocument();
  });

  it("validates password confirmation", async () => {
    renderWithRouter(<NewPassword />);

    const passwordInput = screen.getByPlaceholderText(
      "login.chooseNewPassword",
    );
    const confirmInput = screen.getByPlaceholderText(
      "login.pleaseConfirmNewPassword",
    );

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.change(confirmInput, {
        target: { value: "differentPassword" },
      });
      fireEvent.blur(confirmInput);
    });

    await waitFor(() => {
      expect(screen.getByText("login.passwordDoNotMatch")).toBeInTheDocument();
    });
  });

  it("requires password field", async () => {
    renderWithRouter(<NewPassword />);

    const submitButton = screen.getByRole("button", {
      name: /login.updatePassword/i,
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(
        screen.getAllByText("login.pleaseInputNewPassword")[0],
      ).toBeInTheDocument();
    });
  });
});
