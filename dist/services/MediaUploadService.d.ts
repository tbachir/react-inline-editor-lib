export interface UploadResponse {
    success: boolean;
    data?: {
        id: number;
        url: string;
        alt: string;
        title: string;
        sizes?: {
            thumbnail?: string;
            medium?: string;
            large?: string;
            full?: string;
        };
    };
    error?: string;
}
export interface UploadProgress {
    loaded: number;
    total: number;
    percentage: number;
}
/**
 * Service pour gérer l'upload d'images vers WordPress
 */
export declare class MediaUploadService {
    private readonly baseUrl;
    constructor(baseUrl?: string);
    /**
     * Upload un fichier image local
     */
    uploadFile(file: File, onProgress?: (progress: UploadProgress) => void): Promise<UploadResponse>;
    /**
     * Upload une image depuis une URL externe
     * L'URL sera téléchargée côté serveur et convertie en média WP
     */
    uploadFromUrl(url: string, filename?: string): Promise<UploadResponse>;
    /**
     * Supprime un média WordPress
     */
    deleteMedia(mediaId: number): Promise<boolean>;
    /**
     * Récupère les détails d'un média
     */
    getMediaDetails(mediaId: number): Promise<any>;
    /**
     * Valide un fichier avant l'upload
     */
    private validateFile;
    /**
     * Valide une URL
     */
    private validateUrl;
    /**
     * Extrait un nom de fichier depuis une URL
     */
    private extractFilenameFromUrl;
    /**
     * Formate la réponse WordPress en format uniforme
     */
    private formatResponse;
    /**
     * Crée une URL de prévisualisation pour un fichier
     */
    static createPreviewUrl(file: File): string;
    /**
     * Libère une URL de prévisualisation
     */
    static revokePreviewUrl(url: string): void;
    /**
     * Helper pour déterminer si une string est une URL
     */
    static isUrl(str: string): boolean;
}
