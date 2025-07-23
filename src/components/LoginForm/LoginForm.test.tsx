import React from "react";
import { notification } from "antd";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "./LoginForm";

// Mock antd notification
jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  notification: {
    error: jest.fn()
  }
}));

// Mock translations
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock child components
jest.mock("../PasswordRecover/PasswordRecover", () => ({
  PasswordRecover: ({ setIsRecovery, email }: any) => (
    <div>
      PasswordRecover {email}
      <button onClick={() => setIsRecovery(false)}>Back</button>
    </div>
  ),
}));

// Mock helpers and stores
const mockLogin = jest.fn();
jest.mock("../../stores/authStore/authStore.js", () => ({
  authStore: { login: (...args: any[]) => mockLogin(...args) },
}));
jest.mock("./postVerifyEmailLink", () => ({
  postVerifyEmailLink: jest.fn(),
}));
jest.mock("../../helpers/validateEmail", () => ({
  validateEmail: (input: string) => input.includes("@"),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders login form fields", () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText("login.emailOrUsername")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("login.password")).toBeInTheDocument();
    expect(screen.getByText("login.logMeIn")).toBeInTheDocument();
  });

  it("submits form with email and calls login", async () => {
    mockLogin.mockResolvedValue(null);
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText("login.emailOrUsername"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("login.password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("login.logMeIn"));
    await waitFor(() => expect(mockLogin).toHaveBeenCalledWith(
      "test@example.com", null, "password123", undefined
    ));
  });

  it("shows error notification for unverified email", async () => {
    mockLogin.mockResolvedValue("Error: Email is not verified!");
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText("login.emailOrUsername"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("login.password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("login.logMeIn"));
    await waitFor(() =>
      expect(notification.error).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.any(Object),
          placement: "topLeft",
          duration: 0,
        })
      )
    );
  });

  it("shows error notification for incorrect password", async () => {
    mockLogin.mockResolvedValue("Error: Password is incorrect!");
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText("login.emailOrUsername"), {
      target: { value: "user" },
    });
    fireEvent.change(screen.getByPlaceholderText("login.password"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByText("login.logMeIn"));
    await waitFor(() =>
      expect(notification.error).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.any(Object),
          placement: "topLeft",
        })
      )
    );
  });

  it("switches to recovery mode and back", () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByText(/login.recoverPassword/i));
    expect(screen.getByText(/PasswordRecover/)).toBeInTheDocument();
    fireEvent.click(screen.getByText("Back"));
    expect(screen.getByText("login.logMeIn")).toBeInTheDocument();
  });
});
