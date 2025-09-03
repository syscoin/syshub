// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import './test/setup-user-context-mock';

// Polyfill TextEncoder/TextDecoder for libs used in tests
try {
  const { TextEncoder, TextDecoder } = require('util');
  if (!global.TextEncoder) {
    global.TextEncoder = TextEncoder;
  }
  if (!global.TextDecoder) {
    global.TextDecoder = TextDecoder;
  }
} catch (e) {
  // ignore if not available
}

// Stub getComputedStyle to avoid jsdom not-implemented warnings from a11y queries
if (typeof window !== 'undefined' && typeof window.getComputedStyle !== 'function') {
  window.getComputedStyle = () => ({
    getPropertyValue: () => '',
    display: 'block',
    appearance: '',
    '-moz-appearance': '',
    '-webkit-appearance': ''
  });
}
