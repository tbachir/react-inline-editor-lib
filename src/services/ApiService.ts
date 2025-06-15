// src/inline-editor/services/ApiService.ts

import type {
    EditableContent,
    ContentResponse,
    SaveContentRequest,
} from '../types';

/**
 * Types spécifiques pour les réponses de l'API
 */
interface SaveContentResponse {
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

interface ApiError extends Error {
    status?: number;
    code?: string;
}

interface VersionConflictError extends Error {
    type: 'VERSION_CONFLICT';
    conflict: SaveContentResponse['conflict'];
}

/**
 * Service API centralisé pour tous les appels editable-content
 * Version améliorée avec gestion des conflits et retry automatique
 */
export class ApiService {
    private readonly baseUrl: string;
    private readonly config = {
        timeout: 30000,
        maxRetries: 3,
        retryDelay: 1000,
    };

    constructor(baseUrl?: string) {
        // Use environment variable with fallback
        this.baseUrl = (baseUrl || import.meta.env.VITE_API_BASE_URL || 'https://www.wow.cryptonic-drinks.com').replace(/\/+$/, '');
        
        console.log('[ApiService] Initialized with base URL:', this.baseUrl);
    }

    /**
     * Récupère le token d'authentification
     */
    private getAuthToken(): string | null {
        return localStorage.getItem('inline_editor_token');
    }

    /**
     * Prépare les headers pour les requêtes
     */
    private getHeaders(includeAuth: boolean = false): Record<string, string> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (includeAuth) {
            const token = this.getAuthToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }

        return headers;
    }

    /**
     * Exécute une requête avec timeout
     */
    private async fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            if (error instanceof Error && error.name === 'AbortError') {
                throw new Error('Request timeout');
            }
            throw error;
        }
    }

    /**
     * Exécute une requête avec retry automatique
     */
    private async fetchWithRetry<T>(
        url: string,
        options: RequestInit = {},
        retries: number = this.config.maxRetries
    ): Promise<T> {
        let lastError: Error | null = null;

        for (let attempt = 0; attempt < retries; attempt++) {
            try {
                const response = await this.fetchWithTimeout(url, {
                    ...options,
                    headers: {
                        ...this.getHeaders(),
                        ...options.headers,
                    },
                });

                // Gérer les erreurs HTTP
                if (!response.ok) {
                    const error: ApiError = new Error(`HTTP ${response.status}: ${response.statusText}`);
                    error.status = response.status;
                    
                    // Ne pas retry sur les erreurs client (4xx)
                    if (response.status >= 400 && response.status < 500) {
                        throw error;
                    }
                    
                    lastError = error;
                    continue;
                }

                // Parser la réponse
                const data = await response.json();
                return data;

            } catch (error) {
                lastError = error as Error;
                
                // Ne pas retry si c'est une erreur de parsing ou une erreur client
                if (error instanceof SyntaxError || 
                    (error instanceof Error && 'status' in error && (error as ApiError).status! >= 400 && (error as ApiError).status! < 500)) {
                    throw error;
                }

                // Attendre avant de retry (backoff exponentiel)
                if (attempt < retries - 1) {
                    const delay = this.config.retryDelay * Math.pow(2, attempt);
                    console.log(`[ApiService] Retry attempt ${attempt + 1}/${retries} after ${delay}ms`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }

        throw lastError || new Error('Request failed after all retries');
    }

    /**
     * Charge tous les contenus (public ou authentifié selon le token)
     */
    async loadAllContents(): Promise<EditableContent[]> {
        console.log('[ApiService] Loading all contents from:', `${this.baseUrl}/wp-json/api/editable-content`);

        try {
            const responseData = await this.fetchWithRetry<ContentResponse[]>(
                `${this.baseUrl}/wp-json/api/editable-content`,
                {
                    headers: this.getHeaders(true), // Inclure auth si disponible
                }
            );

            if (!Array.isArray(responseData)) {
                throw new Error('Invalid response format: expected array');
            }

            // Convertir le format API vers notre format interne
            const contents = responseData
                .filter(item => item.context && item.context_id) // Filtrer les items invalides
                .map(item => ({
                    editable_id: item.editable_id,
                    content: item.content || '',
                    context: item.context,
                    context_id: item.context_id,
                    version: item.version || 0,
                    contentType: (item.content_type as 'text' | 'html' | 'markdown') || 'text',
                    lastModified: Date.now(),
                }));

            console.log(`[ApiService] Loaded ${contents.length} contents`);
            return contents;

        } catch (error) {
            console.error('[ApiService] Failed to load contents:', error);
            throw this.handleApiError(error);
        }
    }

    /**
     * Sauvegarde un contenu (nécessite authentification)
     * FIXED: Always send the user's edited content, not the defaultContent
     */
    async saveContent(
        content: EditableContent,
        defaultContent?: string
    ): Promise<{ content: EditableContent; status: SaveContentResponse['status']; message: string }> {
        console.log('[ApiService] Saving content to:', `${this.baseUrl}/wp-json/api/editable-content/save`);
        console.log('[ApiService] Content context_id:', content.context_id);
        console.log('[ApiService] User edited content:', content.content);
        console.log('[ApiService] Default content (for reference):', defaultContent);

        const token = this.getAuthToken();
        if (!token) {
            throw new Error('Authentication required for saving content');
        }

        if (!content.context || !content.context_id) {
            throw new Error('Context and context_id are required');
        }

        // Déterminer si c'est un contenu par défaut (nouveau contenu sans ID ni version)
        const isDefaultContent = !content.editable_id && !content.version && defaultContent !== undefined;

        // FIXED: Always send the user's edited content, regardless of isDefaultContent flag
        const requestBody: SaveContentRequest & { isDefaultContent?: boolean; defaultContent?: string } = {
            content: content.content, // Always use the user's edited content
            context: content.context,
            context_id: content.context_id,
            content_type: content.contentType || 'text',
        };

        // Ajouter la version si elle existe
        if (content.version) {
            (requestBody as any).version = content.version;
        }

        // Ajouter le flag isDefaultContent et le defaultContent pour que l'API puisse faire la comparaison
        if (isDefaultContent) {
            requestBody.isDefaultContent = true;
            requestBody.defaultContent = defaultContent; // Send both for API comparison
        }

        console.log('[ApiService] Request body:', requestBody);

        try {
            const response = await this.fetchWithRetry<SaveContentResponse>(
                `${this.baseUrl}/wp-json/api/editable-content/save`,
                {
                    method: 'POST',
                    headers: this.getHeaders(true),
                    body: JSON.stringify(requestBody),
                }
            );

            console.log('[ApiService] Save response:', response);

            // Gérer les différents statuts de réponse
            switch (response.status) {
                case 'success':
                case 'no_action':
                case 'no_change':
                    if (!response.data) {
                        throw new Error('No data returned from save operation');
                    }
                    
                    const updatedContent: EditableContent = {
                        ...content,
                        editable_id: response.data.editable_id,
                        content: response.data.content,
                        version: response.data.version,
                        contentType: response.data.content_type as 'text' | 'html' | 'markdown',
                        lastModified: Date.now(),
                    };

                    return {
                        content: updatedContent,
                        status: response.status,
                        message: response.message,
                    };

                case 'conflict':
                    if (!response.conflict) {
                        throw new Error('Conflict response missing conflict data');
                    }
                    
                    // Créer une erreur spéciale pour les conflits
                    const conflictError: VersionConflictError = Object.assign(
                        new Error(response.message),
                        {
                            type: 'VERSION_CONFLICT' as const,
                            conflict: response.conflict
                        }
                    );
                    throw conflictError;

                case 'error':
                default:
                    throw new Error(response.message || 'Save operation failed');
            }

        } catch (error) {
            console.error('[ApiService] Save failed:', error);
            throw this.handleApiError(error);
        }
    }

    /**
     * Gestion centralisée des erreurs
     */
    private handleApiError(error: any): Error {
        if (error instanceof Error) {
            // Erreur de conflit de version
            if ('type' in error && (error as any).type === 'VERSION_CONFLICT') {
                return error;
            }

            // Erreur réseau
            if (error.message === 'Request timeout') {
                return new Error('La requête a expiré. Vérifiez votre connexion internet.');
            }

            // Erreur d'authentification
            if ('status' in error && (error as ApiError).status === 401) {
                return new Error('Session expirée. Veuillez vous reconnecter.');
            }

            // Erreur de permission
            if ('status' in error && (error as ApiError).status === 403) {
                return new Error('Vous n\'avez pas les permissions nécessaires.');
            }

            return error;
        }

        return new Error('Une erreur inattendue s\'est produite');
    }

    /**
     * Vérifie si l'utilisateur est authentifié
     */
    isAuthenticated(): boolean {
        return !!this.getAuthToken();
    }

    /**
     * Utilitaire pour tester la connexion API
     */
    async testConnection(): Promise<boolean> {
        try {
            await this.fetchWithRetry(
                `${this.baseUrl}/wp-json/api/editable-content`,
                { method: 'HEAD' },
                1 // Un seul essai pour le test
            );
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Helper pour gérer les conflits de version
     */
    static isVersionConflictError(error: any): error is VersionConflictError {
        return error instanceof Error && 
               'type' in error && 
               error.type === 'VERSION_CONFLICT' &&
               'conflict' in error;
    }

    /**
     * Helper pour extraire les informations de conflit
     */
    static getConflictInfo(error: any): SaveContentResponse['conflict'] | null {
        if (this.isVersionConflictError(error)) {
            return error.conflict;
        }
        return null;
    }

    /**
     * Récupère un contenu spécifique par context/context_id
     */
    async getContentByContext(context: string, contextId: string): Promise<EditableContent | null> {
        console.log('[ApiService] Getting content by context:', context, contextId);

        try {
            const params = new URLSearchParams({
                context: context,
                context_id: contextId
            });

            const response = await this.fetchWithRetry<any>(
                `${this.baseUrl}/wp-json/api/editable-content/get?${params.toString()}`,
                {
                    headers: this.getHeaders(false), // Pas d'auth nécessaire pour la lecture
                }
            );

            if (!response.exists) {
                return null;
            }

            return {
                editable_id: response.editable_id,
                content: response.content || '',
                context: response.context,
                context_id: response.context_id,
                version: response.version || 0,
                contentType: (response.content_type as 'text' | 'html' | 'markdown') || 'text',
                lastModified: response.updated_at ? new Date(response.updated_at).getTime() : Date.now(),
            };

        } catch (error) {
            console.error('[ApiService] Failed to get content by context:', error);
            throw this.handleApiError(error);
        }
    }

    /**
     * Efface le cache du token (utile après déconnexion)
     */
    clearAuthToken(): void {
        // Note: Le token est géré par MagicToken, mais on peut ajouter une méthode ici pour la cohérence
        console.log('[ApiService] Auth token cleared');
    }

    /**
     * Vérifie si une erreur est une erreur d'authentification
     */
    static isAuthError(error: any): boolean {
        return error instanceof Error && 
               'status' in error && 
               (error as ApiError).status === 401;
    }

    /**
     * Vérifie si une erreur est une erreur de permission
     */
    static isPermissionError(error: any): boolean {
        return error instanceof Error && 
               'status' in error && 
               (error as ApiError).status === 403;
    }

    /**
     * Statistiques de debug
     */
    getStats(): { totalRequests: number; failedRequests: number; avgResponseTime: number } {
        // Pour une future implémentation de métriques
        return {
            totalRequests: 0,
            failedRequests: 0,
            avgResponseTime: 0
        };
    }

    /**
     * Get current configuration for debugging
     */
    getConfig(): { baseUrl: string; timeout: number; maxRetries: number } {
        return {
            baseUrl: this.baseUrl,
            timeout: this.config.timeout,
            maxRetries: this.config.maxRetries
        };
    }
}

// Export des types utiles pour les consommateurs
export type { SaveContentResponse, ApiError, VersionConflictError };