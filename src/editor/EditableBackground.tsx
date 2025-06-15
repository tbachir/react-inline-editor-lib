// src/inline-editor/editor/EditableBackground.tsx
import React from "react";

import { useAuth } from '../auth';
import { useContent } from '../content';
import { detectContext, generateContextId } from '../context/EditableContentContext';
import { ImageUploadModal } from '../components/ImageUploadModal';
import type { EditableContent } from '../types';

interface EditableBackgroundProps {
  children: React.ReactNode;
  backgroundImage: string;
  id: string;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
  showEditableHighlights?: boolean;
}

/**
 * Composant wrapper pour rendre les background-image éditables
 * Permet de modifier l'URL du background via l'interface inline
 * Memoized to prevent unnecessary re-renders when props haven't changed
 */
const EditableBackgroundComponent: React.FC<EditableBackgroundProps> = ({
  children,
  backgroundImage: defaultBackgroundImage,
  id,
  className = '',
  style = {},
  as: Component = 'div',
  showEditableHighlights = false
}) => {
  const { isAuthenticated } = useAuth();
  const { getContent, saveContent, isLoading } = useContent();
  
  const [isEditing, setIsEditing] = React.useState(false);
  const [context, setContext] = React.useState<string>('');
  const [currentBgImage, setCurrentBgImage] = React.useState<string>('');
  const [tempBgImage, setTempBgImage] = React.useState<string>('');
  const [isPreviewError, setIsPreviewError] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [showUploadModal, setShowUploadModal] = React.useState(false);
  
  const elementRef =  React.useRef<HTMLElement>(null);
  const inputRef =  React.useRef<HTMLInputElement>(null);
  
  // Helper pour extraire l'URL d'un background-image CSS
  const extractUrlFromCss =  React.useCallback((cssValue: string): string => {
    const match = cssValue.match(/url\(['"]?([^'"]+)['"]?\)/);
    return match ? match[1] : cssValue;
  }, []);
  
  // Helper pour formater une URL en background-image CSS
  const formatAsCssUrl =  React.useCallback((url: string): string => {
    if (!url) return 'none';
    if (url === 'none') return 'none';
    return `url('${url}')`;
  }, []);
  
  // Initialiser le contexte et le background
  React.useEffect(() => {
    if (isLoading) return;
    
    if (!elementRef.current) return;
    
    // Générer le contexte
    const contextString = generateContextId(elementRef.current);
    setContext(contextString);
    
    // Extraire l'URL du defaultBackgroundImage
    const defaultUrl = extractUrlFromCss(defaultBackgroundImage);
    
    // Récupérer l'URL depuis le provider
    const savedUrl = getContent(contextString, id, defaultUrl);
    setCurrentBgImage(savedUrl);
    setIsInitialized(true);
    
    console.log(`[EditableBackground] Initialized:`, {
      context: contextString,
      contextId: id,
      defaultUrl,
      savedUrl
    });
  }, [id, defaultBackgroundImage, getContent, isLoading, extractUrlFromCss]);
  
  /**
   * Bouton d'édition flottant
   */
  const EditButton = () => (
    <button
      onClick={handleEdit}
      className="editable-background-edit-btn"
      style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        width: '32px',
        height: '32px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        zIndex: 10,
        transition: 'all 0.2s ease',
        opacity: showEditableHighlights ? 1 : 0
      }}
      title="Modifier l'image de fond"
      onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = showEditableHighlights ? '1' : '0'; }}
    >
      🖼️
    </button>
  );
  
  /**
   * Entrer en mode édition
   */
  const handleEdit =  React.useCallback(() => {
    if (isAuthenticated && !isEditing && context) {
      setIsEditing(true);
      setTempBgImage(currentBgImage);
      setIsPreviewError(false);
      setShowUploadModal(false);
      
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 0);
    }
  }, [isAuthenticated, isEditing, context, currentBgImage]);
  
  /**
   * Gestionnaire pour l'upload d'image
   */
  const handleImageUploaded =  React.useCallback((newUrl: string) => {
    setTempBgImage(newUrl);
    setShowUploadModal(false);
  }, []);
  
  /**
   * Valider l'URL de l'image
   */
  const validateImageUrl =  React.useCallback(async (url: string): Promise<boolean> => {
    if (!url || url === 'none') return true;
    
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }, []);
  
  /**
   * Sauvegarder la nouvelle URL
   */
  const handleSave =  React.useCallback(async () => {
    if (!context || isSaving) return;
    
    const urlToSave = tempBgImage.trim() || 'none';
    
    // Validation de l'URL
    if (urlToSave !== 'none') {
      try {
        new URL(urlToSave, window.location.href);
      } catch {
        if (!urlToSave.startsWith('/') && !urlToSave.startsWith('./') && !urlToSave.startsWith('../')) {
          alert('URL invalide. Utilisez une URL complète, un chemin relatif valide, ou "none".');
          return;
        }
      }
      
      // Vérifier si l'image se charge
      const isValid = await validateImageUrl(urlToSave);
      if (!isValid) {
        const confirmSave = window.confirm(
          'L\'image ne semble pas se charger correctement. Voulez-vous quand même sauvegarder cette URL ?'
        );
        if (!confirmSave) return;
      }
    }
    
    setIsSaving(true);
    
    try {
      const editableContent: EditableContent = {
        content: urlToSave,
        context: context,
        context_id: id,
        contentType: 'text',
        lastModified: Date.now()
      };
      
      const defaultUrl = extractUrlFromCss(defaultBackgroundImage);
      const success = await saveContent(editableContent, defaultUrl);
      
      if (success) {
        setCurrentBgImage(urlToSave);
        setIsEditing(false);
        console.log(`[EditableBackground] Background URL saved for ${id}`);
      } else {
        console.error(`[EditableBackground] Failed to save background URL for ${id}`);
      }
    } finally {
      setIsSaving(false);
    }
  }, [context, tempBgImage, isSaving, id, saveContent, defaultBackgroundImage, extractUrlFromCss, validateImageUrl]);
  
  /**
   * Annuler l'édition
   */
  const handleCancel =  React.useCallback(() => {
    setTempBgImage(currentBgImage);
    setIsEditing(false);
    setIsPreviewError(false);
  }, [currentBgImage]);
  
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
  
  // Style avec background-image
  const elementStyle: React.CSSProperties = {
    ...style,
    backgroundImage: isEditing ? formatAsCssUrl(tempBgImage) : formatAsCssUrl(currentBgImage),
    position: 'relative' as const,
    transition: 'all 0.2s ease'
  };
  
  // Ne pas afficher pendant le chargement
  if (isLoading || !isInitialized) {
    return React.createElement(
      Component,
      {
        ref: elementRef,
        className,
        style: { ...style, visibility: 'hidden' }
      },
      children
    );
  }
  
  return React.createElement(
    Component,
    {
      ref: elementRef,
      className: `editable-background ${isAuthenticated ? 'is-authenticated' : ''} ${showEditableHighlights && isAuthenticated ? 'editable-highlight' : ''} ${className}`,
      style: elementStyle,
      'data-context': context,
      'data-context-id': id,
      onMouseEnter: (e: React.MouseEvent) => {
        if (isAuthenticated && !isEditing) {
          const btn = e.currentTarget.querySelector('.editable-background-edit-btn') as HTMLElement;
          if (btn) btn.style.opacity = '1';
        }
      },
      onMouseLeave: (e: React.MouseEvent) => {
        if (isAuthenticated && !isEditing && !showEditableHighlights) {
          const btn = e.currentTarget.querySelector('.editable-background-edit-btn') as HTMLElement;
          if (btn) btn.style.opacity = '0';
        }
      }
    },
    <>
      {children}
      
      {/* Bouton d'édition */}
      {isAuthenticated && !isEditing && <EditButton />}
      
      {/* Mode édition */}
      {isEditing && isAuthenticated && (
        <div 
          className="editable-background-editor"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(0, 0, 0, 0.95)',
            padding: '16px',
            borderRadius: '8px',
            minWidth: '300px',
            maxWidth: '90%',
            zIndex: 1000,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', color: 'white', fontSize: '16px' }}>
            Modifier l'image de fond
          </h4>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              ref={inputRef}
              type="text"
              value={tempBgImage}
              onChange={(e) => setTempBgImage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="URL de l'image ou 'none'"
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                borderRadius: '4px',
                fontSize: '14px'
              }}
              disabled={isSaving}
            />
            
            <button
              onClick={() => setShowUploadModal(true)}
              disabled={isSaving}
              style={{
                padding: '8px 16px',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
              title="Uploader une image"
            >
              📤
            </button>
            
            <button
              onClick={handleSave}
              disabled={isSaving}
              style={{
                padding: '8px 16px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isSaving ? 'not-allowed' : 'pointer',
                opacity: isSaving ? 0.6 : 1,
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            
            <button
              onClick={handleCancel}
              disabled={isSaving}
              style={{
                padding: '8px 16px',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Cancel
            </button>
          </div>
          
          <div style={{ marginTop: '8px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
            Exemples : https://example.com/image.jpg, /images/hero.jpg, none
          </div>
        </div>
      )}
      
      {/* Modal d'upload */}
      <ImageUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onImageSelected={handleImageUploaded}
        currentImageUrl={tempBgImage}
      />
    </>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const EditableBackground = React.memo(EditableBackgroundComponent);