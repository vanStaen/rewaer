import React from "react";
import { notification } from "antd";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { SignUpForm } from "./SignUpForm";

// Mock translation
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en" },
  }),
}));

// Mock antd notification
jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  notification: {
    error: jest.fn(),
    succes: jest.fn(),
  },
}));

// Mock child components
jest.mock("./AlreadyMember", () => ({
  AlreadyMember: ({ setShowLogin, showLogin }: any) => (
    <div>
      AlreadyMember
      <button onClick={() => setShowLogin(!showLogin)}>Toggle</button>
    </div>
  ),
}));

// Mock API helpers
const mockPostUsernameTaken = jest.fn();
const mockCheckUsernameforbidden = jest.fn();
const mockPostAddUser = jest.fn();
const mockPostVerifyEmailLink = jest.fn();

jest.mock("./postUsernameTaken", () => ({
  postUsernameTaken: (username: string) => mockPostUsernameTaken(username),
}));
jest.mock("./checkUsernameforbidden", () => ({
  checkUsernameforbidden: (username: string) =>
    mockCheckUsernameforbidden(username),
}));
jest.mock("./postAddUser", () => ({
  postAddUser: (...args: any[]) => mockPostAddUser(...args),
}));
jest.mock("../LoginForm/postVerifyEmailLink", () => ({
  postVerifyEmailLink: (...args: any[]) => mockPostVerifyEmailLink(...args),
}));

describe("SignUpForm", () => {
  const setShowLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all required fields", () => {
    render(<SignUpForm setShowLogin={setShowLogin} />);
    expect(screen.getByPlaceholderText("login.firstName")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("login.lastName")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("login.pickUsername"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("login.choosePassword"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("login.confirmYourPassword"),
    ).toBeInTheDocument();
    expect(screen.getByText("login.createAccount")).toBeInTheDocument();
    expect(screen.getByText("AlreadyMember")).toBeInTheDocument();
  });

  it("shows error if username is taken", async () => {
    mockPostUsernameTaken.mockResolvedValue(true);
    render(<SignUpForm setShowLogin={setShowLogin} />);
    const usernameInput = screen.getByPlaceholderText("login.pickUsername");
    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "takenuser" } });
    });
    const errorIcon = document.querySelector(
      ".ant-form-item-feedback-icon-error",
    );
    expect(errorIcon).toBeInTheDocument();
  });

  it("shows error if username contains spaces", async () => {
    mockPostUsernameTaken.mockResolvedValue(false);
    render(<SignUpForm setShowLogin={setShowLogin} />);
    const usernameInput = screen.getByPlaceholderText("login.pickUsername");
    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "user name" } });
    });
    const errorIcon = document.querySelector(
      ".ant-form-item-feedback-icon-error",
    );
    expect(errorIcon).toBeInTheDocument();
  });

  it("shows error if username is forbidden", async () => {
    mockPostUsernameTaken.mockResolvedValue(false);
    mockCheckUsernameforbidden.mockResolvedValue(true);
    render(<SignUpForm setShowLogin={setShowLogin} />);
    const usernameInput = screen.getByPlaceholderText("login.pickUsername");
    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "forbidden" } });
    });
    const errorIcon = document.querySelector(
      ".ant-form-item-feedback-icon-error",
    );
    expect(errorIcon).toBeInTheDocument();
  });

  it("submits form and calls postAddUser and postVerifyEmailLink on success", async () => {
    mockPostUsernameTaken.mockResolvedValue(false);
    mockCheckUsernameforbidden.mockResolvedValue(false);
    mockPostAddUser.mockResolvedValue({ id: 123 });
    render(<SignUpForm setShowLogin={setShowLogin} />);
    fireEvent.change(screen.getByPlaceholderText("login.firstName"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("login.lastName"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("login.pickUsername"), {
      target: { value: "johndoe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("login.choosePassword"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("login.confirmYourPassword"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByText("login.createAccount"));
    await waitFor(() => expect(mockPostAddUser).toHaveBeenCalled());
    await waitFor(() =>
      expect(mockPostVerifyEmailLink).toHaveBeenCalledWith("john@example.com"),
    );
    // TODO test this
    // await waitFor(() => expect(notification.success).toHaveBeenCalled());
    // await waitFor(() => expect(setShowLogin).toHaveBeenCalledWith(true));
  });

  it("shows error notification if postAddUser returns errors", async () => {
    mockPostUsernameTaken.mockResolvedValue(false);
    mockCheckUsernameforbidden.mockResolvedValue(false);
    mockPostAddUser.mockResolvedValue({ errors: [{ message: "Some error" }] });
    render(<SignUpForm setShowLogin={setShowLogin} />);
    fireEvent.change(screen.getByPlaceholderText("login.firstName"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("login.lastName"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("login.pickUsername"), {
      target: { value: "johndoe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("login.choosePassword"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("login.confirmYourPassword"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByText("login.createAccount"));
    await waitFor(() =>
      expect(notification.error).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Some error" }),
      ),
    );
  });

  it("shows error notification if postAddUser throws", async () => {
    mockPostUsernameTaken.mockResolvedValue(false);
    mockCheckUsernameforbidden.mockResolvedValue(false);
    mockPostAddUser.mockRejectedValue({ message: "Network error" });
    render(<SignUpForm setShowLogin={setShowLogin} />);
    fireEvent.change(screen.getByPlaceholderText("login.firstName"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("login.lastName"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("login.pickUsername"), {
      target: { value: "johndoe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("login.choosePassword"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("login.confirmYourPassword"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByText("login.createAccount"));
    await waitFor(() =>
      expect(notification.error).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Network error" }),
      ),
    );
  });
});
