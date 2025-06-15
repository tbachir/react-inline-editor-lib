export interface InlineEditorRef {
  startEditing: () => void;
  stopEditing: (save?: boolean) => void;
  getValue: () => string;
  isEditing: () => boolean;
}

export interface InlineEditorProps {
  /** The initial text content */
  value: string;
  /** Callback fired when the content changes */
  onChange: (value: string) => void;
  /** Callback fired when editing starts */
  onEditStart?: () => void;
  /** Callback fired when editing completes */
  onEditComplete?: (value: string) => void;
  /** Callback fired when editing is cancelled */
  onEditCancel?: () => void;
  /** Whether the editor allows multiple lines */
  multiline?: boolean;
  /** Maximum character length */
  maxLength?: number;
  /** Placeholder text when empty */
  placeholder?: string;
  /** Custom CSS class name */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** HTML element type to render */
  as?: keyof JSX.IntrinsicElements;
  /** Whether the editor is disabled */
  disabled?: boolean;
  /** Whether the editor is read-only */
  readOnly?: boolean;
  /** Validation function */
  validate?: (value: string) => string | null;
  /** Auto-save delay in milliseconds */
  autoSaveDelay?: number;
  /** Whether to show edit indicators */
  showEditIndicator?: boolean;
  /** Custom edit indicator content */
  editIndicator?: React.ReactNode;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** ARIA description for accessibility */
  ariaDescription?: string;
  /** Custom keyboard shortcuts */
  keyboardShortcuts?: {
    save?: string[];
    cancel?: string[];
  };
}

export interface InlineEditorState {
  isEditing: boolean;
  currentValue: string;
  originalValue: string;
  validationError: string | null;
  hasChanges: boolean;
}

export interface UseInlineEditorOptions {
  value: string;
  onChange: (value: string) => void;
  onEditStart?: () => void;
  onEditComplete?: (value: string) => void;
  onEditCancel?: () => void;
  validate?: (value: string) => string | null;
  autoSaveDelay?: number;
  multiline?: boolean;
  maxLength?: number;
}

export interface UseInlineEditorReturn {
  isEditing: boolean;
  currentValue: string;
  validationError: string | null;
  hasChanges: boolean;
  startEditing: () => void;
  stopEditing: (save?: boolean) => void;
  updateValue: (value: string) => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
  handleBlur: () => void;
  editorRef: React.RefObject<HTMLElement>;
}