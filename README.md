# @cryptonic/inline-editor

Un éditeur de contenu inline moderne et transparent pour React, conçu pour s'intégrer parfaitement dans n'importe quel site web existant.

## 🚀 Installation

```bash
npm install @cryptonic/inline-editor
```

### Dépendances requises (peer dependencies)

```bash
npm install react react-dom framer-motion react-hot-toast lucide-react
```

## ⚙️ Configuration

### 1. Configuration de base

Wrappez votre application avec le provider `InlineEditor` :

```tsx
import React from 'react';
import { InlineEditor } from '@cryptonic/inline-editor';
import '@cryptonic/inline-editor/dist/style.css';

function App() {
  return (
    <InlineEditor useModernDesign={true}>
      <div className="your-app">
        {/* Votre contenu existant */}
        <YourExistingComponents />
      </div>
    </InlineEditor>
  );
}

export default App;
```

### 2. Variables d'environnement

Créez un fichier `.env` à la racine de votre projet :

```env
# URL de base de votre API WordPress
VITE_API_BASE_URL=https://votre-site.com

# Activation du mode debug (développement uniquement)
VITE_DEBUG_ENABLED=true

# Durée minimale du loader (optionnel)
VITE_MIN_LOADER_DURATION=500
```

## 🎯 Utilisation

### Éditeur de texte inline

```tsx
import { ModernEditableWrapper } from '@cryptonic/inline-editor';

function MyComponent() {
  return (
    <div>
      <ModernEditableWrapper 
        id="welcome-title"
        as="h1"
        className="text-4xl font-bold"
        placeholder="Entrez votre titre..."
      >
        Titre par défaut
      </ModernEditableWrapper>
      
      <ModernEditableWrapper 
        id="description"
        as="span"
        multiline={true}
        maxLength={500}
        className="text-gray-600 mt-4"
      >
        Description par défaut qui peut être éditée...
      </ModernEditableWrapper>
    </div>
  );
}
```

### Éditeur d'images

```tsx
import { ModernEditableImage } from '@cryptonic/inline-editor';

function Hero() {
  return (
    <div className="hero">
      <ModernEditableImage
        id="hero-image"
        src="/images/default-hero.jpg"
        alt="Image hero"
        className="w-full h-96 object-cover rounded-lg"
        width={800}
        height={400}
      />
    </div>
  );
}
```

### Éditeur d'arrière-plan

```tsx
import { EditableBackground } from '@cryptonic/inline-editor';

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
        <h2>Contenu avec arrière-plan éditable</h2>
      </div>
    </EditableBackground>
  );
}
```

### Éditeur d'attributs

```tsx
import { EditableAttribute } from '@cryptonic/inline-editor';

function Navigation() {
  return (
    <nav>
      <EditableAttribute
        id="nav-link-1"
        attribute="href"
        defaultValue="/accueil"
        validator={(url) => url.startsWith('/') || url.startsWith('http')}
        editLabel="URL du lien"
      >
        <a className="nav-link">
          Accueil
        </a>
      </EditableAttribute>
    </nav>
  );
}
```

## 🔧 API des composants

### ModernEditableWrapper

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `id` | `string` | **requis** | Identifiant unique du contenu |
| `children` | `ReactNode` | **requis** | Contenu par défaut |
| `as` | `keyof JSX.IntrinsicElements` | `'span'` | Élément HTML à rendre |
| `multiline` | `boolean` | `true` | Autoriser les retours à la ligne |
| `maxLength` | `number` | - | Longueur maximale du texte |
| `placeholder` | `string` | - | Texte placeholder en mode édition |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `showEditableHighlights` | `boolean` | `false` | Afficher les contours éditables |

### ModernEditableImage

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `id` | `string` | **requis** | Identifiant unique de l'image |
| `src` | `string` | **requis** | URL de l'image par défaut |
| `alt` | `string` | `''` | Texte alternatif |
| `className` | `string` | `''` | Classes CSS |
| `style` | `CSSProperties` | `{}` | Styles inline |
| `width` | `number\|string` | - | Largeur de l'image |
| `height` | `number\|string` | - | Hauteur de l'image |
| `loading` | `'lazy'\|'eager'` | `'lazy'` | Stratégie de chargement |

## 🎨 Hooks utiles

### useAuth

```tsx
import { useAuth } from '@cryptonic/inline-editor';

function MyComponent() {
  const { isAuthenticated, user, logout } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Connecté en tant que {user?.name}</p>
      ) : (
        <p>Non connecté</p>
      )}
    </div>
  );
}
```

### useContent

```tsx
import { useContent } from '@cryptonic/inline-editor';

function MyComponent() {
  const { isLoading, contents, refreshContents } = useContent();
  
  if (isLoading) {
    return <div>Chargement...</div>;
  }
  
  return (
    <div>
      <button onClick={refreshContents}>
        Actualiser le contenu
      </button>
      <p>{Object.keys(contents).length} contenus chargés</p>
    </div>
  );
}
```

### useNotifications

```tsx
import { useNotifications } from '@cryptonic/inline-editor';

function MyComponent() {
  const { success, error, promise } = useNotifications();
  
  const handleSave = async () => {
    try {
      await promise(
        saveMyData(),
        {
          loading: 'Sauvegarde...',
          success: 'Sauvegardé avec succès !',
          error: 'Erreur lors de la sauvegarde'
        }
      );
    } catch (err) {
      error('Une erreur est survenue');
    }
  };
  
  return (
    <button onClick={handleSave}>
      Sauvegarder
    </button>
  );
}
```

## 🔒 Authentification

L'éditeur utilise un système de "magic tokens". Pour authentifier un utilisateur :

1. **Côté serveur** : Générez un JWT avec les claims appropriés
2. **Côté client** : Ajoutez le token dans l'URL : `?magic_token=YOUR_JWT_TOKEN`

Le token sera automatiquement détecté et stocké dans le localStorage.

## 🔧 Configuration API Backend

### Endpoints requis

Votre API WordPress doit exposer ces endpoints :

```
GET    /wp-json/api/editable-content
POST   /wp-json/api/editable-content/save
GET    /wp-json/api/editable-content/get
POST   /wp-json/wp/v2/media
POST   /wp-json/api/media/import-url
```

### Structure des données

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

## 📦 Build et déploiement

### Build de production

```bash
npm run build
```

### Utilisation dans votre projet

```tsx
import { InlineEditor, ModernEditableWrapper } from '@cryptonic/inline-editor';
import '@cryptonic/inline-editor/dist/style.css';

function App() {
  return (
    <InlineEditor>
      <ModernEditableWrapper id="my-content">
        Mon contenu éditable
      </ModernEditableWrapper>
    </InlineEditor>
  );
}
```

## 🎨 Personnalisation CSS

L'éditeur utilise des variables CSS que vous pouvez personnaliser :

```css
:root {
  /* Couleurs principales */
  --editor-primary: #3b82f6;
  --editor-success: #10b981;
  --editor-danger: #ef4444;
  --editor-warning: #f59e0b;
  
  /* Surfaces */
  --editor-surface: rgba(255, 255, 255, 0.95);
  --editor-border: rgba(0, 0, 0, 0.1);
  
  /* Ombres */
  --editor-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --editor-transition-fast: 100ms ease;
}
```

## 🐛 Débogage

### Mode Debug

Activez le mode debug avec `VITE_DEBUG_ENABLED=true` pour afficher :
- Panel de debug en bas à droite
- Informations d'authentification
- État du contenu
- Contexte des éléments
- Variables d'environnement

## 📄 Licence

MIT License

## 🤝 Support

Pour toute question ou problème, consultez la documentation ou créez une issue sur le repository.

**Version** : 1.0.0  
**Dernière mise à jour** : Décembre 2024