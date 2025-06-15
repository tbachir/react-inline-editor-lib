interface ViewportSize {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}
/**
 * Hook for responsive design and viewport detection
 */
export declare function useViewport(): ViewportSize;
export {};
