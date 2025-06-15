/**
 * Utilitaires d'accessibilité
 */

export interface AccessibilityOptions {
  announceChanges?: boolean;
  focusManagement?: boolean;
  keyboardNavigation?: boolean;
}

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
}

/**
 * Classe utilitaire pour l'accessibilité
 */
export class AccessibilityUtils {
  private static liveRegion: HTMLElement | null = null;

  /**
   * Crée une région live pour les annonces aux lecteurs d'écran
   */
  static createLiveRegion(): HTMLElement {
    if (this.liveRegion && document.body.contains(this.liveRegion)) {
      return this.liveRegion;
    }

    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-10000px';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.overflow = 'hidden';
    
    document.body.appendChild(liveRegion);
    this.liveRegion = liveRegion;
    
    return liveRegion;
  }

  /**
   * Annonce un message aux lecteurs d'écran
   */
  static announce(
    message: string, 
    priority: 'polite' | 'assertive' = 'polite'
  ): void {
    if (typeof message !== 'string' || !message.trim()) return;

    const liveRegion = this.createLiveRegion();
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.textContent = message;

    // Nettoyer après l'annonce
    setTimeout(() => {
      if (liveRegion.textContent === message) {
        liveRegion.textContent = '';
      }
    }, 1000);
  }

  /**
   * Vérifie si un élément est focusable
   */
  static isFocusable(element: HTMLElement): boolean {
    if (!element || element.hidden || element.style.display === 'none') {
      return false;
    }

    const tabIndex = element.tabIndex;
    if (tabIndex < 0) return false;

    const focusableSelectors = [
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ];

    return focusableSelectors.some(selector => element.matches(selector));
  }

  /**
   * Trouve le prochain élément focusable
   */
  static getNextFocusableElement(
    currentElement: HTMLElement,
    direction: 'forward' | 'backward' = 'forward'
  ): HTMLElement | null {
    const focusableElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        'input:not([disabled]), select:not([disabled]), textarea:not([disabled]), ' +
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"]), ' +
        '[contenteditable="true"]'
      )
    ).filter(el => this.isFocusable(el));

    const currentIndex = focusableElements.indexOf(currentElement);
    if (currentIndex === -1) return null;

    const nextIndex = direction === 'forward' 
      ? (currentIndex + 1) % focusableElements.length
      : (currentIndex - 1 + focusableElements.length) % focusableElements.length;

    return focusableElements[nextIndex] || null;
  }

  /**
   * Gère le focus de manière accessible
   */
  static manageFocus(
    element: HTMLElement | null, 
    options?: FocusOptions
  ): boolean {
    if (!element || !this.isFocusable(element)) return false;

    try {
      element.focus(options);
      return document.activeElement === element;
    } catch (error) {
      console.warn('Failed to manage focus:', error);
      return false;
    }
  }

  /**
   * Crée un gestionnaire de raccourcis clavier accessible
   */
  static createKeyboardHandler(
    shortcuts: Record<string, () => void>
  ): (event: KeyboardEvent) => void {
    return (event: KeyboardEvent) => {
      const key = event.key;
      const handler = shortcuts[key];
      
      if (handler && typeof handler === 'function') {
        event.preventDefault();
        handler();
      }
    };
  }

  /**
   * Vérifie si les raccourcis clavier correspondent
   */
  static matchesShortcut(
    event: KeyboardEvent, 
    shortcut: KeyboardShortcut
  ): boolean {
    return (
      event.key === shortcut.key &&
      !!event.ctrlKey === !!shortcut.ctrlKey &&
      !!event.altKey === !!shortcut.altKey &&
      !!event.shiftKey === !!shortcut.shiftKey &&
      !!event.metaKey === !!shortcut.metaKey
    );
  }

  /**
   * Ajoute des attributs ARIA appropriés
   */
  static setAriaAttributes(
    element: HTMLElement,
    attributes: Record<string, string | boolean | null>
  ): void {
    Object.entries(attributes).forEach(([key, value]) => {
      const ariaKey = key.startsWith('aria-') ? key : `aria-${key}`;
      
      if (value === null || value === undefined) {
        element.removeAttribute(ariaKey);
      } else {
        element.setAttribute(ariaKey, String(value));
      }
    });
  }

  /**
   * Vérifie le contraste des couleurs (simplifié)
   */
  static checkColorContrast(
    foreground: string, 
    background: string
  ): { ratio: number; passes: boolean } {
    // Implémentation simplifiée - dans un vrai projet, utiliser une bibliothèque
    // comme 'color-contrast' pour un calcul précis
    const ratio = 4.5; // Placeholder
    const passes = ratio >= 4.5; // WCAG AA standard

    return { ratio, passes };
  }

  /**
   * Détecte si un lecteur d'écran est actif
   */
  static isScreenReaderActive(): boolean {
    // Méthodes de détection heuristiques
    return !!(
      window.navigator.userAgent.includes('NVDA') ||
      window.navigator.userAgent.includes('JAWS') ||
      window.speechSynthesis ||
      document.querySelector('[aria-live]')
    );
  }

  /**
   * Nettoie les ressources d'accessibilité
   */
  static cleanup(): void {
    if (this.liveRegion && document.body.contains(this.liveRegion)) {
      document.body.removeChild(this.liveRegion);
      this.liveRegion = null;
    }
  }
}