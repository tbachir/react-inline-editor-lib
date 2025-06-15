import { useState, useRef, useCallback, useEffect } from 'react';
import { UseInlineEditorOptions, UseInlineEditorReturn } from '../types';

/**
 * Custom hook for managing inline editor state and behavior
 * @param options Configuration options for the inline editor
 * @returns Object containing editor state and handlers
 */
export function useInlineEditor(options: UseInlineEditorOptions): UseInlineEditorReturn {
  const {
    value,
    onChange,
    onEditStart,
    onEditComplete,
    onEditCancel,
    validate,
    autoSaveDelay = 0,
    multiline = false,
    maxLength,
    keyboardShortcuts = {
      save: ['Enter'],
      cancel: ['Escape']
    }
  } = options;

  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  
  const editorRef = useRef<HTMLElement>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout>();
  const originalValueRef = useRef(value);

  // Update current value when prop changes
  useEffect(() => {
    if (!isEditing) {
      setCurrentValue(value);
      originalValueRef.current = value;
    }
  }, [value, isEditing]);

  // Auto-save functionality
  useEffect(() => {
    if (autoSaveDelay > 0 && hasChanges && isEditing) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      
      autoSaveTimeoutRef.current = setTimeout(() => {
        if (hasChanges && !validationError) {
          stopEditing(true);
        }
      }, autoSaveDelay);
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [hasChanges, isEditing, autoSaveDelay, validationError]);

  /**
   * Validates the given value against maxLength and custom validation function.
   * @param val The string value to validate.
   * @returns A string error message if validation fails, otherwise null.
   */
  const validateValue = useCallback((val: string): string | null => {
    if (maxLength && val.length > maxLength) {
      return `Maximum ${maxLength} characters allowed`;
    }
    
    if (validate) {
      return validate(val);
    }
    
    return null;
  }, [validate, maxLength]);

  /**
   * Starts the editing mode and focuses the editor element.
   */
  const startEditing = useCallback(() => {
    if (isEditing) return;
    
    setIsEditing(true);
    setHasChanges(false);
    setValidationError(null);
    originalValueRef.current = currentValue;
    onEditStart?.();

    // Focus the editor after state update
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
        
        // Place cursor at end of content
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }, 0);
  }, [isEditing, currentValue, onEditStart]);

  /**
   * Stops the editing mode and optionally saves changes.
   * @param save Whether to save the changes or revert to original value.
   */
  const stopEditing = useCallback((save = false) => {
    if (!isEditing) return;

    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    if (save && hasChanges && !validationError) {
      onChange(currentValue);
      onEditComplete?.(currentValue);
    } else if (!save) {
      setCurrentValue(originalValueRef.current);
      onEditCancel?.();
    }

    setIsEditing(false);
    setHasChanges(false);
    setValidationError(null);
  }, [isEditing, hasChanges, validationError, currentValue, onChange, onEditComplete, onEditCancel]);

  /**
   * Updates the current value and validates it.
   * @param newValue The new value to set.
   */
  const updateValue = useCallback((newValue: string) => {
    setCurrentValue(newValue);
    setHasChanges(newValue !== originalValueRef.current);
    
    const error = validateValue(newValue);
    setValidationError(error);
  }, [validateValue]);

  /**
   * Handles keyboard events with support for custom shortcuts.
   * @param event The keyboard event.
   */
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!isEditing) return;

    const isCtrlOrCmd = event.ctrlKey || event.metaKey;
    const key = event.key;

    // Check for save shortcuts
    if (keyboardShortcuts.save?.includes(key)) {
      if (!multiline || (isCtrlOrCmd && key === 'Enter')) {
        event.preventDefault();
        stopEditing(true);
      } else if (!multiline && key === 'Enter') {
        event.preventDefault();
        stopEditing(true);
      }
    }

    // Check for cancel shortcuts
    if (keyboardShortcuts.cancel?.includes(key)) {
      event.preventDefault();
      stopEditing(false);
    }

    // Universal save shortcut (Ctrl+S / Cmd+S)
    if (isCtrlOrCmd && key === 's') {
      event.preventDefault();
      stopEditing(true);
    }
  }, [isEditing, multiline, stopEditing, keyboardShortcuts]);

  /**
   * Handles blur events with improved logic to avoid conflicts with action buttons.
   * @param event The focus event containing information about the related target.
   */
  const handleBlur = useCallback((event: React.FocusEvent<HTMLElement>) => {
    if (!isEditing) return;

    const relatedTarget = event.relatedTarget as HTMLElement | null;
    
    // Check if the focus moved to one of our action buttons
    const isActionButton = relatedTarget?.classList.contains('inline-editor-save') ||
                          relatedTarget?.classList.contains('inline-editor-cancel') ||
                          relatedTarget?.closest('.inline-editor-actions');

    // Only auto-save if focus didn't move to an action button
    if (!isActionButton) {
      // Small delay to ensure any pending click events are processed
      setTimeout(() => {
        if (isEditing) {
          stopEditing(true);
        }
      }, 50);
    }
  }, [isEditing, stopEditing]);

  return {
    isEditing,
    currentValue,
    validationError,
    hasChanges,
    startEditing,
    stopEditing,
    updateValue,
    handleKeyDown,
    handleBlur,
    editorRef
  };
}