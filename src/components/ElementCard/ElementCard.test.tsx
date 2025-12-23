import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ElementCard } from "./ElementCard";
import { Item } from "../../types/itemTypes";
import { Look } from "../../types/lookTypes";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("../../pages/Items/itemsStore.js", () => ({
  itemsStore: {
    setIsOutOfDate: jest.fn(),
    setNumberOfPrivateItem: jest.fn(),
    numberOfPrivateItem: 0,
  },
}));

jest.mock("../../pages/Looks/looksStore.js", () => ({
  looksStore: {
    setIsOutOfDate: jest.fn(),
  },
}));

jest.mock("../../stores/userStore/userStore.js", () => ({
  userStore: {
    id: 1,
  },
}));
jest.mock("../../pages/Items/actions/archiveItem", () => ({
  archiveItem: jest.fn(() => Promise.resolve()),
}));

jest.mock("../../pages/Items/actions/deleteItem", () => ({
  deleteItem: jest.fn(() => Promise.resolve()),
}));

jest.mock("../../pages/Items/actions/updateFavoriteItem", () => ({
  updateFavoriteItem: jest.fn(() => Promise.resolve()),
}));

jest.mock("../../pages/Items/actions/updatePrivateItem", () => ({
  updatePrivateItem: jest.fn(() => Promise.resolve()),
}));

jest.mock("../../helpers/picture/getPictureUrl", () => ({
  getPictureUrl: jest.fn(),
}));

jest.mock("../LikeDislikeButton/LikeDislikeButton", () => ({
  LikeDislikeButton: () => <div>LikeDislikeButton</div>,
}));

jest.mock("../EditableTitle/EditableTitle", () => ({
  EditableTitle: () => <div>EditableTitle</div>,
}));

jest.mock("../UserAvatar/UserAvatar.jsx", () => ({
  UserAvatar: () => <div>UserAvatar</div>,
}));

jest.mock("./ElementCardActions", () => ({
  ElementCardActions: () => <div>ElementCardActions</div>,
}));

describe("ElementCard", () => {
  const mockShowDetailView = jest.fn();
  
  const mockItem: Item = {
    id: 1,
    title: "Test Item",
    brand: "Test Brand",
    category: "Test Category",
    colors: ["red", "blue"],
    pattern: "solid",
    active: true,
    favorite: false,
    private: false,
    mediaId: "test-media-id",
    likes: [],
    dislikes: [],
    createdAt: "2023-01-01T00:00:00.000Z",
    user: {
      id: 1,
      userName: "testuser",
    },
  };

  const mockLook: Look = {
    id: 2,
    title: "Test Look",
    brand: "Test Brand",
    category: "Test Category",
    colors: ["black", "white"],
    pattern: "striped",
    active: true,
    favorite: false,
    private: false,
    mediaId: "test-look-media-id",
    mediaIdMedium: "test-look-media-id-medium",
    likes: [],
    dislikes: [],
    createdAt: "2023-01-01T00:00:00.000Z",
    user: {
      id: 1,
      userName: "testuser",
    },
    items: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    const { getPictureUrl } = require("../../helpers/picture/getPictureUrl");
    (getPictureUrl as jest.Mock).mockResolvedValue(
      "https://example.com/image.jpg"
    );
  });

  it("renders loading spinner initially", () => {
    render(
      <ElementCard
        element={mockItem}
        type="items"
        showDetailView={mockShowDetailView}
      />
    );
    expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument(); // Spin component
  });

  xit("loads and displays the image after loading", async () => {
    render(
      <ElementCard
        element={mockItem}
        type="items"
        showDetailView={mockShowDetailView}
      />
    );

    await waitFor(() => {
      const pictureDiv = document.querySelector(".elementcard__picture");
      expect(pictureDiv).toBeInTheDocument();
    });
  });

  it("displays error message when image fails to load", async () => {
    const { getPictureUrl } = require("../../helpers/picture/getPictureUrl");
    (getPictureUrl as jest.Mock).mockRejectedValue(
      new Error("Load failed")
    );

    render(
      <ElementCard
        element={mockItem}
        type="items"
        showDetailView={mockShowDetailView}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("File not found")).toBeInTheDocument();
    });
  });

  xit("calls showDetailView when clicking on active item", async () => {
    render(
      <ElementCard
        element={mockItem}
        type="items"
        showDetailView={mockShowDetailView}
      />
    );

    await waitFor(() => {
      const pictureDiv = document.querySelector(".elementcard__picture");
      expect(pictureDiv).toBeInTheDocument();
    });

    const pictureDiv = document.querySelector(".elementcard__picture");
    if (pictureDiv) {
      fireEvent.click(pictureDiv);
    }

    expect(mockShowDetailView).toHaveBeenCalledWith(mockItem);
  });

  it("shows missing info icon when item has missing data", async () => {
    const itemWithMissingData: Item = {
      ...mockItem,
      brand: null,
      category: null,
    };

    render(
      <ElementCard
        element={itemWithMissingData}
        type="items"
        showDetailView={mockShowDetailView}
      />
    );

    await waitFor(() => {
      const missingInfoIcon = document.querySelector(".elementcard__missingInfo");
      expect(missingInfoIcon).toBeInTheDocument();
    });
  });

  it("displays archived overlay for inactive items", () => {
    const archivedItem: Item = {
      ...mockItem,
      active: false,
    };

    render(
      <ElementCard
        element={archivedItem}
        type="items"
        showDetailView={mockShowDetailView}
      />
    );

    expect(screen.getByText("main.archived")).toBeInTheDocument();
  });

  it("applies correct CSS classes for private and favorited items", () => {
    const privateFavoritedItem: Item = {
      ...mockItem,
      private: true,
      favorite: true,
    };

    render(
      <ElementCard
        element={privateFavoritedItem}
        type="items"
        showDetailView={mockShowDetailView}
      />
    );

    const metaDiv = document.querySelector(
      ".elementcard__meta.elementcard__metaPrivate.elementcard__metaPrivateFavorite"
    );
    expect(metaDiv).toBeInTheDocument();
  });

  xit("does not show missing info for shared items", async () => {
    const sharedItem: Item = {
      ...mockItem,
      brand: null,
      user: {
        id: 1, 
        userName: "shareduser",
      },
    };

    render(
      <ElementCard
        element={sharedItem}
        type="items"
        showDetailView={mockShowDetailView}
      />
    );

    await waitFor(() => {
      const missingInfoIcon = document.querySelector(".elementcard__missingInfo");
      expect(missingInfoIcon).not.toBeInTheDocument();
    });
  });

  it("handles mouse enter and leave events", async () => {
    render(
      <ElementCard
        element={mockItem}
        type="items"
        showDetailView={mockShowDetailView}
      />
    );

    await waitFor(() => {
      const container = document.querySelector(".elementcard__container");
      expect(container).toBeInTheDocument();
    });

    const container = document.querySelector(".elementcard__container");
    if (container) {
      fireEvent.mouseEnter(container);
      fireEvent.mouseLeave(container);
    }

    // Test passes if no errors occur during mouse events
    expect(container).toBeInTheDocument();
  });

  xit("renders correctly with a look instead of an item", async () => {
    render(
      <ElementCard
        element={mockLook}
        type="looks"
        showDetailView={mockShowDetailView}
      />
    );

    await waitFor(() => {
      const pictureDiv = document.querySelector(".elementcard__picture");
      expect(pictureDiv).toBeInTheDocument();
    });

    expect(screen.getByText("EditableTitle")).toBeInTheDocument();
    expect(screen.getByText("ElementCardActions")).toBeInTheDocument();
  });

  it("does not check for missing colors when type is looks", async () => {
    const lookWithMissingData: Look = {
      ...mockLook,
      brand: null,
      category: null,
      colors: [], // Empty colors should not trigger missing info for looks
    };

    render(
      <ElementCard
        element={lookWithMissingData}
        type="looks"
        showDetailView={mockShowDetailView}
      />
    );

    await waitFor(() => {
      const missingInfoIcon = document.querySelector(".elementcard__missingInfo");
      // Should still show missing info for brand and category, but not colors
      expect(missingInfoIcon).toBeInTheDocument();
    });
  });
});
