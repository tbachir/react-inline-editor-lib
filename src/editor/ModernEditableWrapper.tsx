import React from "react";
import { useAuth } from '../auth';
import { useContent } from '../content';
import { useNotifications } from '../notifications';
import { ModernInlineTextEditor } from './ModernInlineTextEditor';
import { detectContext, generateContextId } from '../context/EditableContentContext';
import type { EditableContent } from '../types';

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

/**
 * Optimized editable wrapper with seamless WYSIWYG experience
 * No animations, perfect style preservation, transparent editing
 */
export const ModernEditableWrapper: React.FC<ModernEditableWrapperProps> = ({
  children,
  id,
  multiline = true,
  maxLength,
  placeholder,
  className = '',
  as: Component = 'span',
  showEditableHighlights = false
}) => {
  const { isAuthenticated } = useAuth();
  const { getContent, saveContent, isLoading } = useContent();
  const { error, promise } = useNotifications();
  
  const [isEditing, setIsEditing] = React.useState(false);
  const [context, setContext] = React.useState<string>('');
  const [displayContent, setDisplayContent] = React.useState<string>('');
  const [defaultContent, setDefaultContent] = React.useState<string>('');
  const [isInitialized, setIsInitialized] = React.useState(false);
  const wrapperRef =  React.useRef<HTMLElement>(null);
  
  // Extract default content from children
  const extractDefaultContent =  React.useCallback((node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return node.toString();
    if (!node) return '';
    
    if (React.isValidElement(node) && node.props.children) {
      return extractDefaultContent(node.props.children);
    }
    
    if (Array.isArray(node)) {
      return node.map(extractDefaultContent).join('');
    }
    
    return '';
  }, []);

  // Parameter validation
  const validateParams =  React.useCallback((context: string, contextId: string): boolean => {
    if (!context || context.trim() === '') {
      console.error('[ModernEditableWrapper] Context cannot be empty');
      return false;
    }
    
    if (!contextId || contextId.trim() === '') {
      console.error('[ModernEditableWrapper] Context ID cannot be empty');
      return false;
    }
    
    return true;
  }, []);

  // Initialize context and content on mount
  React.useEffect(() => {
    if (isLoading) return;
    
    if (!wrapperRef.current) return;

    // Extract default content
    const extractedContent = extractDefaultContent(children).trim();
    setDefaultContent(extractedContent);
    
    // Generate context
    const contextString = generateContextId(wrapperRef.current);
    
    // Validation
    if (!validateParams(contextString, id)) {
      error('Invalid editor configuration');
      setDisplayContent(extractedContent);
      setIsInitialized(true);
      return;
    }
    
    setContext(contextString);
    
    // Get content from provider
    const currentContent = getContent(contextString, id, extractedContent);
    setDisplayContent(currentContent);
    setIsInitialized(true);
    
    console.log(`[ModernEditableWrapper] Initialized:`, {
      context: contextString,
      contextId: id,
      defaultContent: extractedContent,
      currentContent
    });
  }, [id, children, getContent, extractDefaultContent, validateParams, isLoading, error]);
  
  /**
   * Click handler to enter edit mode
   */
  const handleClick =  React.useCallback(() => {
    if (isAuthenticated && !isEditing && context) {
      setIsEditing(true);
    }
  }, [isAuthenticated, isEditing, context]);
  
  /**
   * Save content handler with consolidated notifications
   */
  const handleSave =  React.useCallback(async (newContent: string): Promise<boolean> => {
    if (!context || !validateParams(context, id)) {
      error('Cannot save: invalid configuration');
      return false;
    }
    
    const editableContent: EditableContent = {
      content: newContent,
      context: context,
      context_id: id,
      contentType: 'text',
      lastModified: Date.now()
    };
    
    try {
      // Use promise notification for consolidated feedback
      const success = await promise(
        saveContent(editableContent, defaultContent),
        {
          loading: 'Saving changes...',
          success: 'Changes saved successfully!',
          error: 'Failed to save changes'
        }
      );
      
      if (success) {
        setDisplayContent(newContent);
        setIsEditing(false);
        console.log(`[ModernEditableWrapper] Content saved for ${id}`);
      }
      
      return success;
    } catch (err) {
      console.error(`[ModernEditableWrapper] Save error:`, err);
      return false;
    }
  }, [context, id, saveContent, defaultContent, validateParams, error, promise]);
  
  /**
   * Cancel editing handler
   */
  const handleCancel =  React.useCallback(() => {
    setIsEditing(false);
  }, []);
  
  // Show loading state with minimal visual impact
  if (isLoading || !isInitialized) {
    return React.createElement(
      Component,
      {
        ref: wrapperRef,
        className: `editable-wrapper-modern initializing ${className}`,
        style: { opacity: 0.7 }
      },
      <span className="inline-flex items-center gap-1">
        <span className="inline-block w-2 h-2 bg-gray-400 rounded-full opacity-50" />
        <span className="text-xs text-gray-400">Loading...</span>
      </span>
    );
  }
  
  // Edit mode with seamless inline editor
  if (isEditing && isAuthenticated) {
    return (
      <ModernInlineTextEditor
        content={displayContent}
        onSave={handleSave}
        onCancel={handleCancel}
        config={{
          id: id,
          multiline,
          maxLength,
          placeholder
        }}
        className={className}
        as={Component}
        preserveStyles={true}
      />
    );
  }
  
  // Read mode with minimal visual changes
  return React.createElement(
    Component,
    {
      ref: wrapperRef,
      className: `editable-wrapper-modern ${isAuthenticated ? 'is-authenticated' : ''} ${showEditableHighlights ? 'editable-highlight' : ''} ${className}`,
      onClick: handleClick,
      title: isAuthenticated ? 'Click to edit' : undefined,
      'data-context': context,
      'data-context-id': id,
      role: isAuthenticated ? 'button' : undefined,
      tabIndex: isAuthenticated ? 0 : undefined,
      'aria-label': isAuthenticated ? `Edit ${id}` : undefined,
      onKeyDown: isAuthenticated ? (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      } : undefined
    },
    displayContent
  );
};