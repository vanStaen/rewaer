import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { DetailView } from "./DetailView";
import * as switchElementModule from "./switchElement";
import * as useMediaUrlModule from "@hooks/useMediaUrl";

jest.mock("@components/DetailReturnArrow/DetailReturnArrow", () => ({
  DetailReturnArrow: ({ page }: any) => (
    <div data-testid="detail-return-arrow">DetailReturnArrow-{page}</div>
  ),
}));

jest.mock("@components/ImageEditBar/ImageEditBar", () => ({
  ImageEditBar: ({ loading, error }: any) => (
    <div data-testid="image-edit-bar">
      ImageEditBar-loading:{loading ? "true" : "false"}-error:
      {error ? "true" : "false"}
    </div>
  ),
}));

jest.mock("@hooks/useMediaUrl", () => ({
  useMediaUrl: jest.fn(() => ["http://example.com/image.jpg", false, null]),
}));

jest.mock("./switchElement.js", () => ({
  switchElement: jest.fn(),
}));

type TouchEventOptions = {
  targetTouches: Array<{ clientX: number }>;
};

const defaultProps = {
  isLoading: false,
  page: "items" as const,
  canEdit: false,
  selectedElement: { id: 1, mediaId: "123" },
  setSelectedElement: jest.fn(),
  showPrivate: false,
};

describe("DetailView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock history.pushState
    jest.spyOn(window.history, "pushState").mockImplementation(() => {});
    // Reset useMediaUrl to default mock
    (useMediaUrlModule.useMediaUrl as jest.Mock).mockReturnValue([
      "http://example.com/image.jpg",
      false,
      null,
    ]);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Rendering", () => {
    it("renders without crashing with default props", () => {
      render(<DetailView {...defaultProps} />);
      expect(screen.getByTestId("detail-return-arrow")).toBeInTheDocument();
    });

    it("renders the container with correct class", () => {
      const { container } = render(<DetailView {...defaultProps} />);
      expect(
        container.querySelector(".detailview__container"),
      ).toBeInTheDocument();
    });

    it("renders DetailReturnArrow with correct page prop", () => {
      render(<DetailView {...defaultProps} page="looks" />);
      expect(screen.getByText("DetailReturnArrow-looks")).toBeInTheDocument();
    });

    it("renders ImageEditBar when canEdit is true", () => {
      render(<DetailView {...defaultProps} canEdit={true} />);
      expect(screen.getByTestId("image-edit-bar")).toBeInTheDocument();
    });

    it("does not render ImageEditBar when canEdit is false", () => {
      render(<DetailView {...defaultProps} canEdit={false} />);
      expect(screen.queryByTestId("image-edit-bar")).not.toBeInTheDocument();
    });

    it("renders children when isLoading is false", () => {
      render(
        <DetailView {...defaultProps} isLoading={false} page="items">
          <div data-testid="test-child">Test Child Content</div>
        </DetailView>,
      );
      expect(screen.getByTestId("test-child")).toBeInTheDocument();
    });

    it("renders loading spinner when isLoading is true", () => {
      const { container } = render(
        <DetailView {...defaultProps} isLoading={true}>
          <div data-testid="test-child">Test Child Content</div>
        </DetailView>,
      );
      expect(screen.queryByTestId("test-child")).not.toBeInTheDocument();
      expect(
        container.querySelector(".detailview__spinner"),
      ).toBeInTheDocument();
    });
  });

  describe("Media Loading States", () => {
    it("renders media error message when loadingMediaError is present", () => {
      (useMediaUrlModule.useMediaUrl as jest.Mock).mockReturnValue([
        "",
        false,
        new Error("Error"),
      ]);
      const { container } = render(<DetailView {...defaultProps} />);
      expect(screen.getByText("MEDIA ERROR TODO")).toBeInTheDocument();
      expect(
        container.querySelector(".detailview__picture"),
      ).toBeInTheDocument();
    });

    it("renders spinner when media is loading", () => {
      (useMediaUrlModule.useMediaUrl as jest.Mock).mockReturnValue([
        "",
        true,
        null,
      ]);
      const { container } = render(<DetailView {...defaultProps} />);
      expect(
        container.querySelectorAll(".detailview__spinner").length,
      ).toBeGreaterThan(0);
    });

    it("renders picture with background image URL when media is loaded", () => {
      const { container } = render(<DetailView {...defaultProps} />);
      const picture = container.querySelector(".detailview__picture");
      expect(picture).toHaveStyle({
        background: "url(http://example.com/image.jpg)",
      });
    });

    it("renders picture with correct id attribute", () => {
      const { container } = render(
        <DetailView
          {...defaultProps}
          selectedElement={{ id: 42, mediaId: "456" }}
        />,
      );
      const picture = container.querySelector("#selected_item_picture_42");
      expect(picture).toBeInTheDocument();
    });
  });

  describe("Keyboard Events", () => {
    it("calls setSelectedElement(null) when Escape key is pressed", () => {
      const setSelectedElement = jest.fn();
      render(
        <DetailView
          {...defaultProps}
          setSelectedElement={setSelectedElement}
        />,
      );
      fireEvent.keyDown(window, { key: "Escape" });
      expect(setSelectedElement).toHaveBeenCalledWith(null);
    });

    it("calls switchElement(false, showPrivate) when ArrowLeft is pressed", () => {
      render(<DetailView {...defaultProps} showPrivate={true} />);
      fireEvent.keyDown(window, { key: "ArrowLeft" });
      expect(switchElementModule.switchElement).toHaveBeenCalledWith(
        false,
        true,
        "items",
      );
    });

    it("calls switchElement(true, showPrivate) when ArrowRight is pressed", () => {
      render(<DetailView {...defaultProps} showPrivate={false} />);
      fireEvent.keyDown(window, { key: "ArrowRight" });
      expect(switchElementModule.switchElement).toHaveBeenCalledWith(
        true,
        false,
        "items",
      );
    });

    it("does not call switchElement for other key presses", () => {
      render(<DetailView {...defaultProps} />);
      fireEvent.keyDown(window, { key: "Enter" });
      expect(switchElementModule.switchElement).not.toHaveBeenCalled();
    });

    it("handles uppercase key names", () => {
      const setSelectedElement = jest.fn();
      render(
        <DetailView
          {...defaultProps}
          setSelectedElement={setSelectedElement}
        />,
      );
      fireEvent.keyDown(window, { key: "ESCAPE" });
      expect(setSelectedElement).toHaveBeenCalledWith(null);
    });
  });

  describe("Touch Swipe Events", () => {
    it("handles right swipe gesture (swipe right with distance > MIN_SWIPE_DISTANCE)", () => {
      const { container } = render(
        <DetailView {...defaultProps} showPrivate={true} />,
      );
      const detailviewContainer = container.querySelector(
        ".detailview__container",
      );

      if (detailviewContainer) {
        act(() => {
          fireEvent.touchStart(detailviewContainer, {
            targetTouches: [{ clientX: 100 }],
          } as unknown as TouchEventOptions);
        });
        act(() => {
          fireEvent.touchMove(detailviewContainer, {
            targetTouches: [{ clientX: 300 }],
          } as unknown as TouchEventOptions);
        });
        act(() => {
          fireEvent.touchEnd(detailviewContainer);
        });

        expect(switchElementModule.switchElement).toHaveBeenCalledWith(
          false,
          true,
          "items",
        );
      }
    });

    it("handles left swipe gesture (swipe left with distance > MIN_SWIPE_DISTANCE)", () => {
      const { container } = render(
        <DetailView {...defaultProps} showPrivate={true} />,
      );
      const detailviewContainer = container.querySelector(
        ".detailview__container",
      );

      if (detailviewContainer) {
        act(() => {
          fireEvent.touchStart(detailviewContainer, {
            targetTouches: [{ clientX: 300 }],
          } as unknown as TouchEventOptions);
        });
        act(() => {
          fireEvent.touchMove(detailviewContainer, {
            targetTouches: [{ clientX: 100 }],
          } as unknown as TouchEventOptions);
        });
        act(() => {
          fireEvent.touchEnd(detailviewContainer);
        });

        expect(switchElementModule.switchElement).toHaveBeenCalledWith(
          true,
          true,
          "items",
        );
      }
    });

    it("does not call switchElement for small swipe distances", () => {
      const { container } = render(<DetailView {...defaultProps} />);
      const detailviewContainer = container.querySelector(
        ".detailview__container",
      );

      if (detailviewContainer) {
        act(() => {
          fireEvent.touchStart(detailviewContainer, {
            targetTouches: [{ clientX: 100 }],
          } as unknown as TouchEventOptions);
        });
        act(() => {
          fireEvent.touchMove(detailviewContainer, {
            targetTouches: [{ clientX: 110 }],
          } as unknown as TouchEventOptions);
        });
        act(() => {
          fireEvent.touchEnd(detailviewContainer);
        });

        expect(switchElementModule.switchElement).not.toHaveBeenCalled();
      }
    });

    it("handles case when touchStart is null", () => {
      const { container } = render(<DetailView {...defaultProps} />);
      const detailviewContainer = container.querySelector(
        ".detailview__container",
      );

      if (detailviewContainer) {
        act(() => {
          fireEvent.touchEnd(detailviewContainer);
        });

        expect(switchElementModule.switchElement).not.toHaveBeenCalled();
      }
    });

    it("handles case when touchEnd is null", () => {
      const { container } = render(<DetailView {...defaultProps} />);
      const detailviewContainer = container.querySelector(
        ".detailview__container",
      );

      if (detailviewContainer) {
        act(() => {
          fireEvent.touchStart(detailviewContainer, {
            targetTouches: [{ clientX: 100 }],
          } as unknown as TouchEventOptions);
          fireEvent.touchEnd(detailviewContainer);
        });

        expect(switchElementModule.switchElement).not.toHaveBeenCalled();
      }
    });
  });

  describe("Swipe Throttling", () => {
    it("throttles swipe events to prevent multiple rapid calls", () => {
      jest.useFakeTimers();
      const { container } = render(<DetailView {...defaultProps} />);
      const detailviewContainer = container.querySelector(
        ".detailview__container",
      );

      if (detailviewContainer) {
        // First swipe
        act(() => {
          fireEvent.touchStart(detailviewContainer, {
            targetTouches: [{ clientX: 300 }],
          } as unknown as TouchEventOptions);
        });
        act(() => {
          fireEvent.touchMove(detailviewContainer, {
            targetTouches: [{ clientX: 100 }],
          } as unknown as TouchEventOptions);
        });
        act(() => {
          fireEvent.touchEnd(detailviewContainer);
        });

        // Second swipe immediately after
        act(() => {
          fireEvent.touchStart(detailviewContainer, {
            targetTouches: [{ clientX: 300 }],
          } as unknown as TouchEventOptions);
        });
        act(() => {
          fireEvent.touchMove(detailviewContainer, {
            targetTouches: [{ clientX: 100 }],
          } as unknown as TouchEventOptions);
        });
        act(() => {
          fireEvent.touchEnd(detailviewContainer);
        });

        // Should only be called once due to throttling
        expect(switchElementModule.switchElement).toHaveBeenCalledTimes(1);

        // After timeout, swipe should work again
        act(() => {
          jest.advanceTimersByTime(500);
        });

        act(() => {
          fireEvent.touchStart(detailviewContainer, {
            targetTouches: [{ clientX: 300 }],
          } as unknown as TouchEventOptions);
        });
        act(() => {
          fireEvent.touchMove(detailviewContainer, {
            targetTouches: [{ clientX: 100 }],
          } as unknown as TouchEventOptions);
        });
        act(() => {
          fireEvent.touchEnd(detailviewContainer);
        });

        expect(switchElementModule.switchElement).toHaveBeenCalledTimes(2);
      }
      jest.useRealTimers();
    });
  });

  describe("Event Listeners", () => {
    it("adds keydown and popstate event listeners on mount", () => {
      const addEventListenerSpy = jest.spyOn(window, "addEventListener");
      render(<DetailView {...defaultProps} />);
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function),
      );
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "popstate",
        expect.any(Function),
      );
      addEventListenerSpy.mockRestore();
    });

    it("removes keydown and popstate event listeners on unmount", () => {
      const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
      const { unmount } = render(<DetailView {...defaultProps} />);
      unmount();
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function),
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "popstate",
        expect.any(Function),
      );
      removeEventListenerSpy.mockRestore();
    });

    it("calls pushState on mount", () => {
      const pushStateSpy = jest.spyOn(window.history, "pushState");
      render(<DetailView {...defaultProps} />);
      expect(pushStateSpy).toHaveBeenCalled();
      pushStateSpy.mockRestore();
    });

    it("calls setSelectedElement(null) on popstate event", () => {
      const setSelectedElement = jest.fn();
      render(
        <DetailView
          {...defaultProps}
          setSelectedElement={setSelectedElement}
        />,
      );
      fireEvent.popState(window);
      expect(setSelectedElement).toHaveBeenCalledWith(null);
    });
  });

  describe("useMediaUrl Hook", () => {
    it("calls useMediaUrl with correct parameters", () => {
      render(
        <DetailView
          {...defaultProps}
          selectedElement={{ id: 1, mediaId: "test-media-id" }}
        />,
      );
      expect(useMediaUrlModule.useMediaUrl).toHaveBeenCalledWith(
        "test-media-id",
        "items",
        "m",
      );
    });

    it("updates when selectedElement.mediaId changes", () => {
      const { rerender } = render(
        <DetailView
          {...defaultProps}
          selectedElement={{ id: 1, mediaId: "first-id" }}
        />,
      );
      expect(useMediaUrlModule.useMediaUrl).toHaveBeenCalledWith(
        "first-id",
        "items",
        "m",
      );

      rerender(
        <DetailView
          {...defaultProps}
          selectedElement={{ id: 1, mediaId: "second-id" }}
        />,
      );
      expect(useMediaUrlModule.useMediaUrl).toHaveBeenCalledWith(
        "second-id",
        "items",
        "m",
      );
    });
  });
});
