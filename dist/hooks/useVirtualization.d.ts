interface VirtualizationOptions {
    itemHeight: number;
    containerHeight: number;
    overscan?: number;
}
/**
 * Virtual scrolling hook for large content lists
 * Improves performance when dealing with many editable elements
 */
export declare function useVirtualization<T>(items: T[], options: VirtualizationOptions): {
    visibleItems: T[];
    visibleRange: {
        startIndex: number;
        endIndex: number;
    };
    totalHeight: number;
    setScrollTop: import("react").Dispatch<import("react").SetStateAction<number>>;
};
export {};
