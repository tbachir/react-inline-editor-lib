/**
 * Custom hook for debouncing function calls
 * Prevents excessive API calls during rapid typing
 */
export declare function useDebounce<T extends (...args: any[]) => any>(callback: T, delay: number): T;
