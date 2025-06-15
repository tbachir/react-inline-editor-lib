import React from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { ModernEditableWrapper } from '../editor/ModernEditableWrapper';

interface AccessibleEditableWrapperProps {
  children: React.ReactNode;
  id: string;
  multiline?: boolean;
  maxLength?: number;
  placeholder?: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  showEditableHighlights?: boolean;
  ariaLabel?: string;
  ariaDescription?: string;
  role?: string;
}

/**
 * Accessibility-enhanced editable wrapper
 * Implements WCAG 2.1 AA compliance
 */
export const AccessibleEditableWrapper: React.FC<AccessibleEditableWrapperProps> = ({
  children,
  id,
  ariaLabel,
  ariaDescription,
  role = 'textbox',
  ...props
}) => {
  const { announce, manageFocus, createKeyboardHandler } = useAccessibility();
  const [isEditing, setIsEditing] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  // Enhanced keyboard navigation
  const handleKeyDown = React.useCallback(
    createKeyboardHandler({
      'Enter': () => {
        if (!isEditing) {
          setIsEditing(true);
          announce(`Editing ${ariaLabel || id}`, 'assertive');
        }
      },
      'Escape': () => {
        if (isEditing) {
          setIsEditing(false);
          announce('Editing cancelled', 'polite');
          manageFocus(wrapperRef.current);
        }
      },
      'F2': () => {
        setIsEditing(!isEditing);
        announce(isEditing ? 'Editing cancelled' : `Editing ${ariaLabel || id}`, 'assertive');
      }
    }),
    [isEditing, ariaLabel, id, announce, manageFocus, createKeyboardHandler]
  );

  // Announce state changes
  React.useEffect(() => {
    if (isEditing) {
      announce(`Now editing ${ariaLabel || id}. Press Escape to cancel, or save your changes.`, 'assertive');
    }
  }, [isEditing, ariaLabel, id, announce]);

  return (
    <div
      ref={wrapperRef}
      role={role}
      aria-label={ariaLabel || `Editable content: ${id}`}
      aria-description={ariaDescription || 'Press Enter or F2 to edit this content'}
      aria-expanded={isEditing}
      aria-busy={false}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{
        position: 'relative',
        outline: 'none',
      }}
    >
      <ModernEditableWrapper
        {...props}
        id={id}
      >
        {children}
      </ModernEditableWrapper>
      
      {/* Screen reader only instructions */}
      <div className="sr-only" aria-live="polite">
        {isEditing && 'Currently editing. Press Escape to cancel or save your changes.'}
      </div>
    </div>
  );
};