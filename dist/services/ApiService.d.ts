import type { EditableContent } from '../types';
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
export declare class ApiService {
    private readonly baseUrl;
    private readonly config;
    constructor(baseUrl?: string);
    /**
     * Récupère le token d'authentification
     */
    private getAuthToken;
    /**
     * Prépare les headers pour les requêtes
     */
    private getHeaders;
    /**
     * Exécute une requête avec timeout
     */
    private fetchWithTimeout;
    /**
     * Exécute une requête avec retry automatique
     */
    private fetchWithRetry;
    /**
     * Charge tous les contenus (public ou authentifié selon le token)
     */
    loadAllContents(): Promise<EditableContent[]>;
    /**
     * Sauvegarde un contenu (nécessite authentification)
     * FIXED: Always send the user's edited content, not the defaultContent
     */
    saveContent(content: EditableContent, defaultContent?: string): Promise<{
        content: EditableContent;
        status: SaveContentResponse['status'];
        message: string;
    }>;
    /**
     * Gestion centralisée des erreurs
     */
    private handleApiError;
    /**
     * Vérifie si l'utilisateur est authentifié
     */
    isAuthenticated(): boolean;
    /**
     * Utilitaire pour tester la connexion API
     */
    testConnection(): Promise<boolean>;
    /**
     * Helper pour gérer les conflits de version
     */
    static isVersionConflictError(error: any): error is VersionConflictError;
    /**
     * Helper pour extraire les informations de conflit
     */
    static getConflictInfo(error: any): SaveContentResponse['conflict'] | null;
    /**
     * Récupère un contenu spécifique par context/context_id
     */
    getContentByContext(context: string, contextId: string): Promise<EditableContent | null>;
    /**
     * Efface le cache du token (utile après déconnexion)
     */
    clearAuthToken(): void;
    /**
     * Vérifie si une erreur est une erreur d'authentification
     */
    static isAuthError(error: any): boolean;
    /**
     * Vérifie si une erreur est une erreur de permission
     */
    static isPermissionError(error: any): boolean;
    /**
     * Statistiques de debug
     */
    getStats(): {
        totalRequests: number;
        failedRequests: number;
        avgResponseTime: number;
    };
    /**
     * Get current configuration for debugging
     */
    getConfig(): {
        baseUrl: string;
        timeout: number;
        maxRetries: number;
    };
}
export type { SaveContentResponse, ApiError, VersionConflictError };
