// src/inline-editor/services/MediaUploadService.ts

import { MagicToken } from '../auth/MagicToken';

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
export class MediaUploadService {
  private readonly baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = (baseUrl || import.meta.env.VITE_API_BASE_URL || 'https://www.wow.cryptonic-drinks.com').replace(/\/+$/, '');
    console.log('[MediaUploadService] Initialized with base URL:', this.baseUrl);
  }

  /**
   * Upload un fichier image local
   */
  async uploadFile(
    file: File, 
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResponse> {
    console.log('[MediaUploadService] Uploading file:', file.name, file.type, file.size);

    // Validation du fichier
    const validation = this.validateFile(file);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error
      };
    }

    const token = MagicToken.get();
    if (!token) {
      return {
        success: false,
        error: 'Authentication required'
      };
    }

    // Préparer le FormData
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', file.name.replace(/\.[^/.]+$/, '')); // Nom sans extension
    formData.append('alt', file.name.replace(/\.[^/.]+$/, '')); // Alt par défaut

    try {
      const xhr = new XMLHttpRequest();
      
      // Promesse pour gérer la réponse
      const uploadPromise = new Promise<UploadResponse>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const response = JSON.parse(xhr.responseText);
              console.log('[MediaUploadService] Upload successful:', response);
              resolve(this.formatResponse(response));
            } catch (error) {
              reject(new Error('Invalid response format'));
            }
          } else {
            reject(new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`));
          }
        };

        xhr.onerror = () => reject(new Error('Network error'));
        xhr.onabort = () => reject(new Error('Upload cancelled'));
      });

      // Gérer la progression
      if (onProgress) {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            onProgress({
              loaded: event.loaded,
              total: event.total,
              percentage: Math.round((event.loaded / event.total) * 100)
            });
          }
        };
      }

      // Configurer et envoyer la requête
      xhr.open('POST', `${this.baseUrl}/wp-json/wp/v2/media`);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.send(formData);

      return await uploadPromise;

    } catch (error) {
      console.error('[MediaUploadService] Upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      };
    }
  }

  /**
   * Upload une image depuis une URL externe
   * L'URL sera téléchargée côté serveur et convertie en média WP
   */
  async uploadFromUrl(
    url: string,
    filename?: string
  ): Promise<UploadResponse> {
    console.log('[MediaUploadService] Uploading from URL:', url);

    // Validation de l'URL
    const validation = this.validateUrl(url);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error
      };
    }

    const token = MagicToken.get();
    if (!token) {
      return {
        success: false,
        error: 'Authentication required'
      };
    }

    try {
      // Endpoint personnalisé pour l'import d'URL
      const response = await fetch(`${this.baseUrl}/wp-json/api/media/import-url`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: url,
          filename: filename || this.extractFilenameFromUrl(url),
          title: filename?.replace(/\.[^/.]+$/, '') || 'Imported image',
          alt: filename?.replace(/\.[^/.]+$/, '') || 'Imported image'
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Import failed: ${response.status} - ${error}`);
      }

      const data = await response.json();
      console.log('[MediaUploadService] URL import successful:', data);
      
      return this.formatResponse(data);

    } catch (error) {
      console.error('[MediaUploadService] URL import error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Import failed'
      };
    }
  }

  /**
   * Supprime un média WordPress
   */
  async deleteMedia(mediaId: number): Promise<boolean> {
    const token = MagicToken.get();
    if (!token) {
      console.error('[MediaUploadService] No token for deletion');
      return false;
    }

    try {
      const response = await fetch(`${this.baseUrl}/wp-json/wp/v2/media/${mediaId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return response.ok;
    } catch (error) {
      console.error('[MediaUploadService] Delete error:', error);
      return false;
    }
  }

  /**
   * Récupère les détails d'un média
   */
  async getMediaDetails(mediaId: number): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/wp-json/wp/v2/media/${mediaId}`);
      if (!response.ok) throw new Error('Media not found');
      
      return await response.json();
    } catch (error) {
      console.error('[MediaUploadService] Get media error:', error);
      return null;
    }
  }

  /**
   * Valide un fichier avant l'upload
   */
  private validateFile(file: File): { valid: boolean; error?: string } {
    // Vérifier le type MIME
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `Type de fichier non supporté. Formats acceptés: ${allowedTypes.join(', ')}`
      };
    }

    // Vérifier la taille (max 10MB par défaut)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `Fichier trop volumineux. Taille maximale: ${maxSize / 1024 / 1024}MB`
      };
    }

    return { valid: true };
  }

  /**
   * Valide une URL
   */
  private validateUrl(url: string): { valid: boolean; error?: string } {
    try {
      const urlObj = new URL(url);
      
      // Vérifier le protocole
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        return {
          valid: false,
          error: 'URL invalide. Utilisez http:// ou https://'
        };
      }

      // Vérifier l'extension (optionnel)
      const pathname = urlObj.pathname.toLowerCase();
      const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
      const hasValidExtension = validExtensions.some(ext => pathname.endsWith(ext));
      
      if (!hasValidExtension && !pathname.includes('image')) {
        console.warn('[MediaUploadService] URL might not be an image:', url);
      }

      return { valid: true };
    } catch {
      return {
        valid: false,
        error: 'URL invalide'
      };
    }
  }

  /**
   * Extrait un nom de fichier depuis une URL
   */
  private extractFilenameFromUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
      
      // Si pas de nom de fichier, générer un nom
      if (!filename || filename === '') {
        return `image-${Date.now()}.jpg`;
      }
      
      // Si pas d'extension, ajouter .jpg par défaut
      if (!filename.includes('.')) {
        return `${filename}.jpg`;
      }
      
      return filename;
    } catch {
      return `image-${Date.now()}.jpg`;
    }
  }

  /**
   * Formate la réponse WordPress en format uniforme
   */
  private formatResponse(wpResponse: any): UploadResponse {
    if (!wpResponse || (!wpResponse.id && !wpResponse.ID)) {
      return {
        success: false,
        error: 'Invalid response from server'
      };
    }

    // Gérer les différents formats de réponse WP
    const mediaId = wpResponse.id || wpResponse.ID;
    const sourceUrl = wpResponse.source_url || wpResponse.guid?.rendered || wpResponse.url;
    
    return {
      success: true,
      data: {
        id: mediaId,
        url: sourceUrl,
        alt: wpResponse.alt_text || '',
        title: wpResponse.title?.rendered || wpResponse.title || '',
        sizes: wpResponse.media_details?.sizes ? {
          thumbnail: wpResponse.media_details.sizes.thumbnail?.source_url,
          medium: wpResponse.media_details.sizes.medium?.source_url,
          large: wpResponse.media_details.sizes.large?.source_url,
          full: wpResponse.media_details.sizes.full?.source_url || sourceUrl
        } : undefined
      }
    };
  }

  /**
   * Crée une URL de prévisualisation pour un fichier
   */
  static createPreviewUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  /**
   * Libère une URL de prévisualisation
   */
  static revokePreviewUrl(url: string): void {
    URL.revokeObjectURL(url);
  }

  /**
   * Helper pour déterminer si une string est une URL
   */
  static isUrl(str: string): boolean {
    try {
      new URL(str);
      return true;
    } catch {
      // Vérifier les chemins relatifs
      return str.startsWith('/') || str.startsWith('./') || str.startsWith('../');
    }
  }
}