/**
 * @fileoverview Global Vitest test setup for TL;DRx.
 * Configures DOM matchers and browser API stubs used by the app.
 */

import '@testing-library/jest-dom/vitest';

// Provide a stable no-op scrollTo implementation in the test environment
// to avoid jsdom "Not implemented: window.scrollTo" errors.
if (typeof window !== 'undefined') {
  window.scrollTo = () => {};
}

/**
 * Simple IntersectionObserver mock for components relying on it.
 * JSDOM does not provide this API by default.
 */
class IntersectionObserverMock {
  /**
   * @param {Function} callback - Intersection callback
   * @param {IntersectionObserverInit} [options] - Observer options (ignored in mock)
   */
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
  }

  /** @param {Element} _target */
  observe() {
    // No-op: we do not simulate intersections in this minimal mock.
  }

  /** @param {Element} _target */
  unobserve() {
    // No-op
  }

  disconnect() {
    // No-op
  }
}

if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
  window.IntersectionObserver = IntersectionObserverMock;
}

if (!('IntersectionObserver' in globalThis)) {
  globalThis.IntersectionObserver = IntersectionObserverMock;
}
