import React from "react";
import type { ContentContextValue } from '../types';
export declare const useContent: () => ContentContextValue;
interface ContentProviderProps {
    children: React.ReactNode;
    apiBaseUrl?: string;
    onVersionConflict?: (conflict: {
        clientVersion: number;
        serverVersion: number;
        serverContent: string;
        clientContent: string;
    }) => Promise<'overwrite' | 'keep_server' | 'cancel'>;
}
/**
 * Enhanced content provider with performance optimizations
 */
export declare const ContentProvider: React.FC<ContentProviderProps>;
export {};
