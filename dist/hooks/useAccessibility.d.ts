interface AccessibilityOptions {
    announceChanges?: boolean;
    focusManagement?: boolean;
    keyboardNavigation?: boolean;
}
/**
 * Hook for managing accessibility features
 */
export declare function useAccessibility(options?: AccessibilityOptions): {
    announce: (message: string, priority?: "polite" | "assertive") => void;
    manageFocus: (element: HTMLElement | null, options?: FocusOptions) => void;
    createKeyboardHandler: (handlers: Record<string, () => void>) => (event: React.KeyboardEvent) => void;
    checkContrast: () => {
        ratio: number;
        passes: boolean;
    };
    isScreenReaderActive: boolean;
};
export {};
