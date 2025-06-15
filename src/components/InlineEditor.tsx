import React, { forwardRef, useImperativeHandle } from 'react';
import { InlineEditorProps, InlineEditorRef } from '../types';
import { useInlineEditor } from '../hooks/useInlineEditor';

/**
 * A flexible and accessible React component for in-place text editing.
 * Supports single-line and multi-line editing, validation, auto-save,
 * and customizable styling.
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

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      startEditing,
      stopEditing,
      getValue: () => currentValue,
      isEditing: () => isEditing
    }), [startEditing, stopEditing, currentValue, isEditing]);

    const handleClick = () => {
      if (!disabled && !readOnly && !isEditing) {
        startEditing();
      }
    };

    const handleInput = (event: React.FormEvent<HTMLElement>) => {
      const target = event.target as HTMLElement;
      const newValue = target.textContent || '';
      updateValue(newValue);
    };

    const handlePaste = (event: React.ClipboardEvent) => {
      event.preventDefault();
      const text = event.clipboardData.getData('text/plain');
      
      // For multiline editors, preserve line breaks; for single-line, strip them
      const processedText = multiline ? text : text.replace(/\n/g, ' ');
      
      // Insert plain text only
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(processedText));
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      
      // Update value
      const target = event.target as HTMLElement;
      const newValue = target.textContent || '';
      updateValue(newValue);
    };

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
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onPaste={handlePaste}
          role={isEditing ? 'textbox' : 'button'}
          tabIndex={disabled ? -1 : 0}
          aria-label={ariaLabel || (isEditing ? 'Edit text' : 'Click to edit text')}
          aria-description={ariaDescription}
          aria-multiline={multiline}
          aria-readonly={readOnly}
          aria-disabled={disabled}
          aria-invalid={!!validationError}
          data-placeholder={isEmpty ? placeholder : undefined}
        >
          {isEditing ? currentValue : displayValue}
        </Component>

        {/* Edit indicator */}
        {showEditIndicator && !isEditing && !disabled && !readOnly && (
          <span className="inline-editor-indicator" aria-hidden="true">
            {editIndicator || '✏️'}
          </span>
        )}

        {/* Validation error */}
        {validationError && (
          <div className="inline-editor-error" role="alert">
            {validationError}
          </div>
        )}

        {/* Character counter */}
        {maxLength && isEditing && (
          <div className="inline-editor-counter">
            {currentValue.length}/{maxLength}
          </div>
        )}

        {/* Action buttons for editing mode */}
        {isEditing && (
          <div className="inline-editor-actions">
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