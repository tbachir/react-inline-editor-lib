import React from "react";
import type { EditorConfig } from '../types';
interface ModernInlineTextEditorProps {
    content: string;
    onSave: (content: string) => Promise<boolean>;
    onCancel: () => void;
    config: EditorConfig;
    className?: string;
    style?: React.CSSProperties;
    as?: keyof JSX.IntrinsicElements;
    preserveStyles?: boolean;
}
export declare const ModernInlineTextEditor: React.NamedExoticComponent<ModernInlineTextEditorProps>;
export {};
