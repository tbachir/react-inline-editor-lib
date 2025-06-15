import React from "react";
interface ModernEditableImageProps {
    id: string;
    src: string;
    alt?: string;
    className?: string;
    style?: React.CSSProperties;
    width?: number | string;
    height?: number | string;
    loading?: 'lazy' | 'eager';
    showEditableHighlights?: boolean;
}
export declare const ModernEditableImage: React.NamedExoticComponent<ModernEditableImageProps>;
export {};
