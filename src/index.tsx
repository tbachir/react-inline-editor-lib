import React from 'react';
import { ContentProvider } from './content';
import { AuthProvider } from './auth';
import { NotificationProvider } from './notifications';
import { DebugPanel } from './debug';
import { ModernEditorToolbar } from './editor';

// Modern exports (recommended)
export { 
  ModernEditableWrapper ,
  ModernEditableImage,
  ModernEditorToolbar
} from './editor';

// Specialized components
export { 
  EditableBackground,
  EditableAttribute 
} from './editor';

export { useAuth } from './auth';
export { useContent } from './content';
export { useNotifications } from './notifications';

// CSS imports - consolidated
import './editor/modern-editor.css';
import './editor/editable-images.css';
import './debug/debug.css';

interface InlineEditorProps {
  children: React.ReactNode;
  useModernDesign?: boolean; // Flag to enable modern design
}

/**
 * Main inline editor provider with modern design system
 */
export const InlineEditor: React.FC<InlineEditorProps> = ({ 
  children,
  useModernDesign = true // Default to modern design
}) => {
  const [showEditableHighlights, setShowEditableHighlights] = React.useState(false);

  const toggleEditableHighlights = () => {
    setShowEditableHighlights(prev => !prev);
  };

  // Add/remove global highlight class
  React.useEffect(() => {
    const body = document.body;
    if (showEditableHighlights) {
      body.classList.add('editable-highlight-active');
    } else {
      body.classList.remove('editable-highlight-active');
    }

    // Cleanup on unmount
    return () => {
      body.classList.remove('editable-highlight-active');
    };
  }, [showEditableHighlights]);

  // Add modern design class to body
  React.useEffect(() => {
    const body = document.body;
    if (useModernDesign) {
      body.classList.add('inline-editor-modern');
    } else {
      body.classList.remove('inline-editor-modern');
    }

    return () => {
      body.classList.remove('inline-editor-modern');
    };
  }, [useModernDesign]);

  return (
    <EditableHighlightContext.Provider value={{ showEditableHighlights }}>
      <NotificationProvider>
        <AuthProvider>
          <ContentProvider>
            {children}
            <ModernEditorToolbar 
              showEditableHighlights={showEditableHighlights}
              toggleEditableHighlights={toggleEditableHighlights}
            />
            <DebugPanel />
          </ContentProvider>
        </AuthProvider>
      </NotificationProvider>
    </EditableHighlightContext.Provider>
  );
};

// Context for sharing highlight state
const EditableHighlightContext = React.createContext({ showEditableHighlights: false });

// Hook to access highlight state
export const useEditableHighlights = () => {
  const context = React.useContext(EditableHighlightContext);
  return context.showEditableHighlights;
};

// Default export
export default InlineEditor;