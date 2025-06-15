import { useState, useRef, useCallback, useEffect } from 'react';
import { UseInlineEditorOptions, UseInlineEditorReturn } from '../types';

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
    maxLength
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

  const validateValue = useCallback((val: string): string | null => {
    if (maxLength && val.length > maxLength) {
      return `Maximum ${maxLength} characters allowed`;
    }
    
    if (validate) {
      return validate(val);
    }
    
    return null;
  }, [validate, maxLength]);

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

  const updateValue = useCallback((newValue: string) => {
    setCurrentValue(newValue);
    setHasChanges(newValue !== originalValueRef.current);
    
    const error = validateValue(newValue);
    setValidationError(error);
  }, [validateValue]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!isEditing) return;

    // Handle Enter key
    if (event.key === 'Enter') {
      if (!multiline || (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        stopEditing(true);
      }
    }
    
    // Handle Escape key
    if (event.key === 'Escape') {
      event.preventDefault();
      stopEditing(false);
    }

    // Handle Ctrl+S / Cmd+S
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault();
      stopEditing(true);
    }
  }, [isEditing, multiline, stopEditing]);

  const handleBlur = useCallback(() => {
    // Small delay to allow for button clicks
    setTimeout(() => {
      if (isEditing) {
        stopEditing(true);
      }
    }, 150);
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