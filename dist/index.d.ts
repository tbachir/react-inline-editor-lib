import React from 'react';
export { ModernEditableWrapper, ModernEditableImage, ModernEditorToolbar } from './editor';
export { EditableBackground, EditableAttribute } from './editor';
export { useAuth } from './auth';
export { useContent } from './content';
export { useNotifications } from './notifications';
import './editor/modern-editor.css';
import './editor/editable-images.css';
import './debug/debug.css';
interface InlineEditorProps {
    children: React.ReactNode;
    useModernDesign?: boolean;
}
/**
 * Main inline editor provider with modern design system
 */
export declare const InlineEditor: React.FC<InlineEditorProps>;
export declare const useEditableHighlights: () => boolean;
export default InlineEditor;
