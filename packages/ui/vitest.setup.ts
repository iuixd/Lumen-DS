import "@testing-library/jest-dom/vitest";

// jsdom has no layout engine and doesn't implement ResizeObserver — cmdk
// (Command's underlying primitive) observes its list for size changes on
// mount. A no-op stub is sufficient since layout/size values are never
// asserted on in jsdom-based tests.
if (typeof globalThis.ResizeObserver === "undefined") {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// jsdom doesn't implement IntersectionObserver — embla-carousel-react
// (Carousel) uses it to track slide visibility. A no-op stub is sufficient
// since no test asserts on intersection/visibility state.
if (typeof globalThis.IntersectionObserver === "undefined") {
  globalThis.IntersectionObserver = class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  } as unknown as typeof globalThis.IntersectionObserver;
}

// jsdom doesn't implement matchMedia — embla-carousel-react (Carousel) reads
// it for responsive breakpoint options, and vaul (Drawer) reads it to detect
// prefers-reduced-motion/viewport queries. A stub that always reports no
// match is sufficient since no test asserts on actual media-query behavior.
if (typeof window !== "undefined" && typeof window.matchMedia === "undefined") {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  }) as unknown as MediaQueryList;
}

// jsdom doesn't implement elementFromPoint — input-otp (InputOTP) uses it
// internally for caret/selection positioning. A stub returning null is
// sufficient since no test asserts on caret position.
if (typeof document !== "undefined" && typeof document.elementFromPoint === "undefined") {
  document.elementFromPoint = () => null;
}
