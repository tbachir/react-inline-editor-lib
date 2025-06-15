import React from 'react';
interface AccessibleEditableWrapperProps {
    children: React.ReactNode;
    id: string;
    multiline?: boolean;
    maxLength?: number;
    placeholder?: string;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
    showEditableHighlights?: boolean;
    ariaLabel?: string;
    ariaDescription?: string;
    role?: string;
}
/**
 * Accessibility-enhanced editable wrapper
 * Implements WCAG 2.1 AA compliance
 */
export declare const AccessibleEditableWrapper: React.FC<AccessibleEditableWrapperProps>;
export {};
