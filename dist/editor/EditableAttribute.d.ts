import React from "react";
interface EditableAttributeProps {
    children: React.ReactElement;
    id: string;
    attribute: string;
    defaultValue: string;
    validator?: (value: string) => boolean | string;
    transformer?: (value: string) => string;
    showEditableHighlights?: boolean;
    editLabel?: string;
}
export declare const EditableAttribute: React.NamedExoticComponent<EditableAttributeProps>;
export {};
