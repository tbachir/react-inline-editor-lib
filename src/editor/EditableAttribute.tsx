// src/inline-editor/editor/EditableAttribute.tsx

import React from "react";

import { useAuth } from '../auth';
import { useContent } from '../content';
import { generateContextId } from '../context/EditableContentContext';
import type { EditableContent } from '../types';

interface EditableAttributeProps {
  children:  React.ReactElement;
  id: string;
  attribute: string;
  defaultValue: string;
  validator?: (value: string) => boolean | string;
  transformer?: (value: string) => string;
  showEditableHighlights?: boolean;
  editLabel?: string;
}

/**
 * Composant générique pour rendre n'importe quel attribut HTML éditable
 * Exemples: href, title, data-*, style properties, etc.
 */
export const EditableAttribute: React.FC<EditableAttributeProps> = ({
  children,
  id,
  attribute,
  defaultValue,
  validator,
  transformer,
  showEditableHighlights = false,
  editLabel
}) => {
  const { isAuthenticated } = useAuth();
  const { getContent, saveContent, isLoading } = useContent();
  
  const [isEditing, setIsEditing] = React.useState(false);
  const [context, setContext] = React.useState<string>('');
  const [currentValue, setCurrentValue] = React.useState<string>('');
  const [tempValue, setTempValue] = React.useState<string>('');
  const [isSaving, setIsSaving] = React.useState(false);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [validationError, setValidationError] = React.useState<string>('');
  
  const elementRef =  React.useRef<HTMLElement>(null);
  const inputRef =  React.useRef<HTMLInputElement>(null);
  
  // Initialiser le contexte et la valeur
  React.useEffect(() => {
    if (isLoading) return;
    
    if (!elementRef.current) return;
    
    // Générer le contexte avec l'attribut dans l'ID
    const contextString = generateContextId(elementRef.current);
    setContext(contextString);
    
    // ID unique incluant l'attribut
    const uniqueId = `${id}-${attribute}`;
    
    // Récupérer la valeur depuis le provider
    const savedValue = getContent(contextString, uniqueId, defaultValue);
    setCurrentValue(savedValue);
    setIsInitialized(true);
    
    console.log(`[EditableAttribute] Initialized:`, {
      context: contextString,
      contextId: uniqueId,
      attribute,
      defaultValue,
      savedValue
    });
  }, [id, attribute, defaultValue, getContent, isLoading]);
  
  /**
   * Entrer en mode édition
   */
  const handleEdit =  React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAuthenticated && !isEditing && context) {
      setIsEditing(true);
      setTempValue(currentValue);
      setValidationError('');
      
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 0);
    }
  }, [isAuthenticated, isEditing, context, currentValue]);
  
  /**
   * Valider la valeur
   */
  const validateValue =  React.useCallback((value: string): boolean => {
    if (!validator) return true;
    
    const result = validator(value);
    if (typeof result === 'string') {
      setValidationError(result);
      return false;
    }
    
    setValidationError('');
    return result;
  }, [validator]);
  
  /**
   * Sauvegarder la nouvelle valeur
   */
  const handleSave =  React.useCallback(async () => {
    if (!context || isSaving) return;
    
    // Valider
    if (!validateValue(tempValue)) {
      return;
    }
    
    // Transformer si nécessaire
    const valueToSave = transformer ? transformer(tempValue) : tempValue;
    
    setIsSaving(true);
    
    try {
      const uniqueId = `${id}-${attribute}`;
      const editableContent: EditableContent = {
        content: valueToSave,
        context: context,
        context_id: uniqueId,
        contentType: 'text',
        lastModified: Date.now()
      };
      
      const success = await saveContent(editableContent, defaultValue);
      
      if (success) {
        setCurrentValue(valueToSave);
        setIsEditing(false);
        console.log(`[EditableAttribute] Attribute ${attribute} saved for ${id}`);
      } else {
        console.error(`[EditableAttribute] Failed to save attribute ${attribute} for ${id}`);
      }
    } finally {
      setIsSaving(false);
    }
  }, [context, tempValue, isSaving, id, attribute, saveContent, defaultValue, validateValue, transformer]);
  
  /**
   * Annuler l'édition
   */
  const handleCancel =  React.useCallback(() => {
    setTempValue(currentValue);
    setIsEditing(false);
    setValidationError('');
  }, [currentValue]);
  
  /**
   * Gestionnaire de touches
   */
  const handleKeyDown =  React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
  }, [handleCancel, handleSave]);
  
  // Ne pas afficher pendant le chargement
  if (isLoading || !isInitialized) {
    return React.cloneElement(children, { ref: elementRef });
  }
  
  // Cloner l'élément enfant avec l'attribut modifié
  const enhancedChild = React.cloneElement(children, {
    ref: elementRef,
    [attribute]: currentValue,
    className: `${children.props.className || ''} editable-attribute ${isAuthenticated ? 'is-authenticated' : ''} ${showEditableHighlights ? 'editable-highlight' : ''}`.trim(),
    'data-context': context,
    'data-context-id': `${id}-${attribute}`,
    'data-editable-attribute': attribute
  });
  
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {enhancedChild}
      
      {/* Indicateur d'attribut éditable */}
      {isAuthenticated && !isEditing && (
        <span 
          className="editable-attribute-indicator"
          onClick={handleEdit}
          style={{ cursor: 'pointer' }}
        >
          ✏️ {editLabel || attribute}
        </span>
      )}
      
      {/* Mode édition */}
      {isEditing && isAuthenticated && (
        <div 
          className="editable-attribute-editor"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '8px',
            background: 'rgba(0, 0, 0, 0.95)',
            padding: '12px',
            borderRadius: '6px',
            minWidth: '250px',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}
        >
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            color: 'white',
            fontSize: '13px',
            fontWeight: '500'
          }}>
            {editLabel || `Edit ${attribute}`}
          </label>
          
          <div style={{ display: 'flex', gap: '8px', marginBottom: validationError ? '8px' : 0 }}>
            <input
              ref={inputRef}
              type="text"
              value={tempValue}
              onChange={(e) => {
                setTempValue(e.target.value);
                validateValue(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                padding: '6px 10px',
                border: `1px solid ${validationError ? '#ef4444' : 'rgba(255, 255, 255, 0.3)'}`,
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                borderRadius: '4px',
                fontSize: '13px'
              }}
              disabled={isSaving}
            />
            
            <button
              onClick={handleSave}
              disabled={isSaving || !!validationError}
              style={{
                padding: '6px 12px',
                background: validationError ? '#6b7280' : '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isSaving || validationError ? 'not-allowed' : 'pointer',
                opacity: isSaving || validationError ? 0.6 : 1,
                fontSize: '13px'
              }}
            >
              ✓
            </button>
            
            <button
              onClick={handleCancel}
              disabled={isSaving}
              style={{
                padding: '6px 12px',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              ✕
            </button>
          </div>
          
          {validationError && (
            <div style={{ 
              color: '#ef4444', 
              fontSize: '12px',
              marginTop: '-4px'
            }}>
              {validationError}
            </div>
          )}
        </div>
      )}
    </div>
  );
};