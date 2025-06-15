import '@testing-library/jest-dom';

// Mock window.getSelection for tests
Object.defineProperty(window, 'getSelection', {
  writable: true,
  value: () => ({
    rangeCount: 0,
    removeAllRanges: () => {},
    addRange: () => {},
    getRangeAt: () => ({
      selectNodeContents: () => {},
      collapse: () => {},
      deleteContents: () => {},
      insertNode: () => {},
      setStartAfter: () => {}
    })
  })
});

// Mock document.createRange for tests
Object.defineProperty(document, 'createRange', {
  writable: true,
  value: () => ({
    selectNodeContents: () => {},
    collapse: () => {},
    deleteContents: () => {},
    insertNode: () => {},
    setStartAfter: () => {}
  })
});

// Mock document.createTextNode for tests
Object.defineProperty(document, 'createTextNode', {
  writable: true,
  value: (text: string) => ({
    textContent: text,
    nodeType: 3
  })
});

// Mock console methods to avoid noise in tests
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

beforeEach(() => {
  console.warn = (...args: any[]) => {
    if (!args[0]?.includes?.('Warning: ReactDOM.render is no longer supported')) {
      originalConsoleWarn(...args);
    }
  };
  
  console.error = (...args: any[]) => {
    if (!args[0]?.includes?.('Warning: ReactDOM.render is no longer supported')) {
      originalConsoleError(...args);
    }
  };
});

afterEach(() => {
  console.warn = originalConsoleWarn;
  console.error = originalConsoleError;
});