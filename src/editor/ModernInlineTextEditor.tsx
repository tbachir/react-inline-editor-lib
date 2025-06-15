import React from "react";
import { Save, X, Loader2 } from 'lucide-react';
import { useNotifications } from '../notifications';
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

/**
 * Seamless inline text editor with perfect WYSIWYG rendering
 * No animations, preserves all original styles
 * Memoized to prevent unnecessary re-renders when props haven't changed
 */
const ModernInlineTextEditorComponent: React.FC<ModernInlineTextEditorProps> = ({
  content,
  onSave,
  onCancel,
  config,
  className = '',
  style = {},
  as: Component = 'span',
}) => {
  const [isSaving, setIsSaving] = React.useState(false);
  const [hasChanges, setHasChanges] = React.useState(false);
  const editableRef = React.useRef<HTMLDivElement>(null);
  const originalContent = React.useRef(content);
  const { success, error, loading, dismiss } = useNotifications();
  
  // Focus and selection on mount
  React.useEffect(() => {
    if (editableRef.current) {
      editableRef.current.focus();
      
      // Place cursor at the end of content
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(editableRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, []);
  
  /**
   * Get text content from editable div
   */
  const getTextContent = React.useCallback(() => {
    if (!editableRef.current) return '';
    
    const content = editableRef.current.innerText || '';
    return content;
  }, []);
  
  /**
   * Handle input changes to track modifications
   */
  const handleInput = React.useCallback(() => {
    const currentContent = getTextContent();
    setHasChanges(currentContent !== originalContent.current);
  }, [getTextContent]);
  
  /**
   * Keyboard shortcuts handler
   */
  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onCancel();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
    
    // Prevent line breaks if not multiline
    if (!config.multiline && e.key === 'Enter') {
      e.preventDefault();
    }
  }, [onCancel, config.multiline]);
  
  /**
   * Save handler with notifications
   */
  const handleSave = React.useCallback(async () => {
    const currentContent = getTextContent();
    
    if (isSaving) return;
    
    // Check if there are actual changes
    if (currentContent === originalContent.current) {
      success('No changes to save');
      onCancel();
      return;
    }
    
    setIsSaving(true);
    const loadingToast = loading('Saving changes...');
    
    try {
      const saveSuccess = await onSave(currentContent);
      dismiss(loadingToast);
      
      if (saveSuccess) {
        success('Changes saved successfully');
        originalContent.current = currentContent;
        setHasChanges(false);
      } else {
        error('Failed to save changes');
      }
    } catch (err) {
      dismiss(loadingToast);
      error('An error occurred while saving');
      console.error('[ModernInlineTextEditor] Save error:', err);
    } finally {
      setIsSaving(false);
    }
  }, [getTextContent, onSave, isSaving, success, error, loading, dismiss, onCancel]);
  
  /**
   * Handle paste to maintain plain text
   */
  const handlePaste = React.useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    
    // Clean text for multiline setting
    const cleanText = config.multiline ? text : text.replace(/\n/g, ' ');
    
    document.execCommand('insertText', false, cleanText);
    handleInput();
  }, [config.multiline, handleInput]);
  
  /**
   * Handle blur with auto-save option
   */
  const handleBlur = React.useCallback((e: React.FocusEvent) => {
    // Don't auto-save if clicking on action buttons
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (relatedTarget?.closest('.inline-editor-actions-modern')) {
      return;
    }
    
    // Auto-save if there are changes
    if (hasChanges && !isSaving) {
      handleSave();
    }
  }, [hasChanges, isSaving, handleSave]);
  
  // Seamless editor that preserves all original styles
  return (
    <div className="inline-editor-container-modern">
      <div
        ref={editableRef}
        contentEditable
        suppressContentEditableWarning
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onBlur={handleBlur}
        onInput={handleInput}
        className={`inline-editor-content-modern ${className}`}
        style={{
          ...style,
          outline: 'none',
          border: 'none',
          background: 'transparent',
          minHeight: 'inherit',
          minWidth: 'inherit',
          display: 'inherit',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          lineHeight: 'inherit',
          color: 'inherit',
          textAlign: 'inherit',
          textDecoration: 'inherit',
          textTransform: 'inherit',
          letterSpacing: 'inherit',
          wordSpacing: 'inherit',
          margin: '0',
          padding: '0'
        }}
        data-placeholder={config.placeholder || 'Enter text...'}
        role="textbox"
        aria-label={`Edit ${config.id}`}
        aria-multiline={config.multiline}
      >
        {content}
      </div>
      
      {/* Minimal floating actions - only visible when needed */}
      <div 
        className="inline-editor-actions-modern"
        style={{
          position: 'absolute',
          top: '-2.5rem',
          right: '0',
          display: 'flex',
          gap: '0.25rem',
          zIndex: 1000,
          opacity: hasChanges || isSaving ? 1 : 0.7
        }}
      >
        <button
          onClick={handleSave}
          disabled={isSaving || !hasChanges}
          className="inline-editor-btn-modern save"
          title={`Save changes ${config.multiline ? '(Ctrl+Enter)' : '(Enter)'}`}
          onMouseDown={(e) => e.preventDefault()}
          style={{
            width: '1.75rem',
            height: '1.75rem',
            background: hasChanges ? '#10b981' : '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: isSaving || !hasChanges ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            opacity: isSaving || !hasChanges ? 0.6 : 1
          }}
          aria-label="Save changes"
        >
          {isSaving ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <Save size={12} />
          )}
        </button>
        
        <button
          onClick={onCancel}
          disabled={isSaving}
          className="inline-editor-btn-modern cancel"
          title="Cancel (Escape)"
          onMouseDown={(e) => e.preventDefault()}
          style={{
            width: '1.75rem',
            height: '1.75rem',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem'
          }}
          aria-label="Cancel editing"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const ModernInlineTextEditor = React.memo(ModernInlineTextEditorComponent);