import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Banner, BannerProps } from "./Banner";

describe("Banner", () => {
  const defaultProps: BannerProps = {
    id: "test-banner",
    desc: "Test Banner Description",
    show: true,
  };

  beforeEach(() => {
    // Clean up any banners in the DOM
    const banner = document.getElementById(defaultProps.id);
    if (banner && banner.parentNode) {
      banner.parentNode.removeChild(banner);
    }
  });

  it("renders the banner with description", () => {
    render(<Banner {...defaultProps} />);
    expect(screen.getByText("Test Banner Description")).toBeInTheDocument();
  });

  it("calls closeHandler and hides the banner on close click", () => {
    jest.useFakeTimers();
    render(<Banner {...defaultProps} />);
    const closeBtn = screen.getByTestId("closeButton");
    act(() => {
      fireEvent.click(closeBtn);
      jest.advanceTimersByTime(500);
    });
    const banner = document.getElementById(defaultProps.id);
    expect(banner?.style.maxHeight).toBe("0");
    expect(banner?.style.visibility).toBe("hidden");
    jest.useRealTimers();
  });

  it("shows and hides the banner based on props.show", () => {
    jest.useFakeTimers();
    const { rerender } = render(<Banner {...defaultProps} show={true} />);
    let banner = document.getElementById(defaultProps.id);
    // Simulate effect for show=true
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(banner?.style.visibility).toBe("visible");
    expect(banner?.style.maxHeight).toBe("100px");

    // Now hide the banner
    rerender(<Banner {...defaultProps} show={false} />);
    banner = document.getElementById(defaultProps.id);
    expect(banner?.style.maxHeight).toBe("0");
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(banner?.style.visibility).toBe("hidden");
    jest.useRealTimers();
  });
});
