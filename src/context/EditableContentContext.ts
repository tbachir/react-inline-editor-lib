// src/inline-editor/context/EditableContentContext.ts

import type { EditableContentContextType } from '../types';

/**
 * Détecte le contexte d'un élément dans la page
 * Responsabilité : identifier la page et la section parente
 */
export function detectContext(element: HTMLElement | null): EditableContentContextType {
  const path = window.location.pathname;
  
  // Si pas d'élément, retourner le contexte global
  if (!element) {
    return {
      path,
      sectionId: 0,
      sectionSelector: 'body'
    };
  }
  
  // Chercher la section parente la plus proche
  const section = findClosestSection(element);
  
  return {
    path,
    sectionId: section.id,
    sectionSelector: section.selector
  };
}

/**
 * Trouve la section parente la plus proche d'un élément
 */
function findClosestSection(element: HTMLElement): { id: number; selector: string } {
  // Remonter dans l'arbre DOM jusqu'à trouver une section identifiable
  let current = element.parentElement;
  
  while (current && current.tagName !== 'BODY') {
    // Vérifier si c'est une section avec un ID
    if (current.id && isSection(current)) {
      return {
        id: hashCode(current.id),
        selector: `#${current.id}`
      };
    }
    
    // Vérifier les attributs data-section
    if (current.hasAttribute('data-section-id')) {
      const sectionId = current.getAttribute('data-section-id');
      return {
        id: parseInt(sectionId || '0', 10),
        selector: current.id ? `#${current.id}` : `[data-section-id="${sectionId}"]`
      };
    }
    
    // Vérifier si c'est une section sémantique
    if (isSection(current)) {
      // Générer un ID basé sur la position dans le DOM
      const index = Array.from(current.parentElement?.children || []).indexOf(current);
      return {
        id: index + 1,
        selector: `${current.tagName.toLowerCase()}:nth-child(${index + 1})`
      };
    }
    
    current = current.parentElement;
  }
  
  // Si aucune section trouvée, utiliser main ou body
  const main = document.querySelector('main');
  if (main) {
    return { id: 1, selector: 'main' };
  }
  
  return { id: 0, selector: 'body' };
}

/**
 * Vérifie si un élément est une section
 */
function isSection(element: HTMLElement): boolean {
  const sectionTags = ['SECTION', 'ARTICLE', 'MAIN', 'HEADER', 'FOOTER', 'ASIDE'];
  return sectionTags.includes(element.tagName) || 
         element.hasAttribute('data-section') ||
         element.classList.contains('section');
}

/**
 * Génère un hash numérique à partir d'une string
 */
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Génère un identifiant de contexte complet
 */
export function generateContextId(element: HTMLElement | null): string {
  const context = detectContext(element);
  
  // Format: /path#section-selector
  // Ex: /#featured-drink-section
  return `${context.path}#${context.sectionSelector}`;
}

/**
 * Classe pour le debug et la compatibilité
 */
export class EditableContentContext {
  static detect(element: HTMLElement | null): EditableContentContextType {
    return detectContext(element);
  }
  
  static generateId(element: HTMLElement | null): string {
    return generateContextId(element);
  }
  
  static getDebugInfo(element: HTMLElement | null): object {
    const context = detectContext(element);
    
    return {
      path: context.path,
      sectionId: context.sectionId,
      sectionSelector: context.sectionSelector,
      contextId: generateContextId(element),
      element: element?.tagName.toLowerCase() || 'none',
      parentSection: element?.closest('section, article, [data-section]')?.tagName.toLowerCase() || 'none'
    };
  }
}