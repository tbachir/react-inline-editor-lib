import React, { forwardRef, useImperativeHandle } from 'react';
import { InlineEditorProps, InlineEditorRef, isValidHTMLElement } from '../types';
import { useInlineEditor } from '../hooks/useInlineEditor';
import { DOMUtils } from '../utils/domUtils';
import { ValidationUtils } from '../utils/validation';
import { AccessibilityUtils } from '../utils/accessibility';

/**
 * A flexible and accessible React component for in-place text editing.
 * Supports single-line and multi-line editing, validation, auto-save,
 * and customizable styling with enhanced security measures.
 */
export const InlineEditor = React.memo(forwardRef<InlineEditorRef, InlineEditorProps>(
  (props, ref) => {
    const {
      value,
      onChange,
      onEditStart,
      onEditComplete,
      onEditCancel,
      multiline = false,
      maxLength,
      placeholder = 'Click to edit...',
      className = '',
      style = {},
      as: Component = 'span',
      disabled = false,
      readOnly = false,
      validate,
      autoSaveDelay,
      showEditIndicator = true,
      editIndicator,
      ariaLabel,
      ariaDescription,
      keyboardShortcuts = {
        save: ['Enter'],
        cancel: ['Escape']
      }
    } = props;

    const {
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
    } = useInlineEditor({
      value,
      onChange,
      onEditStart,
      onEditComplete,
      onEditCancel,
      validate,
      autoSaveDelay,
      multiline,
      maxLength,
      keyboardShortcuts
    });

    // Expose methods via ref with type safety
    useImperativeHandle(ref, () => ({
      startEditing: () => {
        try {
          startEditing();
        } catch (error) {
          console.error('Error starting edit:', error);
        }
      },
      stopEditing: (save = false) => {
        try {
          stopEditing(save);
        } catch (error) {
          console.error('Error stopping edit:', error);
        }
      },
      getValue: () => currentValue,
      isEditing: () => isEditing
    }), [startEditing, stopEditing, currentValue, isEditing]);

    const handleClick = React.useCallback(() => {
      if (!disabled && !readOnly && !isEditing) {
        startEditing();
      }
    }, [disabled, readOnly, isEditing, startEditing]);

    const handleInput = React.useCallback((event: React.FormEvent<HTMLElement>) => {
      if (!isEditing) return;

      try {
        const target = event.target as HTMLElement;
        if (isValidHTMLElement(target)) {
          const newValue = target.textContent || '';
          // Sanitize input immediately
          const sanitizedValue = ValidationUtils.sanitizeString(newValue);
          updateValue(sanitizedValue);
        }
      } catch (error) {
        console.warn('Error handling input:', error);
      }
    }, [isEditing, updateValue]);

    // Enhanced security for contentEditable
    const handleBeforeInput = React.useCallback((event: React.FormEvent<HTMLElement>) => {
      if (!isEditing) {
        event.preventDefault();
        return;
      }

      // Additional security checks can be added here
      const inputEvent = event.nativeEvent as InputEvent;
      if (inputEvent.inputType === 'insertFromPaste') {
        // Let handlePaste handle this
        return;
      }
    }, [isEditing]);

    const baseClassName = [
      'inline-editor',
      isEditing ? 'inline-editor--editing' : 'inline-editor--display',
      disabled ? 'inline-editor--disabled' : '',
      readOnly ? 'inline-editor--readonly' : '',
      validationError ? 'inline-editor--error' : '',
      hasChanges ? 'inline-editor--changed' : '',
      className
    ].filter(Boolean).join(' ');

    const displayValue = currentValue || placeholder;
    const isEmpty = !currentValue;

    // Enhanced ARIA attributes
    const ariaAttributes = React.useMemo(() => ({
      'aria-label': ariaLabel || (isEditing ? 'Edit text' : 'Click to edit text'),
      'aria-description': ariaDescription || 'Press Enter to save, Escape to cancel',
      'aria-multiline': multiline,
      'aria-readonly': readOnly,
      'aria-disabled': disabled,
      'aria-invalid': !!validationError,
      'aria-live': isEditing ? 'polite' : undefined,
      'aria-atomic': isEditing ? 'true' : undefined
    }), [ariaLabel, ariaDescription, multiline, readOnly, disabled, validationError, isEditing]);

    return (
      <div className="inline-editor-container" style={{ position: 'relative' }}>
        <Component
          ref={editorRef}
          className={baseClassName}
          style={style}
          contentEditable={isEditing && !disabled && !readOnly}
          suppressContentEditableWarning
          onClick={handleClick}
          onInput={handleInput}
          onBeforeInput={handleBeforeInput}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onPaste={handlePaste}
          role={isEditing ? 'textbox' : 'button'}
          tabIndex={disabled ? -1 : 0}
          {...ariaAttributes}
          data-placeholder={isEmpty ? placeholder : undefined}
        >
          {isEditing ? currentValue : displayValue}
        </Component>

        {/* Edit indicator with enhanced accessibility */}
        {showEditIndicator && !isEditing && !disabled && !readOnly && (
          <span 
            className="inline-editor-indicator" 
            aria-hidden="true"
            role="presentation"
          >
            {editIndicator || '✏️'}
          </span>
        )}

        {/* Validation error with enhanced accessibility */}
        {validationError && (
          <div 
            className="inline-editor-error" 
            role="alert"
            aria-live="assertive"
          >
            {validationError}
          </div>
        )}

        {/* Character counter with accessibility */}
        {maxLength && isEditing && (
          <div 
            className="inline-editor-counter"
            aria-label={`${currentValue.length} of ${maxLength} characters used`}
          >
            {currentValue.length}/{maxLength}
          </div>
        )}

        {/* Action buttons with enhanced accessibility */}
        {isEditing && (
          <div className="inline-editor-actions" role="group" aria-label="Edit actions">
            <button
              type="button"
              className="inline-editor-save"
              onClick={() => stopEditing(true)}
              disabled={!!validationError}
              aria-label="Save changes"
              onMouseDown={(e) => e.preventDefault()} // Prevent blur when clicking
            >
              ✓
            </button>
            <button
              type="button"
              className="inline-editor-cancel"
              onClick={() => stopEditing(false)}
              aria-label="Cancel editing"
              onMouseDown={(e) => e.preventDefault()} // Prevent blur when clicking
            >
              ✕
            </button>
          </div>
        )}
      </div>
    );
  }
));

InlineEditor.displayName = 'InlineEditor';