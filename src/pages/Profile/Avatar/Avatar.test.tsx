import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Avatar } from "./Avatar";

// Mock dependencies
jest.mock("../../../stores/userStore/userStore.js", () => ({
  userStore: {
    userName: "currentUser" as string | null,
    avatar: "avatar.jpg" as string | null,
    setAvatar: jest.fn(),
  },
}));
jest.mock("../../../stores/profileStore/profileStore", () => ({
  profileStore: {
    userName: "profileUser" as string | null,
    avatar: "profileAvatar.jpg" as string | null,
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
    i18n: { changeLanguage: () => new Promise(() => {}) },
  }),
}));

describe("Avatar component", () => {
  it("renders error icon when mediaError is true", async () => {
    // Override useMediaUrl to simulate error
    const { useMediaUrl } = await import("../../../hooks/useMediaUrl");
    (useMediaUrl as jest.Mock).mockReturnValueOnce(["", false, true]);
    render(<Avatar />);
    expect(screen.getByTestId("CloseOutlined")).toBeInTheDocument();
  });

  it("renders edit button for own profile", async () => {
    const { userStore } =
      await import("../../../stores/userStore/userStore.js");
    const { profileStore } =
      await import("../../../stores/profileStore/profileStore");
    (userStore.userName as string | null) = "sameUser";
    (profileStore.userName as string | null) = "sameUser";
    render(<Avatar />);
    expect(screen.getByTestId("fileSelectLabel")).toBeInTheDocument();
  });

  it("calls upload logic when a file is selected", async () => {
    const { postPicture } =
      await import("../../../helpers/picture/postPicture");
    const { updateAvatar } = await import("./updateAvatar");
    const { userStore } =
      await import("../../../stores/userStore/userStore.js");
    const { profileStore } =
      await import("../../../stores/profileStore/profileStore");
    (userStore.userName as string | null) = "sameUser";
    (profileStore.userName as string | null) = "sameUser";
    render(<Avatar />);
    const input = screen.getByTestId("fileSelectInput");
    // Simulate file selection
    await act(async () => {
      fireEvent.change(input, {
        target: {
          files: [new File(["dummy"], "avatar.png", { type: "image/png" })],
        },
      });
      await Promise.resolve();
    });
    expect(postPicture).toHaveBeenCalledWith(expect.any(File), "users");
    expect(updateAvatar).toHaveBeenCalledWith("newAvatar.jpg");
  });
});
