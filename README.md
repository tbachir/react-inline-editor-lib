# @burner/inline-editor

A modern, transparent inline content editor for React, designed to seamlessly integrate into any existing website with zero layout disruption.

## 🚀 Features

- **Zero Layout Shift**: Seamless WYSIWYG editing that preserves your original design
- **Modern Design System**: Built with accessibility and performance in mind
- **TypeScript Support**: Full type safety and IntelliSense support
- **Mobile Optimized**: Touch-friendly interface with responsive design
- **Accessibility First**: WCAG 2.1 AA compliant with screen reader support
- **Real-time Collaboration**: Version conflict detection and resolution
- **WordPress Integration**: Built-in support for WordPress REST API
- **Customizable**: Extensive theming and configuration options

## 📦 Installation

```bash
npm install @burner/inline-editor
```

### Required Peer Dependencies

```bash
npm install react react-dom framer-motion react-hot-toast lucide-react
```

## ⚙️ Quick Setup

### 1. Basic Configuration

Wrap your application with the `InlineEditor` provider:

```tsx
import React from 'react';
import { InlineEditor } from '@burner/inline-editor';
import '@burner/inline-editor/dist/style.css';

function App() {
  return (
    <InlineEditor useModernDesign={true}>
      <div className="your-app">
        {/* Your existing content */}
        <YourExistingComponents />
      </div>
    </InlineEditor>
  );
}

export default App;
```

### 2. Environment Variables

Create a `.env` file in your project root:

```env
# Your WordPress/API base URL
VITE_API_BASE_URL=https://your-site.com

# Enable debug mode (development only)
VITE_DEBUG_ENABLED=true

# Minimum loader duration (optional)
VITE_MIN_LOADER_DURATION=500
```

## 🎯 Usage Examples

### Inline Text Editing

```tsx
import { ModernEditableWrapper } from '@burner/inline-editor';

function MyComponent() {
  return (
    <div>
      <ModernEditableWrapper 
        id="welcome-title"
        as="h1"
        className="text-4xl font-bold"
        placeholder="Enter your title..."
      >
        Default Title
      </ModernEditableWrapper>
      
      <ModernEditableWrapper 
        id="description"
        as="p"
        multiline={true}
        maxLength={500}
        className="text-gray-600 mt-4"
      >
        Default description that can be edited inline...
      </ModernEditableWrapper>
    </div>
  );
}
```

### Image Editing

```tsx
import { ModernEditableImage } from '@burner/inline-editor';

function Hero() {
  return (
    <div className="hero">
      <ModernEditableImage
        id="hero-image"
        src="/images/default-hero.jpg"
        alt="Hero image"
        className="w-full h-96 object-cover rounded-lg"
        width={800}
        height={400}
      />
    </div>
  );
}
```

### Background Image Editing

```tsx
import { EditableBackground } from '@burner/inline-editor';

function Section() {
  return (
    <EditableBackground
      id="section-bg"
      backgroundImage="url('/images/default-bg.jpg')"
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="text-white text-center">
        <h2>Content with editable background</h2>
      </div>
    </EditableBackground>
  );
}
```

### Attribute Editing

```tsx
import { EditableAttribute } from '@burner/inline-editor';

function Navigation() {
  return (
    <nav>
      <EditableAttribute
        id="nav-link-1"
        attribute="href"
        defaultValue="/home"
        validator={(url) => url.startsWith('/') || url.startsWith('http')}
        editLabel="Link URL"
      >
        <a className="nav-link">
          Home
        </a>
      </EditableAttribute>
    </nav>
  );
}
```

### Accessibility-Enhanced Editing

```tsx
import { AccessibleEditableWrapper } from '@burner/inline-editor';

function AccessibleContent() {
  return (
    <AccessibleEditableWrapper
      id="accessible-content"
      ariaLabel="Main heading"
      ariaDescription="Press Enter or F2 to edit this heading"
      role="heading"
      as="h1"
    >
      Accessible Content
    </AccessibleEditableWrapper>
  );
}
```

## 🔧 Component API Reference

### ModernEditableWrapper

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | **required** | Unique identifier for the content |
| `children` | `ReactNode` | **required** | Default content to display |
| `as` | `keyof JSX.IntrinsicElements` | `'span'` | HTML element to render |
| `multiline` | `boolean` | `true` | Allow line breaks in content |
| `maxLength` | `number` | - | Maximum character length |
| `placeholder` | `string` | - | Placeholder text in edit mode |
| `className` | `string` | `''` | Additional CSS classes |
| `showEditableHighlights` | `boolean` | `false` | Show editable outlines |

### ModernEditableImage

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | **required** | Unique identifier for the image |
| `src` | `string` | **required** | Default image URL |
| `alt` | `string` | `''` | Alternative text |
| `className` | `string` | `''` | CSS classes |
| `style` | `CSSProperties` | `{}` | Inline styles |
| `width` | `number\|string` | - | Image width |
| `height` | `number\|string` | - | Image height |
| `loading` | `'lazy'\|'eager'` | `'lazy'` | Loading strategy |

### EditableBackground

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | **required** | Unique identifier |
| `backgroundImage` | `string` | **required** | CSS background-image value |
| `children` | `ReactNode` | **required** | Content to display |
| `className` | `string` | `''` | CSS classes |
| `style` | `CSSProperties` | `{}` | Inline styles |
| `as` | `keyof JSX.IntrinsicElements` | `'div'` | HTML element to render |

### EditableAttribute

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | **required** | Unique identifier |
| `attribute` | `string` | **required** | HTML attribute to edit |
| `defaultValue` | `string` | **required** | Default attribute value |
| `children` | `ReactElement` | **required** | Element to enhance |
| `validator` | `(value: string) => boolean\|string` | - | Value validation function |
| `transformer` | `(value: string) => string` | - | Value transformation function |
| `editLabel` | `string` | - | Custom edit button label |

## 🎨 Hooks and Utilities

### useAuth

```tsx
import { useAuth } from '@burner/inline-editor';

function MyComponent() {
  const { isAuthenticated, user, logout } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Logged in as {user?.name}</p>
      ) : (
        <p>Not authenticated</p>
      )}
    </div>
  );
}
```

### useContent

```tsx
import { useContent } from '@burner/inline-editor';

function MyComponent() {
  const { isLoading, contents, refreshContents } = useContent();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <button onClick={refreshContents}>
        Refresh Content
      </button>
      <p>{Object.keys(contents).length} contents loaded</p>
    </div>
  );
}
```

### useNotifications

```tsx
import { useNotifications } from '@burner/inline-editor';

function MyComponent() {
  const { success, error, promise } = useNotifications();
  
  const handleSave = async () => {
    try {
      await promise(
        saveMyData(),
        {
          loading: 'Saving...',
          success: 'Saved successfully!',
          error: 'Failed to save'
        }
      );
    } catch (err) {
      error('An error occurred');
    }
  };
  
  return (
    <button onClick={handleSave}>
      Save Data
    </button>
  );
}
```

### useAccessibility

```tsx
import { useAccessibility } from '@burner/inline-editor';

function AccessibleComponent() {
  const { announce, manageFocus, createKeyboardHandler } = useAccessibility();
  
  const handleEdit = () => {
    announce('Now editing content', 'assertive');
  };
  
  const keyboardHandler = createKeyboardHandler({
    'Enter': handleEdit,
    'Escape': () => announce('Edit cancelled'),
  });
  
  return (
    <div onKeyDown={keyboardHandler}>
      Accessible content
    </div>
  );
}
```

## 🔒 Authentication

The editor uses a "magic token" system for authentication:

1. **Server-side**: Generate a JWT with appropriate claims
2. **Client-side**: Add the token to the URL: `?magic_token=YOUR_JWT_TOKEN`

The token is automatically detected and stored in localStorage.

### Example JWT Payload

```json
{
  "sub": "user123",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "editor",
  "exp": 1640995200
}
```

## 🔧 Backend API Requirements

### Required Endpoints

Your WordPress/API backend must expose these endpoints:

```
GET    /wp-json/api/editable-content          # Load all content
POST   /wp-json/api/editable-content/save     # Save content
GET    /wp-json/api/editable-content/get      # Get specific content
POST   /wp-json/wp/v2/media                   # Upload media
POST   /wp-json/api/media/import-url          # Import from URL
```

### Content Data Structure

```typescript
interface EditableContent {
  editable_id?: string;
  content: string;
  context: string;
  context_id: string;
  version?: number;
  contentType?: 'text' | 'html' | 'markdown';
  lastModified?: number;
}
```

### Save Request Format

```typescript
interface SaveContentRequest {
  content: string;
  context: string;
  context_id: string;
  content_type?: string;
  version?: number;
  isDefaultContent?: boolean;
}
```

## 🎨 Theming and Customization

### CSS Custom Properties

The editor uses CSS custom properties for easy theming:

```css
:root {
  /* Primary colors */
  --editor-primary-500: #3b82f6;
  --editor-primary-600: #2563eb;
  
  /* Success/error colors */
  --editor-success-500: #10b981;
  --editor-error-500: #ef4444;
  
  /* Neutral colors */
  --editor-neutral-50: #f9fafb;
  --editor-neutral-900: #111827;
  
  /* Spacing */
  --editor-space-sm: 0.5rem;
  --editor-space-md: 1rem;
  
  /* Shadows */
  --editor-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  /* Animations */
  --editor-duration-fast: 150ms;
}
```

### Dark Mode Support

The editor automatically adapts to system dark mode preferences:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --editor-neutral-50: #1f2937;
    --editor-neutral-900: #ffffff;
  }
}
```

### Custom Design Tokens

```tsx
import { designTokens } from '@burner/inline-editor';

// Access design tokens in your components
const customStyle = {
  color: designTokens.colors.primary[500],
  padding: designTokens.spacing.md,
  borderRadius: designTokens.borderRadius.lg,
};
```

## 📱 Mobile Optimization

### Touch-Friendly Interface

```tsx
import { MobileEditingInterface } from '@burner/inline-editor';

function MobileEditor() {
  return (
    <MobileEditingInterface
      isVisible={isEditing}
      onSave={handleSave}
      onCancel={handleCancel}
      hasChanges={hasUnsavedChanges}
      isSaving={isSaving}
    />
  );
}
```

### Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px  
- **Desktop**: ≥ 1024px

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance

- **Keyboard Navigation**: Full keyboard support with logical tab order
- **Screen Reader Support**: ARIA labels and live regions
- **Color Contrast**: Minimum 4.5:1 contrast ratio
- **Touch Targets**: Minimum 44x44px touch targets
- **Focus Management**: Clear focus indicators and management

### Keyboard Shortcuts

- **Enter/Space**: Start editing
- **Escape**: Cancel editing
- **F2**: Toggle edit mode
- **Ctrl+Enter**: Save changes
- **Ctrl+S**: Save changes

## 🐛 Debug Mode

Enable debug mode for development:

```env
VITE_DEBUG_ENABLED=true
```

The debug panel shows:
- Authentication status
- Content state
- Context information
- Environment variables
- Performance metrics

## 📊 Performance Features

### Optimizations

- **Debounced Saving**: Prevents excessive API calls
- **Content Caching**: 5-minute TTL cache for frequently accessed content
- **Virtual Scrolling**: For large content lists
- **Lazy Loading**: Images and components load on demand
- **Bundle Splitting**: Optimized chunk sizes

### Bundle Size

- **ES Module**: ~99KB (gzipped: ~25KB)
- **UMD**: ~62KB (gzipped: ~20KB)
- **CSS**: ~13KB (gzipped: ~3KB)

## 🔄 Version Conflict Resolution

Handle concurrent editing scenarios:

```tsx
<InlineEditor
  onVersionConflict={async (conflict) => {
    const choice = await showConflictDialog(conflict);
    return choice; // 'overwrite' | 'keep_server' | 'cancel'
  }}
>
  {/* Your app */}
</InlineEditor>
```

## 📦 Build and Distribution

### Building the Library

```bash
npm run build
```

### Using in Your Project

```tsx
// ES Modules
import { InlineEditor, ModernEditableWrapper } from '@burner/inline-editor';
import '@burner/inline-editor/dist/style.css';

// UMD (browser)
<script src="https://unpkg.com/@burner/inline-editor/dist/inline-editor.umd.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@burner/inline-editor/dist/style.css">
```

## 🔧 Advanced Configuration

### Custom API Service

```tsx
import { ApiService } from '@burner/inline-editor';

const customApiService = new ApiService('https://custom-api.com');

// Use with ContentProvider
<ContentProvider apiBaseUrl="https://custom-api.com">
  {/* Your app */}
</ContentProvider>
```

### Custom Notification Provider

```tsx
import { NotificationProvider } from '@burner/inline-editor';

<NotificationProvider>
  <InlineEditor>
    {/* Your app */}
  </InlineEditor>
</NotificationProvider>
```

## 🚀 Migration Guide

### From v0.x to v1.x

1. **Update imports**:
   ```tsx
   // Old
   import { EditableWrapper } from '@burner/inline-editor';
   
   // New
   import { ModernEditableWrapper } from '@burner/inline-editor';
   ```

2. **Update CSS imports**:
   ```tsx
   // Old
   import '@burner/inline-editor/styles.css';
   
   // New
   import '@burner/inline-editor/dist/style.css';
   ```

3. **Update prop names**:
   ```tsx
   // Old
   <EditableWrapper showHighlights={true} />
   
   // New
   <ModernEditableWrapper showEditableHighlights={true} />
   ```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
git clone https://github.com/your-org/inline-editor.git
cd inline-editor
npm install
npm run dev
```

### Running Tests

```bash
npm test
npm run test:coverage
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [https://docs.inline-editor.dev](https://docs.inline-editor.dev)
- **Issues**: [GitHub Issues](https://github.com/your-org/inline-editor/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/inline-editor/discussions)
- **Email**: support@inline-editor.dev

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Icons by [Lucide](https://lucide.dev/)
- Notifications by [React Hot Toast](https://react-hot-toast.com/)

---

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Compatibility**: React 18+, TypeScript 4.5+, Node.js 16+