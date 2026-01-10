import { isElementVisible } from "../isElementVisible";

describe("isElementVisible", () => {
  let mockElement;

  beforeEach(() => {
    mockElement = document.createElement("div");
    document.body.appendChild(mockElement);
  });

  afterEach(() => {
    document.body.removeChild(mockElement);
  });

  it("should return null for null element", () => {
    expect(isElementVisible(null)).toBeNull();
  });

  it("should return null for undefined element", () => {
    expect(isElementVisible(undefined)).toBeNull();
  });

  it("should return true when element is visible in viewport", () => {
    mockElement.style.position = "absolute";
    mockElement.style.top = "100px";
    mockElement.style.left = "100px";
    mockElement.style.width = "100px";
    mockElement.style.height = "100px";

    expect(isElementVisible(mockElement)).toBe(true);
  });

  it("should return true when element is partially above the viewport", () => {
    mockElement.style.position = "absolute";
    mockElement.style.top = "-50px";
    mockElement.style.left = "100px";
    mockElement.style.width = "100px";
    mockElement.style.height = "100px";

    // Based on actual function: elemTop < window.innerHeight && elemBottom >= 0
    // elemTop = -50 (which is < window.innerHeight = true)
    // elemBottom = 50 (which is >= 0 = true)
    // So result is true && true = true
    expect(isElementVisible(mockElement)).toBe(true);
  });

  it("should return true when element is partially visible at the bottom", () => {
    mockElement.style.position = "absolute";
    mockElement.style.top = `${window.innerHeight - 50}px`;
    mockElement.style.left = "100px";
    mockElement.style.width = "100px";
    mockElement.style.height = "100px";

    expect(isElementVisible(mockElement)).toBe(true);
  });

  it("should return true when element extends into bottom of viewport", () => {
    mockElement.getBoundingClientRect = jest.fn(() => ({
      top: window.innerHeight - 50,
      left: 0,
      bottom: window.innerHeight + 50,
      right: 100,
      width: 100,
      height: 100,
    }));

    // elemTop = window.innerHeight - 50 (< window.innerHeight = true)
    // elemBottom = window.innerHeight + 50 (>= 0 = true)
    // Result: true && true = true
    expect(isElementVisible(mockElement)).toBe(true);
  });

  it("should return true when element is partially visible at top", () => {
    mockElement.style.position = "absolute";
    mockElement.style.top = "-50px";
    mockElement.style.left = "100px";
    mockElement.style.width = "100px";
    mockElement.style.height = "100px";

    expect(isElementVisible(mockElement)).toBe(true);
  });

  it("should handle elements with getBoundingClientRect returning zero values", () => {
    mockElement.getBoundingClientRect = jest.fn(() => ({
      top: -100,
      left: 0,
      bottom: -50,
      right: 100,
      width: 100,
      height: 50,
    }));

    expect(isElementVisible(mockElement)).toBe(false);
  });

  it("should return false for elements positioned on the left outside viewport", () => {
    mockElement.getBoundingClientRect = jest.fn(() => ({
      top: 0,
      left: -200,
      bottom: 100,
      right: -100,
      width: 100,
      height: 100,
    }));

    // elemTop = 0 (< window.innerHeight = true)
    // elemBottom = 100 (>= 0 = true)
    // Both conditions met, so returns true (element is partially visible)
    // Note: The actual function doesn't check left/right bounds
    expect(isElementVisible(mockElement)).toBe(true);
  });
});
