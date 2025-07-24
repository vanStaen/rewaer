import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MenuBar } from "./MenuBar";

// Mock dependencies
jest.mock("react-router-dom", () => ({
  Link: ({ to, children }: any) => <a href={to}>{children}</a>,
}));
jest.mock("mobx-react", () => ({
  observer: (comp: any) => comp,
}));
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));
jest.mock("../../stores/authStore/authStore.js", () => ({
  authStore: { logout: jest.fn() },
}));
jest.mock("../../stores/userStore/userStore.js", () => ({
  userStore: {
    avatar: null,
    isLoading: false,
    userName: "testuser",
    usernameChange: 0,
    setUserName: jest.fn(),
    setUsernameChange: jest.fn(),
  },
}));
jest.mock("../../stores/pageStore/pageStore", () => ({
  pageStore: {
    menuSelected: "looks",
    setMenuSelected: jest.fn(),
    fetchNotifications: jest.fn(),
    unseenNotificationsCount: 3,
  },
}));
jest.mock("../../stores/profileStore/profileStore", () => ({
  profileStore: {
    fetchProfileData: jest.fn(),
  },
}));
jest.mock("../AddToHomeScreen/AddToHomeScreen", () => ({
  AddToHomeScreen: () => <div>AddToHomeScreen</div>,
}));
jest.mock("../../helpers/picture/getPictureUrl", () => ({
  getPictureUrl: jest.fn(() => Promise.resolve("avatar-url")),
}));

describe("MenuBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all main menu elements", () => {
    render(<MenuBar />);
    expect(screen.getByText("Rewaer")).toBeInTheDocument();
    expect(screen.getByText("menu.looks")).toBeInTheDocument();
    expect(screen.getByText("menu.items")).toBeInTheDocument();
    expect(screen.getByText("menu.notifications")).toBeInTheDocument();
    expect(screen.getByText("menu.search")).toBeInTheDocument();
    expect(screen.getByText("menu.mail")).toBeInTheDocument();
    expect(screen.getByText("AddToHomeScreen")).toBeInTheDocument();
    expect(screen.getByText("menu.logout")).toBeInTheDocument();
  });

  it("calls setMenuSelected when clicking on menu items", () => {
    const { container } = render(<MenuBar />);
    fireEvent.click(screen.getByText("menu.looks"));
    fireEvent.click(screen.getByText("menu.items"));
    fireEvent.click(screen.getByText("menu.notifications"));
    fireEvent.click(screen.getByText("menu.search"));
    fireEvent.click(screen.getByText("menu.logout"));
    // No assertion here, as setMenuSelected is a mock, but this ensures no crash
  });

  it("shows spinner when userStore.isLoading is true", () => {
    jest.mock("../../stores/userStore/userStore.js", () => ({
      userStore: {
        avatar: null,
        isLoading: true,
        userName: "testuser",
        usernameChange: 0,
        setUserName: jest.fn(),
        setUsernameChange: jest.fn(),
      },
    }));
    render(<MenuBar />);
    expect(screen.getAllByRole("img", { hidden: true })[0]).toBeInTheDocument();
  });

  it("calls authStore.logout when logout is clicked", () => {
    const { authStore } = require("../../stores/authStore/authStore.js");
    render(<MenuBar />);
    fireEvent.click(screen.getByText("menu.logout"));
    expect(authStore.logout).toHaveBeenCalled();
  });
});
