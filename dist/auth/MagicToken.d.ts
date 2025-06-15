/**
 * Gestion simple du magic token JWT
 * Responsabilité : détecter, valider et stocker le token
 */
export declare class MagicToken {
    private static readonly STORAGE_KEY;
    private static readonly URL_PARAM;
    /**
     * Détecte et sauvegarde le magic token depuis l'URL
     */
    static detect(): string | null;
    /**
     * Récupère le token depuis l'URL
     */
    private static getFromUrl;
    /**
     * Nettoie l'URL du paramètre magic_token
     */
    private static cleanUrl;
    /**
     * Valide le format JWT basique
     */
    private static isValidFormat;
    /**
     * Sauvegarde le token
     */
    static save(token: string): void;
    /**
     * Récupère le token stocké
     */
    static get(): string | null;
    /**
     * Supprime le token
     */
    static clear(): void;
    /**
     * Vérifie si un token est présent
     */
    static exists(): boolean;
    /**
     * Parse le payload JWT (sans validation crypto)
     */
    static parsePayload(token: string): any | null;
    /**
     * Vérifie si le token est expiré
     */
    static isExpired(token: string): boolean;
}
