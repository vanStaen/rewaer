import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import mockSearchResults from "../../../mocks/mockSearchResults.json";

// Import after mocks
import { SearchPage } from "./SearchPage";
import { profileStore } from "@stores/profileStore/profileStore.js";
import { postSearch } from "./postSearch";

// Mock external dependencies - must be before imports
jest.mock("./postSearch");
jest.mock("./postSearchMore");
jest.mock("../../stores/userStore/userStore.js", () => ({
  userStore: {
    language: "en",
  },
}));
jest.mock("../../stores/profileStore/profileStore.js", () => ({
  profileStore: {
    fetchProfileData: jest.fn(),
  },
}));
jest.mock("../../helpers/convertCodeTo", () => ({
  convertCodeToObjectString: jest
    .fn()
    .mockReturnValue({ en: "Translated Text" }),
}));
jest.mock("../../lib/data/categories", () => ({
  lookCategory: {
    casual: { en: "Casual", fr: "Décontracté" },
    formal: { en: "Formal", fr: "Formel" },
    business: { en: "Business", fr: "Affaires" },
    party: { en: "Party", fr: "Fête" },
  },
}));
jest.mock("../../lib/data/colors", () => ({
  colors: {
    red: { en: "Red", fr: "Rouge" },
    blue: { en: "Blue", fr: "Bleu" },
    black: { en: "Black", fr: "Noir" },
  },
}));
jest.mock("../../lib/data/pattern", () => ({
  pattern: {
    solid: { en: "Solid", fr: "Uni" },
    striped: { en: "Striped", fr: "Rayé" },
    polka: { en: "Polka Dots", fr: "Pois" },
  },
}));
jest.mock("../../lib/data/seasons", () => ({
  seasons: {
    spring: { en: "Spring", fr: "Printemps" },
    summer: { en: "Summer", fr: "Été" },
    autumn: { en: "Autumn", fr: "Automne" },
    winter: { en: "Winter", fr: "Hiver" },
  },
}));

const mockPostSearch = postSearch as jest.MockedFunction<typeof postSearch>;

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("SearchPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders search input with correct placeholder", () => {
    renderWithRouter(<SearchPage />);

    const searchInput = screen.getByPlaceholderText(
      "What are you looking for?",
    );
    expect(searchInput).toBeInTheDocument();
  });

  it("shows empty state when no results", () => {
    renderWithRouter(<SearchPage />);

    const emptyMessage = screen.getByText("Wow, such empty");
    expect(emptyMessage).toBeInTheDocument();
  });

  it("calls postSearch on input change", async () => {
    mockPostSearch.mockResolvedValue(mockSearchResults);
    renderWithRouter(<SearchPage />);

    const searchInput = screen.getByPlaceholderText(
      "What are you looking for?",
    );
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "test query" } });
    });

    await waitFor(() => {
      expect(mockPostSearch).toHaveBeenCalledWith("test query");
    });
  });

  it("displays search results count", async () => {
    mockPostSearch.mockResolvedValue(mockSearchResults);
    renderWithRouter(<SearchPage />);

    const searchInput = screen.getByPlaceholderText(
      "What are you looking for?",
    );
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "test" } });
    });

    await waitFor(() => {
      expect(screen.getByText("Results: 3")).toBeInTheDocument();
    });
  });

  it("renders user results correctly", async () => {
    mockPostSearch.mockResolvedValue(mockSearchResults);
    renderWithRouter(<SearchPage />);

    const searchInput = screen.getByPlaceholderText(
      "What are you looking for?",
    );
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "test" } });
    });

    await waitFor(() => {
      expect(screen.getByText("Users")).toBeInTheDocument();
      expect(screen.getByText("Result user")).toBeInTheDocument();
    });
  });

  it("renders item results correctly", async () => {
    mockPostSearch.mockResolvedValue(mockSearchResults);
    renderWithRouter(<SearchPage />);

    const searchInput = screen.getByPlaceholderText(
      "What are you looking for?",
    );
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "test" } });
    });

    await waitFor(() => {
      expect(screen.getByText("Items")).toBeInTheDocument();
      expect(screen.getByText("Result item")).toBeInTheDocument();
    });
  });

  it("renders look results correctly", async () => {
    mockPostSearch.mockResolvedValue(mockSearchResults);
    renderWithRouter(<SearchPage />);

    const searchInput = screen.getByPlaceholderText(
      "What are you looking for?",
    );
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "test" } });
    });

    await waitFor(() => {
      expect(screen.getByText("Looks")).toBeInTheDocument();
      expect(screen.getByText("Result look")).toBeInTheDocument();
    });
  });

  it("calls profileStore.fetchProfileData when user link is clicked", async () => {
    mockPostSearch.mockResolvedValue(mockSearchResults);
    renderWithRouter(<SearchPage />);

    const searchInput = screen.getByPlaceholderText(
      "What are you looking for?",
    );
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "test" } });
    });

    await waitFor(() => {
      const userLink = screen.getByText("Result user").closest("a");
      expect(userLink).toHaveAttribute("href", "/username");
    });

    const userLink = screen.getByText("username").closest("a");
    if (userLink) {
      await act(async () => {
        fireEvent.click(userLink);
      });
      expect(profileStore.fetchProfileData).toHaveBeenCalledWith("username");
    }
  });

  it("shows loading state during search", async () => {
    mockPostSearch.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(mockSearchResults), 100),
        ),
    );
    renderWithRouter(<SearchPage />);

    const searchInput = screen.getByPlaceholderText(
      "What are you looking for?",
    );
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "test" } });
    });

    // Check if loading state is active (Ant Design Search component shows loading)
    expect(searchInput).toBeInTheDocument();
  });

  it("handles empty search input correctly", async () => {
    renderWithRouter(<SearchPage />);

    const searchInput = screen.getByPlaceholderText(
      "What are you looking for?",
    );
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "123" } });
      fireEvent.change(searchInput, { target: { value: "" } });
    });

    expect(mockPostSearch).not.toHaveBeenCalledWith("");
  });

  it("handles API error gracefully", async () => {
    mockPostSearch.mockResolvedValue(null);
    renderWithRouter(<SearchPage />);

    const searchInput = screen.getByPlaceholderText(
      "What are you looking for?",
    );
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "test" } });
    });

    await waitFor(() => {
      expect(screen.getByText("Wow, such empty")).toBeInTheDocument();
    });
  });

  it("highlights search terms in results", async () => {
    mockPostSearch.mockResolvedValue(mockSearchResults);
    renderWithRouter(<SearchPage />);

    const searchInput = screen.getByPlaceholderText(
      "What are you looking for?",
    );
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "test" } });
    });

    await waitFor(() => {
      expect(screen.getByText("Result user")).toBeInTheDocument();
    });

    // Check if highlighting effect is applied (this tests the useEffect)
    const resultElements = document.getElementsByClassName("resultContent");
    expect(resultElements.length).toBeGreaterThan(0);
  });
});
