/**
 * Gestion simple du magic token JWT
 * Responsabilité : détecter, valider et stocker le token
 */
export class MagicToken {
  private static readonly STORAGE_KEY = 'inline_editor_token';
  private static readonly URL_PARAM = 'magic_token';

  /**
   * Détecte et sauvegarde le magic token depuis l'URL
   */
  static detect(): string | null {
    // 1. Vérifier l'URL
    const urlToken = this.getFromUrl();
    if (urlToken) {
      this.save(urlToken);
      this.cleanUrl();
      console.info('[MagicToken] Token detected in URL and saved.');
      return urlToken;
    }

    // 2. Vérifier le localStorage
    const localToken = this.get();
    if (localToken) {
      console.info('[MagicToken] Token loaded from localStorage.');
    } else {
      console.warn('[MagicToken] No token found in URL or localStorage.');
    }
    return localToken;
  }

  /**
   * Récupère le token depuis l'URL
   */
  private static getFromUrl(): string | null {
    const params = new URLSearchParams(window.location.search);
    const token = params.get(this.URL_PARAM);

    if (token && this.isValidFormat(token)) {
      console.debug('[MagicToken] Token found in URL param.');
      return token;
    }

    if (token) {
      console.warn('[MagicToken] Token in URL param is not a valid JWT format.');
    }
    return null;
  }

  /**
   * Nettoie l'URL du paramètre magic_token
   */
  private static cleanUrl(): void {
    const url = new URL(window.location.href);
    if (url.searchParams.has(this.URL_PARAM)) {
      url.searchParams.delete(this.URL_PARAM);
      window.history.replaceState({}, '', url.toString());
      console.debug('[MagicToken] magic_token param removed from URL.');
    }
  }

  /**
   * Valide le format JWT basique
   */
  private static isValidFormat(token: string): boolean {
    const valid = token.split('.').length === 3;
    if (!valid) {
      console.error('[MagicToken] Invalid token format (not JWT-like).');
    }
    return valid;
  }

  /**
   * Sauvegarde le token
   */
  static save(token: string): void {
    if (!this.isValidFormat(token)) {
      console.error('[MagicToken] Refused to save invalid token.');
      return;
    }

    localStorage.setItem(this.STORAGE_KEY, token);
    console.info('[MagicToken] Token saved in localStorage.');
  }

  /**
   * Récupère le token stocké
   */
  static get(): string | null {
    const token = localStorage.getItem(this.STORAGE_KEY);
    if (token) {
      console.debug('[MagicToken] get() -> token found.');
    } else {
      console.debug('[MagicToken] get() -> no token found.');
    }
    return token;
  }

  /**
   * Supprime le token
   */
  static clear(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    console.info('[MagicToken] Token cleared from localStorage.');
  }

  /**
   * Vérifie si un token est présent
   */
  static exists(): boolean {
    const exists = !!this.get();
    console.debug(`[MagicToken] exists() -> ${exists}`);
    return exists;
  }

  /**
   * Parse le payload JWT (sans validation crypto)
   */
  static parsePayload(token: string): any | null {
    try {
      const [, payload] = token.split('.');
      const decoded = JSON.parse(atob(payload));
      console.debug('[MagicToken] Payload parsed:', decoded);
      return decoded;
    } catch (err) {
      console.error('[MagicToken] Failed to parse payload:', err);
      return null;
    }
  }

  /**
   * Vérifie si le token est expiré
   */
  static isExpired(token: string): boolean {
    const payload = this.parsePayload(token);
    if (!payload?.exp) {
      console.warn('[MagicToken] No exp claim in token, treating as expired.');
      return true;
    }
    const expired = Date.now() >= payload.exp * 1000;
    if (expired) {
      console.warn('[MagicToken] Token is expired.');
    } else {
      console.debug('[MagicToken] Token is valid (not expired).');
    }
    return expired;
  }
}
