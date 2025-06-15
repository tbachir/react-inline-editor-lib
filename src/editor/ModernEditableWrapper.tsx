import React from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../auth';
import { useContent } from '../content';
import { useNotifications } from '../notifications';
import { ModernInlineTextEditor } from './ModernInlineTextEditor';
import { detectContext, generateContextId } from '../context/EditableContentContext';
import { designTokens } from '../design/DesignTokens';
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
 * Ultra-modern editable wrapper with seamless WYSIWYG experience
 * Features: Zero-layout-shift editing, micro-interactions, accessibility
 */
const ModernEditableWrapperComponent: React.FC<ModernEditableWrapperProps> = ({
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
  const [isHovered, setIsHovered] = React.useState(false);
  const [context, setContext] = React.useState<string>('');
  const [displayContent, setDisplayContent] = React.useState<string>('');
  const [defaultContent, setDefaultContent] = React.useState<string>('');
  const [isInitialized, setIsInitialized] = React.useState(false);
  const wrapperRef = React.useRef<HTMLElement>(null);
  
  // Extract default content from children
  const extractDefaultContent = React.useCallback((node: React.ReactNode): string => {
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

  // Initialize context and content
  React.useEffect(() => {
    if (isLoading) return;
    if (!wrapperRef.current) return;

    const extractedContent = extractDefaultContent(children).trim();
    setDefaultContent(extractedContent);
    
    const contextString = generateContextId(wrapperRef.current);
    setContext(contextString);
    
    const currentContent = getContent(contextString, id, extractedContent);
    setDisplayContent(currentContent);
    setIsInitialized(true);
    
    console.log(`[ModernEditableWrapper] Initialized:`, {
      context: contextString,
      contextId: id,
      defaultContent: extractedContent,
      currentContent
    });
  }, [id, children, getContent, extractDefaultContent, isLoading]);
  
  /**
   * Enhanced click handler with better UX
   */
  const handleClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAuthenticated && !isEditing && context) {
      setIsEditing(true);
    }
  }, [isAuthenticated, isEditing, context]);
  
  /**
   * Enhanced save handler with better feedback
   */
  const handleSave = React.useCallback(async (newContent: string): Promise<boolean> => {
    if (!context) {
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
      }
      
      return success;
    } catch (err) {
      console.error(`[ModernEditableWrapper] Save error:`, err);
      return false;
    }
  }, [context, id, saveContent, defaultContent, error, promise]);
  
  /**
   * Cancel editing handler
   */
  const handleCancel = React.useCallback(() => {
    setIsEditing(false);
  }, []);

  // Loading state with skeleton
  if (isLoading || !isInitialized) {
    return React.createElement(
      Component,
      {
        ref: wrapperRef,
        className: `modern-editable-skeleton ${className}`,
        style: {
          background: `linear-gradient(90deg, ${designTokens.colors.neutral[200]} 25%, ${designTokens.colors.neutral[100]} 50%, ${designTokens.colors.neutral[200]} 75%)`,
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
          borderRadius: designTokens.borderRadius.sm,
          minHeight: '1.25rem',
          minWidth: '4rem',
        }
      }
    );
  }
  
  // Edit mode with enhanced editor
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
  
  // Read mode with enhanced interactions
  return (
    <motion.div
      style={{ position: 'relative', display: 'inline-block' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {React.createElement(
        Component,
        {
          ref: wrapperRef,
          className: `modern-editable-wrapper ${isAuthenticated ? 'is-authenticated' : ''} ${showEditableHighlights ? 'show-highlights' : ''} ${className}`,
          onClick: handleClick,
          onKeyDown: isAuthenticated ? (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick(e as any);
            }
          } : undefined,
          style: {
            position: 'relative',
            cursor: isAuthenticated ? 'pointer' : 'default',
            outline: 'none',
            borderRadius: designTokens.borderRadius.sm,
            transition: `all ${designTokens.animation.duration.fast} ${designTokens.animation.easing.ease}`,
            ...(isAuthenticated && {
              outline: `2px solid transparent`,
              outlineOffset: '1px',
            }),
            ...(isAuthenticated && isHovered && {
              outline: `2px solid ${designTokens.colors.primary[300]}`,
              backgroundColor: `${designTokens.colors.primary[50]}`,
            }),
            ...(showEditableHighlights && isAuthenticated && {
              outline: `2px dashed ${designTokens.colors.primary[300]}`,
              backgroundColor: `${designTokens.colors.primary[25]}`,
            })
          },
          title: isAuthenticated ? 'Click to edit' : undefined,
          'data-context': context,
          'data-context-id': id,
          role: isAuthenticated ? 'button' : undefined,
          tabIndex: isAuthenticated ? 0 : undefined,
          'aria-label': isAuthenticated ? `Edit ${id}` : undefined,
        },
        displayContent
      )}
      
      {/* Enhanced edit indicator */}
      <AnimatePresence>
        {isAuthenticated && isHovered && !isEditing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.2, ease: designTokens.animation.easing.easeOut }}
            style={{
              position: 'absolute',
              top: '-2rem',
              right: '0',
              background: designTokens.colors.neutral[800],
              color: 'white',
              padding: `${designTokens.spacing.xs} ${designTokens.spacing.sm}`,
              borderRadius: designTokens.borderRadius.md,
              fontSize: designTokens.typography.fontSize.xs[0],
              fontWeight: designTokens.typography.fontWeight.medium,
              boxShadow: designTokens.shadows.lg,
              zIndex: 1000,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            ✏️ Click to edit
            <div
              style={{
                position: 'absolute',
                bottom: '-4px',
                right: '8px',
                width: '8px',
                height: '8px',
                background: designTokens.colors.neutral[800],
                transform: 'rotate(45deg)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Memoize the component
export const ModernEditableWrapper = React.memo(ModernEditableWrapperComponent);