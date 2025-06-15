import type { EditableContentContextType } from '../types';
/**
 * Détecte le contexte d'un élément dans la page
 * Responsabilité : identifier la page et la section parente
 */
export declare function detectContext(element: HTMLElement | null): EditableContentContextType;
/**
 * Génère un identifiant de contexte complet
 */
export declare function generateContextId(element: HTMLElement | null): string;
/**
 * Classe pour le debug et la compatibilité
 */
export declare class EditableContentContext {
    static detect(element: HTMLElement | null): EditableContentContextType;
    static generateId(element: HTMLElement | null): string;
    static getDebugInfo(element: HTMLElement | null): object;
}
