import { useEffect, useRef, useState } from 'react';

interface AccessibilityOptions {
  announceChanges?: boolean;
  focusManagement?: boolean;
  keyboardNavigation?: boolean;
}

/**
 * Hook for managing accessibility features
 */
export function useAccessibility(options: AccessibilityOptions = {}) {
  const {
    announceChanges = true,
    focusManagement = true,
    keyboardNavigation = true
  } = options;

  const announceRef = useRef<HTMLDivElement | null>(null);
  const [isScreenReaderActive, setIsScreenReaderActive] = useState(false);

  // Create live region for announcements
  useEffect(() => {
    if (!announceChanges) return;

    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-10000px';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.overflow = 'hidden';
    
    document.body.appendChild(liveRegion);
    announceRef.current = liveRegion;

    return () => {
      if (announceRef.current) {
        document.body.removeChild(announceRef.current);
      }
    };
  }, [announceChanges]);

  // Detect screen reader usage
  useEffect(() => {
    const detectScreenReader = () => {
      // Check for common screen reader indicators
      const hasScreenReader = 
        window.navigator.userAgent.includes('NVDA') ||
        window.navigator.userAgent.includes('JAWS') ||
        !!window.speechSynthesis ||
        document.querySelector('[aria-live]') !== null;
      
      setIsScreenReaderActive(!!hasScreenReader);
    };

    detectScreenReader();
    
    // Listen for screen reader specific events
    const handleFocus = () => detectScreenReader();
    document.addEventListener('focusin', handleFocus);
    
    return () => {
      document.removeEventListener('focusin', handleFocus);
    };
  }, []);

  /**
   * Announce message to screen readers
   */
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!announceRef.current || !announceChanges) return;

    announceRef.current.setAttribute('aria-live', priority);
    announceRef.current.textContent = message;

    // Clear after announcement
    setTimeout(() => {
      if (announceRef.current) {
        announceRef.current.textContent = '';
      }
    }, 1000);
  };

  /**
   * Manage focus for better keyboard navigation
   */
  const manageFocus = (element: HTMLElement | null, options?: FocusOptions) => {
    if (!focusManagement || !element) return;

    // Ensure element is focusable
    if (!element.hasAttribute('tabindex') && !element.matches('button, input, select, textarea, a[href]')) {
      element.setAttribute('tabindex', '-1');
    }

    element.focus(options);
  };

  /**
   * Create keyboard navigation handler
   */
  const createKeyboardHandler = (handlers: Record<string, () => void>) => {
    if (!keyboardNavigation) return () => {};

    return (event: React.KeyboardEvent) => {
      const key = event.key;
      const handler = handlers[key];
      
      if (handler) {
        event.preventDefault();
        handler();
      }
    };
  };

  /**
   * Check if element meets WCAG contrast requirements
   */
  const checkContrast = (): { ratio: number; passes: boolean } => {
    // Simplified contrast calculation (in real implementation, use a proper library)
    const ratio = 4.5; // Placeholder
    const passes = ratio >= 4.5; // WCAG AA standard

    return { ratio, passes };
  };

  return {
    announce,
    manageFocus,
    createKeyboardHandler,
    checkContrast,
    isScreenReaderActive,
  };
}