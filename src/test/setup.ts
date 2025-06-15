import '@testing-library/jest-dom';

// Mock window.getSelection for tests
Object.defineProperty(window, 'getSelection', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    rangeCount: 0,
    removeAllRanges: jest.fn(),
    addRange: jest.fn(),
    getRangeAt: jest.fn()
  }))
});

// Mock document.createRange for tests
Object.defineProperty(document, 'createRange', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    selectNodeContents: jest.fn(),
    collapse: jest.fn(),
    deleteContents: jest.fn(),
    insertNode: jest.fn(),
    createTextNode: jest.fn()
  }))
});