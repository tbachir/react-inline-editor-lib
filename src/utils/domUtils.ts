/**
 * Utilitaires DOM sécurisés avec validation de type
 */

export interface SelectionRange {
  start: number;
  end: number;
}

export interface CaretPosition {
  node: Node;
  offset: number;
}

/**
 * Classe utilitaire pour les opérations DOM sécurisées
 */
export class DOMUtils {
  /**
   * Vérifie si un élément est valide et accessible
   */
  static isValidElement(element: unknown): element is HTMLElement {
    return element instanceof HTMLElement && element.isConnected;
  }

  /**
   * Vérifie si window.getSelection est disponible
   */
  static isSelectionSupported(): boolean {
    return typeof window !== 'undefined' && 
           typeof window.getSelection === 'function' &&
           typeof document.createRange === 'function';
  }

  /**
   * Place le curseur à une position spécifique dans un élément
   */
  static setCaretPosition(
    element: HTMLElement, 
    position: 'start' | 'end' = 'end'
  ): boolean {
    if (!this.isValidElement(element) || !this.isSelectionSupported()) {
      return false;
    }

    try {
      const range = document.createRange();
      const selection = window.getSelection();
      
      if (!selection) return false;

      range.selectNodeContents(element);
      range.collapse(position === 'start');
      
      selection.removeAllRanges();
      selection.addRange(range);
      
      return true;
    } catch (error) {
      console.warn('Failed to set caret position:', error);
      return false;
    }
  }

  /**
   * Insère du texte à la position du curseur
   */
  static insertTextAtCaret(text: string): boolean {
    if (!this.isSelectionSupported()) return false;

    try {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return false;
      
      const range = selection.getRangeAt(0);
      range.deleteContents();
      
      const textNode = document.createTextNode(text);
      range.insertNode(textNode);
      range.setStartAfter(textNode);
      range.collapse(true);
      
      selection.removeAllRanges();
      selection.addRange(range);
      
      return true;
    } catch (error) {
      console.warn('Failed to insert text at caret:', error);
      return false;
    }
  }

  /**
   * Obtient la position actuelle du curseur
   */
  static getCaretPosition(element: HTMLElement): CaretPosition | null {
    if (!this.isValidElement(element) || !this.isSelectionSupported()) {
      return null;
    }

    try {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return null;
      
      const range = selection.getRangeAt(0);
      return {
        node: range.startContainer,
        offset: range.startOffset
      };
    } catch (error) {
      console.warn('Failed to get caret position:', error);
      return null;
    }
  }

  /**
   * Sélectionne tout le contenu d'un élément
   */
  static selectAllContent(element: HTMLElement): boolean {
    if (!this.isValidElement(element) || !this.isSelectionSupported()) {
      return false;
    }

    try {
      const range = document.createRange();
      const selection = window.getSelection();
      
      if (!selection) return false;

      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
      
      return true;
    } catch (error) {
      console.warn('Failed to select all content:', error);
      return false;
    }
  }

  /**
   * Nettoie le contenu HTML en gardant seulement le texte
   */
  static sanitizeTextContent(content: string): string {
    if (typeof content !== 'string') return '';
    
    // Créer un élément temporaire pour extraire le texte
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    // Retourner seulement le contenu textuel
    return tempDiv.textContent || tempDiv.innerText || '';
  }

  /**
   * Vérifie si un élément a le focus
   */
  static hasFocus(element: HTMLElement): boolean {
    return this.isValidElement(element) && document.activeElement === element;
  }

  /**
   * Focus un élément de manière sécurisée
   */
  static focusElement(element: HTMLElement, options?: FocusOptions): boolean {
    if (!this.isValidElement(element)) return false;

    try {
      element.focus(options);
      return this.hasFocus(element);
    } catch (error) {
      console.warn('Failed to focus element:', error);
      return false;
    }
  }

  /**
   * Obtient les dimensions d'un élément de manière sécurisée
   */
  static getElementDimensions(element: HTMLElement): { width: number; height: number } | null {
    if (!this.isValidElement(element)) return null;

    try {
      const rect = element.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height
      };
    } catch (error) {
      console.warn('Failed to get element dimensions:', error);
      return null;
    }
  }

  /**
   * Vérifie si un élément est visible dans le viewport
   */
  static isElementVisible(element: HTMLElement): boolean {
    if (!this.isValidElement(element)) return false;

    try {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    } catch (error) {
      console.warn('Failed to check element visibility:', error);
      return false;
    }
  }
}