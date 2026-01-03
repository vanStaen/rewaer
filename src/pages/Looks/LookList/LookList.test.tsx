import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LookList } from "./LookList";
import { Look } from "@type/lookTypes";

// Mock stores - must be defined before jest.mock calls
const createMockLooksStore = () => ({
  looks: [] as Look[],
  showPrivateLooks: false,
  numberOfArchivedLook: 0,
  numberOfPrivateLook: 0,
  lastKnownScrollPosition: 0,
  selectedLook: null,
  setLastKnownScrollPosition: jest.fn(),
  setSelectedLook: jest.fn(),
  setOriginalScrollPosition: jest.fn(),
});

const createMockPageStore = () => ({
  showOnlyFloatingUploadForm: false,
  showFloatingUploadForm: false,
});

const createMockUserStore = () => ({
  id: 1,
  profilSettings: {
    displayArchived: false,
  },
});

let mockLooksStore = createMockLooksStore();
let mockPageStore = createMockPageStore();
let mockUserStore = createMockUserStore();

jest.mock("../looksStore", () => ({
  get looksStore() {
    return mockLooksStore;
  },
}));

jest.mock("@stores/pageStore/pageStore", () => ({
  get pageStore() {
    return mockPageStore;
  },
}));

jest.mock("@stores/userStore/userStore.js", () => ({
  get userStore() {
    return mockUserStore;
  },
}));

jest.mock("@components/GhostCard/GhostCard", () => ({
  GhostCard: ({ numberOfCards }: { numberOfCards: number }) => (
    <div data-testid="ghost-card" data-number={String(numberOfCards)}>
      GhostCard
    </div>
  ),
}));

jest.mock("@components/ElementCard/ElementCard", () => ({
  ElementCard: ({ element, type }: { element: Look; type: string }) => (
    <div data-testid={`element-card-${element.id}`} data-type={type}>
      {element.title}
    </div>
  ),
}));

jest.mock("@components/UploadModal/UploadModal", () => ({
  UploadModal: ({ page }: { page: string }) => (
    <div data-testid="upload" data-page={page}>
      Upload
    </div>
  ),
}));

describe("LookList", () => {
  const mockLook1: Look = {
    id: 1,
    title: "Test Look 1",
    brand: "Test Brand",
    category: "Test Category",
    colors: ["red", "blue"],
    pattern: "solid",
    active: true,
    favorite: false,
    private: false,
    mediaId: "media-1",
    likes: [],
    dislikes: [],
    createdAt: "2023-01-01T00:00:00.000Z",
    user: {
      id: 1,
      userName: "testuser",
    },
    items: [],
  };

  const mockLook2: Look = {
    id: 2,
    title: "Test Look 2",
    brand: "Test Brand",
    category: "Test Category",
    colors: ["black", "white"],
    pattern: "striped",
    active: true,
    favorite: false,
    private: true,
    mediaId: "media-2",
    likes: [],
    dislikes: [],
    createdAt: "2023-01-02T00:00:00.000Z",
    user: {
      id: 1,
      userName: "testuser",
    },
    items: [],
  };

  const mockLook3: Look = {
    id: 3,
    title: "Test Look 3",
    brand: "Test Brand",
    category: "Test Category",
    colors: ["green"],
    pattern: "solid",
    active: false,
    favorite: false,
    private: false,
    mediaId: "media-3",
    likes: [],
    dislikes: [],
    createdAt: "2023-01-03T00:00:00.000Z",
    user: {
      id: 1,
      userName: "testuser",
    },
    items: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockLooksStore = createMockLooksStore();
    mockPageStore = createMockPageStore();
    mockUserStore = createMockUserStore();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the LookList component with Upload", () => {
    render(<LookList />);

    const upload = screen.getByTestId("upload");
    expect(upload).toBeInTheDocument();
    expect(upload).toHaveAttribute("data-page", "looks");
  });

  it("renders looks from the store", () => {
    mockLooksStore.looks = [mockLook1, mockLook2];

    render(<LookList />);

    expect(screen.getByTestId("element-card-1")).toBeInTheDocument();
    expect(screen.getByText("Test Look 1")).toBeInTheDocument();
  });

  it("filters out private looks when showPrivateLooks is false", () => {
    mockLooksStore.looks = [mockLook1, mockLook2];
    mockLooksStore.showPrivateLooks = false;

    render(<LookList />);

    expect(screen.getByTestId("element-card-1")).toBeInTheDocument();
    expect(screen.queryByTestId("element-card-2")).not.toBeInTheDocument();
  });

  it("shows private looks when showPrivateLooks is true", () => {
    mockLooksStore.looks = [mockLook1, mockLook2];
    mockLooksStore.showPrivateLooks = true;

    render(<LookList />);

    expect(screen.getByTestId("element-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("element-card-2")).toBeInTheDocument();
  });

  it("filters out archived looks when displayArchived is false", () => {
    mockLooksStore.looks = [mockLook1, mockLook3];
    mockUserStore.profilSettings = {
      displayArchived: false,
    };

    render(<LookList />);

    expect(screen.getByTestId("element-card-1")).toBeInTheDocument();
    expect(screen.queryByTestId("element-card-3")).not.toBeInTheDocument();
  });

  it("shows archived looks when displayArchived is true", () => {
    mockLooksStore.looks = [mockLook1, mockLook3];
    mockUserStore.profilSettings = {
      displayArchived: true,
    };

    render(<LookList />);

    expect(screen.getByTestId("element-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("element-card-3")).toBeInTheDocument();
  });

  it("renders GhostCard component", () => {
    render(<LookList />);

    const ghostCard = screen.getByTestId("ghost-card");
    expect(ghostCard).toBeInTheDocument();
  });

  it("handles scroll events", () => {
    render(<LookList />);

    // Simulate scroll
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 150,
    });

    fireEvent.scroll(window);

    expect(mockLooksStore.setLastKnownScrollPosition).toHaveBeenCalledWith(150);
  });

  it("adds and removes event listeners on mount and unmount", () => {
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = render(<LookList />);

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );
  });

  it("handles resize events to recalculate missing cards", () => {
    render(<LookList />);

    // Trigger resize
    fireEvent(window, new Event("resize"));

    // GhostCard should be updated
    const ghostCard = screen.getByTestId("ghost-card");
    expect(ghostCard).toBeInTheDocument();
  });

  it("renders empty list when no looks are present", () => {
    mockLooksStore.looks = [];

    render(<LookList />);

    expect(screen.queryByTestId(/element-card-/)).not.toBeInTheDocument();
    expect(screen.getByTestId("upload")).toBeInTheDocument();
    expect(screen.getByTestId("ghost-card")).toBeInTheDocument();
  });

  it("handles mixed active and inactive looks correctly", () => {
    mockLooksStore.looks = [mockLook1, mockLook3];
    mockUserStore.profilSettings = {
      displayArchived: false,
    };

    render(<LookList />);

    // Only active look should be visible
    expect(screen.getByTestId("element-card-1")).toBeInTheDocument();
    expect(screen.queryByTestId("element-card-3")).not.toBeInTheDocument();
  });

  it("applies correct type prop to ElementCard", () => {
    mockLooksStore.looks = [mockLook1];

    render(<LookList />);

    const elementCard = screen.getByTestId("element-card-1");
    expect(elementCard).toHaveAttribute("data-type", "looks");
  });

  it("handles null profilSettings gracefully", () => {
    mockLooksStore.looks = [mockLook1];
    mockUserStore.profilSettings = null as any;

    // Should not throw error
    expect(() => render(<LookList />)).not.toThrow();
  });

  it("calculates missing cards with different scenarios", () => {
    mockLooksStore.looks = [mockLook1, mockLook2, mockLook3];

    render(<LookList />);

    const ghostCard = screen.getByTestId("ghost-card");
    expect(ghostCard).toBeInTheDocument();
    // The data-number attribute should contain a number (even if it's 0)
    expect(ghostCard).toHaveAttribute("data-number");
  });

  it("respects showOnlyFloatingUploadForm setting", () => {
    mockLooksStore.looks = [mockLook1];
    mockPageStore.showOnlyFloatingUploadForm = false;

    render(<LookList />);

    // Upload should be visible
    expect(screen.getByTestId("upload")).toBeInTheDocument();
  });

  it("handles multiple private and archived looks correctly", () => {
    const privateLook: Look = { ...mockLook1, id: 4, private: true };
    const archivedLook: Look = { ...mockLook1, id: 5, active: false };

    mockLooksStore.looks = [mockLook1, privateLook, archivedLook];
    mockLooksStore.showPrivateLooks = false;
    mockUserStore.profilSettings = {
      displayArchived: false,
    };

    render(<LookList />);

    // Only the public active look should be visible
    expect(screen.getByTestId("element-card-1")).toBeInTheDocument();
    expect(screen.queryByTestId("element-card-4")).not.toBeInTheDocument();
    expect(screen.queryByTestId("element-card-5")).not.toBeInTheDocument();
  });
});
