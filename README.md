# @tbachir/react-inline-editor

A modern, accessible React inline editor component with TypeScript support. Perfect for creating seamless in-place editing experiences in your React applications.

## Features

- 🎯 **Zero Dependencies** - Only requires React as a peer dependency
- 🔧 **TypeScript Support** - Full type safety and IntelliSense
- ♿ **Accessibility First** - WCAG 2.1 AA compliant with screen reader support
- 🎨 **Customizable** - Flexible styling and theming options
- 📱 **Mobile Friendly** - Touch-optimized interface
- ⌨️ **Keyboard Navigation** - Full keyboard support with customizable shortcuts
- 🔍 **Validation** - Built-in validation with custom error messages
- 💾 **Auto-save** - Optional auto-save functionality
- 🎭 **Multiple Modes** - Single-line and multi-line editing support

## Installation

```bash
npm install @tbachir/react-inline-editor
```

## Quick Start

```tsx
import React, { useState } from 'react';
import { InlineEditor } from '@tbachir/react-inline-editor';
import '@tbachir/react-inline-editor/styles';

function App() {
  const [text, setText] = useState('Click to edit this text');

  return (
    <div>
      <h1>
        <InlineEditor
          value={text}
          onChange={setText}
          placeholder="Enter your title..."
        />
      </h1>
    </div>
  );
}
```

## API Reference

### InlineEditor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | The current text value |
| `onChange` | `(value: string) => void` | **required** | Callback when value changes |
| `onEditStart` | `() => void` | - | Callback when editing starts |
| `onEditComplete` | `(value: string) => void` | - | Callback when editing completes |
| `onEditCancel` | `() => void` | - | Callback when editing is cancelled |
| `multiline` | `boolean` | `false` | Allow multiple lines |
| `maxLength` | `number` | - | Maximum character length |
| `placeholder` | `string` | `'Click to edit...'` | Placeholder text |
| `className` | `string` | `''` | Custom CSS class |
| `style` | `React.CSSProperties` | `{}` | Inline styles |
| `as` | `keyof JSX.IntrinsicElements` | `'span'` | HTML element type |
| `disabled` | `boolean` | `false` | Disable editing |
| `readOnly` | `boolean` | `false` | Read-only mode |
| `validate` | `(value: string) => string \| null` | - | Validation function |
| `autoSaveDelay` | `number` | `0` | Auto-save delay in ms |
| `showEditIndicator` | `boolean` | `true` | Show edit indicator |
| `editIndicator` | `React.ReactNode` | `'✏️'` | Custom edit indicator |
| `ariaLabel` | `string` | - | ARIA label |
| `ariaDescription` | `string` | - | ARIA description |
| `keyboardShortcuts` | `object` | `{save: ['Enter'], cancel: ['Escape']}` | Custom keyboard shortcuts |

### Keyboard Shortcuts

The `keyboardShortcuts` prop allows you to customize which keys trigger save and cancel actions:

```tsx
<InlineEditor
  value={text}
  onChange={setText}
  keyboardShortcuts={{
    save: ['Enter', 'Tab'],        // Multiple keys can trigger save
    cancel: ['Escape', 'Delete']   // Multiple keys can trigger cancel
  }}
/>
```

**Default shortcuts:**
- **Save**: `Enter` (or `Ctrl+Enter` in multiline mode)
- **Cancel**: `Escape`
- **Universal Save**: `Ctrl+S` / `Cmd+S` (always available)

### useInlineEditor Hook

For advanced use cases, you can use the `useInlineEditor` hook directly:

```tsx
import { useInlineEditor } from '@tbachir/react-inline-editor';

function CustomEditor() {
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
    value: 'Initial value',
    onChange: (value) => console.log(value),
    validate: (value) => value.length < 3 ? 'Too short' : null,
    keyboardShortcuts: {
      save: ['Enter', 'Tab'],
      cancel: ['Escape']
    }
  });

  // Your custom implementation
}
```

## Examples

### Basic Usage

```tsx
import { InlineEditor } from '@tbachir/react-inline-editor';

function BasicExample() {
  const [title, setTitle] = useState('My Title');
  
  return (
    <InlineEditor
      value={title}
      onChange={setTitle}
      placeholder="Enter title..."
    />
  );
}
```

### With Validation

```tsx
function ValidatedEditor() {
  const [email, setEmail] = useState('');
  
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Please enter a valid email';
  };
  
  return (
    <InlineEditor
      value={email}
      onChange={setEmail}
      validate={validateEmail}
      placeholder="Enter your email..."
    />
  );
}
```

### Multiline with Auto-save

```tsx
function MultilineEditor() {
  const [description, setDescription] = useState('');
  
  return (
    <InlineEditor
      value={description}
      onChange={setDescription}
      multiline
      autoSaveDelay={2000}
      maxLength={500}
      placeholder="Enter description..."
      as="div"
    />
  );
}
```

### Custom Keyboard Shortcuts

```tsx
function CustomShortcutsEditor() {
  const [text, setText] = useState('');
  
  return (
    <InlineEditor
      value={text}
      onChange={setText}
      keyboardShortcuts={{
        save: ['Enter', 'Tab'],
        cancel: ['Escape', 'Delete']
      }}
      placeholder="Try Tab to save, Delete to cancel..."
    />
  );
}
```

### Custom Styling

```tsx
function StyledEditor() {
  const [text, setText] = useState('Styled text');
  
  return (
    <InlineEditor
      value={text}
      onChange={setText}
      className="my-custom-editor"
      style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#2563eb'
      }}
    />
  );
}
```

### With Ref Access

```tsx
import { useRef } from 'react';
import { InlineEditor, InlineEditorRef } from '@tbachir/react-inline-editor';

function RefExample() {
  const editorRef = useRef<InlineEditorRef>(null);
  const [text, setText] = useState('Text with ref');
  
  const handleStartEdit = () => {
    editorRef.current?.startEditing();
  };
  
  return (
    <div>
      <InlineEditor
        ref={editorRef}
        value={text}
        onChange={setText}
      />
      <button onClick={handleStartEdit}>
        Start Editing
      </button>
    </div>
  );
}
```

## Styling

The component comes with default styles that you can import:

```tsx
import '@tbachir/react-inline-editor/styles';
```

### CSS Classes

The component uses these CSS classes that you can customize:

- `.inline-editor-container` - Container wrapper
- `.inline-editor` - Main editor element
- `.inline-editor--editing` - Applied when in edit mode
- `.inline-editor--display` - Applied when in display mode
- `.inline-editor--disabled` - Applied when disabled
- `.inline-editor--error` - Applied when validation fails
- `.inline-editor-indicator` - Edit indicator element
- `.inline-editor-error` - Validation error message
- `.inline-editor-counter` - Character counter
- `.inline-editor-actions` - Action buttons container

### Custom Theme Example

```css
.my-theme .inline-editor {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.my-theme .inline-editor--editing {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.my-theme .inline-editor-indicator {
  background-color: #10b981;
}
```

## Accessibility

The component is built with accessibility in mind:

- **Keyboard Navigation**: Full keyboard support with customizable shortcuts
- **Screen Readers**: Proper ARIA labels and live regions
- **Focus Management**: Logical focus flow and visible focus indicators
- **High Contrast**: Supports high contrast mode
- **Reduced Motion**: Respects user's motion preferences

### Keyboard Shortcuts

- **Enter**: Save changes (Ctrl+Enter in multiline mode)
- **Escape**: Cancel editing
- **Ctrl+S / Cmd+S**: Save changes
- **Tab**: Navigate between elements
- **Custom shortcuts**: Configurable via `keyboardShortcuts` prop

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © [tbachir](https://github.com/tbachir)