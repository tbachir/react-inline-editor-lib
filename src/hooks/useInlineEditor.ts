import { useState, useRef, useCallback, useEffect } from 'react';
import { UseInlineEditorOptions, UseInlineEditorReturn } from '../types';
import { DOMUtils } from '../utils/domUtils';
import { ValidationUtils } from '../utils/validation';
import { AccessibilityUtils } from '../utils/accessibility';

/**
 * Custom hook for managing inline editor state and behavior with enhanced security
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

  // Auto-save functionality with validation
  useEffect(() => {
    if (autoSaveDelay > 0 && hasChanges && isEditing && !validationError) {
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
   * Validates the given value with enhanced security
   */
  const validateValue = useCallback((val: string): string | null => {
    if (typeof val !== 'string') {
      return 'Invalid input type';
    }

    // Sanitize input first
    const sanitizedValue = ValidationUtils.sanitizeString(val);
    
    // Check length constraints
    if (maxLength && sanitizedValue.length > maxLength) {
      return `Maximum ${maxLength} characters allowed`;
    }
    
    // Apply custom validation
    if (validate) {
      try {
        return validate(sanitizedValue);
      } catch (error) {
        console.warn('Validation function error:', error);
        return 'Validation error occurred';
      }
    }
    
    return null;
  }, [validate, maxLength]);

  /**
   * Starts the editing mode with enhanced focus management
   */
  const startEditing = useCallback(() => {
    if (isEditing) return;
    
    setIsEditing(true);
    setHasChanges(false);
    setValidationError(null);
    originalValueRef.current = currentValue;
    
    // Announce to screen readers
    AccessibilityUtils.announce('Editing mode activated', 'assertive');
    
    onEditStart?.();

    // Enhanced focus management with error handling
    setTimeout(() => {
      if (editorRef.current && DOMUtils.isValidElement(editorRef.current)) {
        const focused = DOMUtils.focusElement(editorRef.current);
        if (focused) {
          DOMUtils.setCaretPosition(editorRef.current, 'end');
        }
      }
    }, 0);
  }, [isEditing, currentValue, onEditStart]);

  /**
   * Stops the editing mode with enhanced validation and error handling
   */
  const stopEditing = useCallback((save = false) => {
    if (!isEditing) return;

    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    try {
      if (save && hasChanges && !validationError) {
        // Sanitize before saving
        const sanitizedValue = ValidationUtils.sanitizeString(currentValue);
        onChange(sanitizedValue);
        onEditComplete?.(sanitizedValue);
        AccessibilityUtils.announce('Changes saved', 'polite');
      } else if (!save) {
        setCurrentValue(originalValueRef.current);
        onEditCancel?.();
        AccessibilityUtils.announce('Editing cancelled', 'polite');
      }
    } catch (error) {
      console.error('Error during save/cancel:', error);
      AccessibilityUtils.announce('An error occurred', 'assertive');
    }

    setIsEditing(false);
    setHasChanges(false);
    setValidationError(null);
  }, [isEditing, hasChanges, validationError, currentValue, onChange, onEditComplete, onEditCancel]);

  /**
   * Updates the current value with enhanced validation and sanitization
   */
  const updateValue = useCallback((newValue: string) => {
    if (typeof newValue !== 'string') {
      console.warn('Invalid value type provided to updateValue');
      return;
    }

    // Sanitize input
    const sanitizedValue = ValidationUtils.sanitizeString(newValue);
    
    setCurrentValue(sanitizedValue);
    setHasChanges(sanitizedValue !== originalValueRef.current);
    
    const error = validateValue(sanitizedValue);
    setValidationError(error);
  }, [validateValue]);

  /**
   * Enhanced keyboard event handler with security checks
   */
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!isEditing || !event) return;

    try {
      const isCtrlOrCmd = event.ctrlKey || event.metaKey;
      const key = event.key;

      // Validate key input
      if (typeof key !== 'string') return;

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
    } catch (error) {
      console.warn('Error in keyboard handler:', error);
    }
  }, [isEditing, multiline, stopEditing, keyboardShortcuts]);

  /**
   * Enhanced blur handler with improved action button detection
   */
  const handleBlur = useCallback((event: React.FocusEvent<HTMLElement>) => {
    if (!isEditing || !event) return;

    try {
      const relatedTarget = event.relatedTarget as HTMLElement | null;
      
      // Enhanced check for action buttons and related elements
      const isActionButton = relatedTarget && (
        relatedTarget.classList.contains('inline-editor-save') ||
        relatedTarget.classList.contains('inline-editor-cancel') ||
        relatedTarget.closest('.inline-editor-actions') ||
        relatedTarget.closest('.inline-editor-container')
      );

      // Only auto-save if focus didn't move to an action button
      if (!isActionButton) {
        // Small delay to ensure any pending click events are processed
        setTimeout(() => {
          if (isEditing) {
            stopEditing(true);
          }
        }, 50);
      }
    } catch (error) {
      console.warn('Error in blur handler:', error);
    }
  }, [isEditing, stopEditing]);

  /**
   * Enhanced paste handler with security measures
   */
  const handlePaste = useCallback((event: React.ClipboardEvent) => {
    if (!isEditing) return;

    try {
      event.preventDefault();
      
      const clipboardData = event.clipboardData;
      if (!clipboardData) return;

      let text = clipboardData.getData('text/plain');
      if (typeof text !== 'string') return;

      // Sanitize pasted content
      text = ValidationUtils.sanitizeString(text);
      
      // Process text based on multiline setting
      const processedText = multiline ? text : text.replace(/\n/g, ' ');
      
      // Insert text safely
      if (DOMUtils.insertTextAtCaret(processedText)) {
        // Update value after successful insertion
        const target = event.target as HTMLElement;
        if (DOMUtils.isValidElement(target)) {
          const newValue = target.textContent || '';
          updateValue(newValue);
        }
      }
    } catch (error) {
      console.warn('Error handling paste:', error);
    }
  }, [isEditing, multiline, updateValue]);

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
    handlePaste,
    editorRef
  };
}