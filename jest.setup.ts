import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: any) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

// Mock IntersectionObserver
class IntersectionObserverMock {
  private callback: IntersectionObserverCallback;
  private timeoutId: NodeJS.Timeout | null = null;
  private observedElements: Set<Element> = new Set();

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe = jest.fn((target: Element) => {
    this.observedElements.add(target);
    // Trigger the callback with intersecting entry
    this.timeoutId = setTimeout(() => {
      if (this.observedElements.has(target)) {
        this.callback(
          [
            {
              isIntersecting: true,
              target,
              boundingClientRect: {} as DOMRectReadOnly,
              intersectionRatio: 1,
              intersectionRect: {} as DOMRectReadOnly,
              rootBounds: null,
              time: Date.now(),
            } as IntersectionObserverEntry,
          ],
          this as any,
        );
      }
    }, 0);
  });

  disconnect = jest.fn(() => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.observedElements.clear();
  });

  unobserve = jest.fn((target: Element) => {
    this.observedElements.delete(target);
    if (this.timeoutId && this.observedElements.size === 0) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  });
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});
