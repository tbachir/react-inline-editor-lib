import React from "react";
interface ModernEditableWrapperProps {
    children: React.ReactNode;
    id: string;
    multiline?: boolean;
    maxLength?: number;
    placeholder?: string;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
    showEditableHighlights?: boolean;
}
export declare const ModernEditableWrapper: React.NamedExoticComponent<ModernEditableWrapperProps>;
export {};
