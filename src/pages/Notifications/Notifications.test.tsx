import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Notifications } from "./Notifications";
import { pageStore } from "@stores/pageStore/pageStore";
import { postNotificationsSeen } from "./postNotificationsSeen";
import { deleteNotification } from "./deleteNotification";

// Mock fetch globally
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

// Mock environment variable
process.env.API_URL = "https://api.example.com";

// Mock external dependencies
jest.mock("./postNotificationsSeen");
jest.mock("../../stores/pageStore/pageStore", () => ({
  pageStore: {
    notifications: [],
    setUnseenNotificationsCount: jest.fn(),
  },
}));

jest.mock("./Notification", () => ({
  Notification: ({ data }: { data: any }) => (
    <div data-testid={`notification-${data.id}`}>Notification {data.id}</div>
  ),
}));

const mockPostNotificationsSeen = postNotificationsSeen as jest.MockedFunction<
  typeof postNotificationsSeen
>;

const mockNotifications = [
  {
    id: "1",
    type: 1,
    seen: false,
    title: "testuser",
    createdAt: "2023-01-01T10:00:00Z",
    mediaUrl: "https://example.com/avatar.jpg",
    actionData: 123,
  },
  {
    id: "2",
    type: 2,
    seen: true,
    title: "anotheruser",
    createdAt: "2023-01-02T10:00:00Z",
    mediaUrl: "https://example.com/avatar2.jpg",
    actionData: 456,
  },
];

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Notifications", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    pageStore.notifications = [];
    mockPostNotificationsSeen.mockResolvedValue(undefined);
  });

  it("renders empty state when no notifications", () => {
    renderWithRouter(<Notifications />);

    expect(screen.getByText("No notification for now")).toBeInTheDocument();
  });

  it("calls postNotificationsSeen on mount", () => {
    renderWithRouter(<Notifications />);

    expect(mockPostNotificationsSeen).toHaveBeenCalledTimes(1);
  });

  it("calls setUnseenNotificationsCount(0) on mount", () => {
    renderWithRouter(<Notifications />);

    expect(pageStore.setUnseenNotificationsCount).toHaveBeenCalledWith(0);
  });

  it("renders notifications when available", () => {
    pageStore.notifications = mockNotifications;
    renderWithRouter(<Notifications />);

    expect(screen.getByTestId("notification-1")).toBeInTheDocument();
    expect(screen.getByTestId("notification-2")).toBeInTheDocument();
    expect(
      screen.queryByText("No notification for now"),
    ).not.toBeInTheDocument();
  });

  it("renders correct number of notifications", () => {
    pageStore.notifications = mockNotifications;
    renderWithRouter(<Notifications />);

    const notificationElements = screen.getAllByTestId(/notification-/);
    expect(notificationElements).toHaveLength(2);
  });

  it("passes correct data to Notification components", () => {
    pageStore.notifications = mockNotifications;
    renderWithRouter(<Notifications />);

    expect(screen.getByText("Notification 1")).toBeInTheDocument();
    expect(screen.getByText("Notification 2")).toBeInTheDocument();
  });

  it("handles single notification correctly", () => {
    pageStore.notifications = [mockNotifications[0]];
    renderWithRouter(<Notifications />);

    expect(screen.getByTestId("notification-1")).toBeInTheDocument();
    expect(screen.queryByTestId("notification-2")).not.toBeInTheDocument();
    expect(
      screen.queryByText("No notification for now"),
    ).not.toBeInTheDocument();
  });

  it("applies correct CSS class to container", () => {
    const { container } = renderWithRouter(<Notifications />);

    const notificationsContainer = container.querySelector(
      ".notifications__container",
    );
    expect(notificationsContainer).toBeInTheDocument();
  });

  it("applies correct CSS class to empty state", () => {
    renderWithRouter(<Notifications />);

    const emptyState = screen.getByText("No notification for now");
    expect(emptyState).toHaveClass("notification__nothing");
  });
});

describe("deleteNotification", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("successfully deletes notification and returns true", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
    } as Response);

    const result = await deleteNotification("123");

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.example.com/notification/",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: "123" }),
      },
    );
    expect(result).toBe(true);
  });

  it("calls fetch with correct parameters", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
    } as Response);

    await deleteNotification("test-id-456");

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.example.com/notification/",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: "test-id-456" }),
      },
    );
  });

  it("handles network error and returns null", async () => {
    const networkError = new Error("Network error");
    mockFetch.mockRejectedValue(networkError);

    const result = await deleteNotification("123");

    expect(result).toBeNull();
  });

  it("throws error for 401 unauthorized response", async () => {
    const unauthorizedError = {
      response: {
        status: 401,
        data: "Unauthorized",
      },
    };
    mockFetch.mockRejectedValue(unauthorizedError);

    await expect(deleteNotification("123")).rejects.toThrow(
      "Error! Unauthorized(401)",
    );
  });

  it("returns error response data for non-401 errors", async () => {
    const errorWithResponse = {
      response: {
        status: 500,
        data: { error: "Internal server error" },
      },
    };
    mockFetch.mockRejectedValue(errorWithResponse);

    const result = await deleteNotification("123");

    expect(result).toEqual({ error: "Internal server error" });
  });

  it("returns null for errors without response", async () => {
    const errorWithoutResponse = new Error("Some other error");
    mockFetch.mockRejectedValue(errorWithoutResponse);

    const result = await deleteNotification("123");

    expect(result).toBeNull();
  });

  it("handles empty string id", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
    } as Response);

    await deleteNotification("");

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.example.com/notification/",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: "" }),
      },
    );
  });

  it("handles fetch rejection without response property", async () => {
    const simpleError = new Error("Simple error");
    mockFetch.mockRejectedValue(simpleError);

    const result = await deleteNotification("123");

    expect(result).toBeNull();
  });
});
