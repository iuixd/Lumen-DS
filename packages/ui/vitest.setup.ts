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
