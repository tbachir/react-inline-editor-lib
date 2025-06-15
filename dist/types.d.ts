export interface EditableContent {
    editable_id?: string;
    content: string;
    context: string;
    context_id: string;
    version?: number;
    contentType?: 'text' | 'html' | 'markdown';
    lastModified?: number;
}
export interface ContentContextValue {
    isLoading: boolean;
    contents: Record<string, EditableContent>;
    getContent: (context: string, contextId: string, defaultContent: string) => string;
    saveContent: (editableContent: EditableContent, defaultContent?: string) => Promise<boolean>;
    refreshContents: () => Promise<void>;
    resolveConflict?: (content: EditableContent, forceOverwrite: boolean) => Promise<boolean>;
}
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
export interface EditableContentContextType {
    path: string;
    sectionId: number;
    sectionSelector: string;
}
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
}
export interface ContentResponse {
    editable_id: string;
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
    version?: number;
    isDefaultContent?: boolean;
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
export interface EditorConfig {
    id: string;
    multiline?: boolean;
    maxLength?: number;
    placeholder?: string;
}
export interface ConflictResolutionCallback {
    (conflict: {
        clientVersion: number;
        serverVersion: number;
        serverContent: string;
        clientContent: string;
    }): Promise<'overwrite' | 'keep_server' | 'cancel'>;
}
export interface DebugSection {
    id: string;
    title: string;
    component: React.ComponentType;
    order?: number;
}
