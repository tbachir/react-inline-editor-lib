// src/inline-editor/types.ts

// ==================== CONTENT TYPES ====================

export interface EditableContent {
  editable_id?: string;  // Défini uniquement par l'API
  content: string;       // Toujours requis
  context: string;       // Toujours requis et non vide
  context_id: string;    // Toujours requis et non vide
  version?: number;      // Défini uniquement par l'API
  contentType?: 'text' | 'html' | 'markdown';
  lastModified?: number;
}

export interface ContentContextValue {
  isLoading: boolean;
  contents: Record<string, EditableContent>;
  getContent: (context: string, contextId: string, defaultContent: string) => string;
  saveContent: (editableContent: EditableContent, defaultContent?: string) => Promise<boolean>;
  refreshContents: () => Promise<void>;
  // Nouvelle méthode pour gérer les conflits
  resolveConflict?: (content: EditableContent, forceOverwrite: boolean) => Promise<boolean>;
}

// ==================== AUTH TYPES ====================

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthContextValue {
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
}

// ==================== CONTEXT TYPES ====================

export interface EditableContentContextType {
  path: string;
  sectionId: number;
  sectionSelector: string;
}

// ==================== API TYPES ====================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface ContentResponse {
  editable_id: string;   // Maintenant toujours présent
  content: string;
  context: string;
  context_id: string;
  version: number;
  content_type?: string;
}

export interface SaveContentRequest {
  content: string;
  context: string;
  context_id: string;
  content_type?: string;
  version?: number;              // Version actuelle côté client
  isDefaultContent?: boolean;    // Flag pour contenu par défaut
}

export interface SaveContentResponse {
  status: 'success' | 'conflict' | 'no_action' | 'no_change' | 'error';
  message: string;
  data?: {
    editable_id: string;
    content: string;
    context: string;
    context_id: string;
    version: number;
    content_type: string;
  };
  conflict?: {
    client_version: number;
    server_version: number;
    server_content: string;
    editable_id: string;
  };
}

// ==================== EDITOR TYPES ====================

export interface EditorConfig {
  id: string;
  multiline?: boolean;
  maxLength?: number;
  placeholder?: string;
}

// Nouveau type pour les callbacks de résolution de conflit
export interface ConflictResolutionCallback {
  (conflict: {
    clientVersion: number;
    serverVersion: number;
    serverContent: string;
    clientContent: string;
  }): Promise<'overwrite' | 'keep_server' | 'cancel'>;
}

// ==================== DEBUG TYPES ====================

export interface DebugSection {
  id: string;
  title: string;
  component: React.ComponentType;
  order?: number;
}