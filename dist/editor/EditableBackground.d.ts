import React from "react";
interface EditableBackgroundProps {
    children: React.ReactNode;
    backgroundImage: string;
    id: string;
    className?: string;
    style?: React.CSSProperties;
    as?: keyof JSX.IntrinsicElements;
    showEditableHighlights?: boolean;
}
export declare const EditableBackground: React.NamedExoticComponent<EditableBackgroundProps>;
export {};
