import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Avatar } from "./Avatar";

// Mock dependencies
jest.mock("../../../stores/userStore/userStore.js", () => ({
  userStore: {
    userName: "currentUser",
    avatar: "avatar.jpg",
    setAvatar: jest.fn(),
  },
}));
jest.mock("../../../stores/profileStore/profileStore", () => ({
  profileStore: {
    userName: "profileUser",
    avatar: "profileAvatar.jpg",
  },
}));
jest.mock("../../../helpers/picture/postPicture", () => ({
  postPicture: jest.fn(() => Promise.resolve({ path: "newAvatar.jpg" })),
}));
jest.mock("./updateAvatar", () => ({
  updateAvatar: jest.fn(() => Promise.resolve(true)),
}));
jest.mock("../../../hooks/useMediaUrl", () => ({
  useMediaUrl: jest.fn(() => ["mediaUrl.jpg", false, null]),
}));
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: () => new Promise(() => {}) }
  }),
}));

describe("Avatar component", () => {
  it("renders loading spinner when uploading", async () => {
    const userStore = require("../../../stores/userStore/userStore.js").userStore;
    const profileStore = require("../../../stores/profileStore/profileStore").profileStore;
    userStore.userName = "sameUser";
    profileStore.userName = "sameUser";
    render(<Avatar />);
    const input = screen.getByTestId("fileSelectInput");
    // Simulate file selection to trigger uploading state
    act( async () => {
    fireEvent.change(input, { target: { files: [new File([""], "avatar.png", { type: "image/png" })] } });
    });
    // Wait for spinner to appear
    const spinner = document.querySelector(".ant-spin-dot");
    expect(spinner).toBeInTheDocument();
  });

  it("renders error icon when mediaError is true", () => {
    // Override useMediaUrl to simulate error
    const useMediaUrl = require("../../../hooks/useMediaUrl").useMediaUrl;
    useMediaUrl.mockReturnValueOnce(["", false, true]);
    render(<Avatar />);
    expect(screen.getByTestId("CloseOutlined")).toBeInTheDocument();
  });

  it("renders edit button for own profile", () => {
    const userStore = require("../../../stores/userStore/userStore.js").userStore;
    const profileStore = require("../../../stores/profileStore/profileStore").profileStore;
    userStore.userName = "sameUser";
    profileStore.userName = "sameUser";
    render(<Avatar />);
    expect(screen.getByTestId("fileSelectLabel")).toBeInTheDocument();
  });

  it("calls upload logic when a file is selected", async () => {
    const { postPicture } = require("../../../helpers/picture/postPicture");
    const { updateAvatar } = require("./updateAvatar");
    const userStore = require("../../../stores/userStore/userStore.js").userStore;
    const profileStore = require("../../../stores/profileStore/profileStore").profileStore;
    userStore.userName = "sameUser";
    profileStore.userName = "sameUser";
    render(<Avatar />);
    const input = screen.getByTestId("fileSelectInput");
    // Simulate file selection
    await act(async () => {
      fireEvent.change(input, { target: { files: [new File(["dummy"], "avatar.png", { type: "image/png" })] } });
      await Promise.resolve();
    });
    expect(postPicture).toHaveBeenCalledWith(expect.any(File), "users");
    expect(updateAvatar).toHaveBeenCalledWith("newAvatar.jpg");
  });

});
