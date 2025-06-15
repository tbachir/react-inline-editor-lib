import React from "react";
import { useAuth } from '../auth';
import { useContent } from '../content';
import { generateContextId } from '../context/EditableContentContext';
import { ImageUploadModal } from '../components/ImageUploadModal';
import type { EditableContent } from '../types';

interface ModernEditableImageProps {
  id: string;
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
  showEditableHighlights?: boolean;
}

/**
 * Modern editable image component with seamless editing experience
 * Memoized to prevent unnecessary re-renders when props haven't changed
 */
const ModernEditableImageComponent: React.FC<ModernEditableImageProps> = ({
  id,
  src: defaultSrc,
  alt = '',
  className = '',
  style = {},
  width,
  height,
  loading = 'lazy',
  showEditableHighlights = false
}) => {
  const { isAuthenticated } = useAuth();
  const { getContent, saveContent, isLoading } = useContent();
  
  const [context, setContext] = React.useState<string>('');
  const [currentSrc, setCurrentSrc] = React.useState<string>('');
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [showUploadModal, setShowUploadModal] = React.useState(false);
  
  const imageRef = React.useRef<HTMLImageElement>(null);
  
  // Initialize context and image source
  React.useEffect(() => {
    if (isLoading) return;
    if (!imageRef.current) return;
    
    const contextString = generateContextId(imageRef.current);
    setContext(contextString);
    
    const savedSrc = getContent(contextString, id, defaultSrc);
    setCurrentSrc(savedSrc);
    setIsInitialized(true);
    
    console.log(`[ModernEditableImage] Initialized:`, {
      context: contextString,
      contextId: id,
      defaultSrc,
      savedSrc
    });
  }, [id, defaultSrc, getContent, isLoading]);
  
  /**
   * Handle image click to open upload modal
   */
  const handleImageClick = React.useCallback(() => {
    if (isAuthenticated && context) {
      setShowUploadModal(true);
    }
  }, [isAuthenticated, context]);
  
  /**
   * Handle new image selection
   */
  const handleImageSelected = React.useCallback(async (newSrc: string) => {
    if (!context) return;
    
    try {
      const editableContent: EditableContent = {
        content: newSrc,
        context: context,
        context_id: id,
        contentType: 'text',
        lastModified: Date.now()
      };
      
      const success = await saveContent(editableContent, defaultSrc);
      
      if (success) {
        setCurrentSrc(newSrc);
        console.log(`[ModernEditableImage] Image source saved for ${id}`);
      } else {
        console.error(`[ModernEditableImage] Failed to save image source for ${id}`);
      }
    } catch (error) {
      console.error(`[ModernEditableImage] Error saving image:`, error);
    }
    
    setShowUploadModal(false);
  }, [context, id, saveContent, defaultSrc]);
  
  // Loading state
  if (isLoading || !isInitialized) {
    return (
      <div
        className={`editable-image-skeleton ${className}`}
        style={{
          ...style,
          width: width || '100%',
          height: height || '200px',
          background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
          borderRadius: '0.375rem',
        }}
      />
    );
  }
  
  return (
    <>
      <img
        ref={imageRef}
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className={`editable-image-seamless ${isAuthenticated ? 'is-authenticated' : ''} ${showEditableHighlights ? 'editable-highlight' : ''} ${className}`}
        style={{
          ...style,
          cursor: isAuthenticated ? 'pointer' : 'default',
          transition: 'outline-color 150ms ease',
          outline: '2px solid transparent',
          outlineOffset: '1px',
          ...(isAuthenticated && {
            ':hover': {
              outlineColor: 'rgba(59, 130, 246, 0.3)',
            }
          }),
          ...(showEditableHighlights && isAuthenticated && {
            outlineColor: 'rgba(59, 130, 246, 0.3)',
            outlineStyle: 'dashed',
          })
        }}
        onClick={handleImageClick}
        title={isAuthenticated ? 'Click to change image' : undefined}
        data-context={context}
        data-context-id={id}
        role={isAuthenticated ? 'button' : undefined}
        tabIndex={isAuthenticated ? 0 : undefined}
        aria-label={isAuthenticated ? `Edit image: ${alt || id}` : alt}
        onKeyDown={isAuthenticated ? (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleImageClick();
          }
        } : undefined}
      />
      
      {/* Upload Modal */}
      <ImageUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onImageSelected={handleImageSelected}
      />
    </>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const ModernEditableImage = React.memo(ModernEditableImageComponent);