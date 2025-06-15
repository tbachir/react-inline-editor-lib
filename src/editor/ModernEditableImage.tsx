import React from "react";
import { Upload, Save, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../auth';
import { useContent } from '../content';
import { useNotifications } from '../notifications';
import { detectContext, generateContextId } from '../context/EditableContentContext';
import { ImageUploadModal } from '../components/ImageUploadModal';
import type { EditableContent } from '../types';

interface ModernEditableImageProps {
  src: string;
  id: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
  onError?: () => void;
  showEditableHighlights?: boolean;
}

/**
 * Seamless editable image component with perfect WYSIWYG rendering
 * No animations, preserves all original styles and layout
 */
export const ModernEditableImage: React.FC<ModernEditableImageProps> = ({
  src: defaultSrc,
  id,
  alt = '',
  className = '',
  style = {},
  width,
  height,
  loading = 'eager',
  onError,
  showEditableHighlights = false
}) => {
  const { isAuthenticated } = useAuth();
  const { getContent, saveContent, isLoading } = useContent();
  const { success, error, promise } = useNotifications();
  
  const [isEditing, setIsEditing] = React.useState(false);
  const [context, setContext] = React.useState<string>('');
  const [currentSrc, setCurrentSrc] = React.useState<string>(defaultSrc);
  const [tempSrc, setTempSrc] = React.useState<string>('');
  const [isPreviewError, setIsPreviewError] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [showUploadModal, setShowUploadModal] = React.useState(false);
  
  const imageRef =  React.useRef<HTMLImageElement>(null);
  const inputRef =  React.useRef<HTMLInputElement>(null);
  
  // Initialize context and URL
  React.useEffect(() => {
    console.log('[ModernEditableImage] Effect triggered:', { isLoading, defaultSrc, id });
    
    if (isLoading) {
      console.log('[ModernEditableImage] Content provider is loading, waiting...');
      return;
    }
    
    // Set current src immediately to avoid loading state
    setCurrentSrc(defaultSrc);
    
    if (!imageRef.current) {
      console.log('[ModernEditableImage] No image ref yet, will retry...');
      return;
    }
    
    try {
      // Generate context
      const contextString = generateContextId(imageRef.current);
      console.log('[ModernEditableImage] Generated context:', contextString);
      setContext(contextString);
      
      // Get URL from provider
      const savedSrc = getContent(contextString, id, defaultSrc);
      console.log('[ModernEditableImage] Content from provider:', savedSrc);
      
      setCurrentSrc(savedSrc);
      setIsInitialized(true);
      
      console.log(`[ModernEditableImage] Initialized successfully:`, {
        context: contextString,
        contextId: id,
        defaultSrc,
        savedSrc
      });
    } catch (err) {
      console.error('[ModernEditableImage] Initialization error:', err);
      // Fallback to default src
      setCurrentSrc(defaultSrc);
      setIsInitialized(true);
    }
  }, [id, defaultSrc, getContent, isLoading]);
  
  /**
   * Enter edit mode
   */
  const handleEdit =  React.useCallback(() => {
    if (isAuthenticated && !isEditing && context) {
      setIsEditing(true);
      setTempSrc(currentSrc);
      setIsPreviewError(false);
      setShowUploadModal(false);
      
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 100);
    }
  }, [isAuthenticated, isEditing, context, currentSrc]);
  
  /**
   * Handle input changes
   */
  const handleInputChange =  React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newSrc = e.target.value;
    setTempSrc(newSrc);
    setIsPreviewError(false);
  }, []);
  
  /**
   * Handle preview errors
   */
  const handlePreviewError =  React.useCallback(() => {
    setIsPreviewError(true);
  }, []);
  
  /**
   * Handle image upload
   */
  const handleImageUploaded =  React.useCallback((newUrl: string) => {
    setTempSrc(newUrl);
    setIsPreviewError(false);
    setShowUploadModal(false);
  }, []);
  
  /**
   * Save new URL with consolidated notifications
   */
  const handleSave =  React.useCallback(async () => {
    if (!context || isSaving) return;
    
    // Basic URL validation
    if (!tempSrc.trim()) {
      error('Image URL cannot be empty');
      return;
    }
    
    // Validate URL format
    try {
      new URL(tempSrc, window.location.href);
    } catch {
      if (!tempSrc.startsWith('/') && !tempSrc.startsWith('./') && !tempSrc.startsWith('../')) {
        error('Invalid URL format. Use a complete URL or valid relative path.');
        return;
      }
    }
    
    if (isPreviewError) {
      // Show confirmation for broken images
      const confirmSave = window.confirm(
        'The image appears to be broken. Do you want to save this URL anyway?'
      );
      if (!confirmSave) return;
    }
    
    setIsSaving(true);
    
    try {
      const editableContent: EditableContent = {
        content: tempSrc,
        context: context,
        context_id: id,
        contentType: 'text',
        lastModified: Date.now()
      };
      
      // Use promise notification for consolidated feedback
      const saveSuccess = await promise(
        saveContent(editableContent, defaultSrc),
        {
          loading: 'Saving image...',
          success: 'Image updated successfully!',
          error: 'Failed to save image'
        }
      );
      
      if (saveSuccess) {
        setCurrentSrc(tempSrc);
        setIsEditing(false);
        console.log(`[ModernEditableImage] Image URL saved for ${id}`);
      }
    } catch (err) {
      console.error(`[ModernEditableImage] Save error:`, err);
    } finally {
      setIsSaving(false);
    }
  }, [context, tempSrc, isPreviewError, isSaving, id, saveContent, defaultSrc, error, promise]);
  
  /**
   * Cancel editing
   */
  const handleCancel =  React.useCallback(() => {
    setTempSrc(currentSrc);
    setIsEditing(false);
    setIsPreviewError(false);
  }, [currentSrc]);
  
  /**
   * Keyboard shortcuts
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
  
  // Show loading state only if content provider is loading AND we haven't initialized yet
  if (isLoading && !isInitialized) {
    console.log('[ModernEditableImage] Showing loading state');
    return (
      <div className="inline-flex items-center justify-center p-2 bg-gray-50 rounded">
        <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
      </div>
    );
  }
  
  // Edit mode with seamless integration
  if (isEditing && isAuthenticated) {
    return (
      <div className="editable-image-container-modern" style={{ position: 'relative', display: 'inline-block' }}>
        {/* Preview with exact same styling as original */}
        <div style={{ position: 'relative' }}>
          <img
            src={tempSrc || '/placeholder.png'}
            alt={alt}
            className={className}
            style={{
              ...style,
              opacity: isPreviewError ? 0.5 : 1,
              filter: isPreviewError ? 'grayscale(100%)' : 'none'
            }}
            width={width}
            height={height}
            onError={handlePreviewError}
          />
          
          {isPreviewError && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-red-50 border border-red-200 rounded"
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            >
              <div className="text-center">
                <ImageIcon className="w-6 h-6 text-red-400 mx-auto mb-1" />
                <span className="text-xs text-red-600">
                  Image failed to load
                </span>
              </div>
            </div>
          )}
        </div>
        
        {/* Seamless edit form */}
        <div 
          className="editable-image-form-modern"
          style={{
            position: 'absolute',
            bottom: '-3rem',
            left: 0,
            right: 0,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            padding: '0.5rem',
            borderRadius: '0.375rem',
            display: 'flex',
            gap: '0.25rem',
            zIndex: 1000,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={tempSrc}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter image URL..."
            style={{
              flex: 1,
              padding: '0.375rem 0.5rem',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              background: 'white',
              color: '#374151',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              outline: 'none'
            }}
            disabled={isSaving}
          />
          
          <button
            onClick={() => setShowUploadModal(true)}
            disabled={isSaving}
            style={{
              padding: '0.375rem',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Upload image"
          >
            <Upload size={12} />
          </button>
          
          <button
            onClick={handleSave}
            disabled={isSaving}
            style={{
              padding: '0.375rem',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: isSaving ? 'not-allowed' : 'pointer',
              opacity: isSaving ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Save changes"
          >
            {isSaving ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <Save size={12} />
            )}
          </button>
          
          <button
            onClick={handleCancel}
            disabled={isSaving}
            style={{
              padding: '0.375rem',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Cancel"
          >
            <X size={12} />
          </button>
        </div>
        
        {/* Upload modal */}
        {showUploadModal && (
          <ImageUploadModal
            isOpen={showUploadModal}
            onClose={() => setShowUploadModal(false)}
            onImageSelected={handleImageUploaded}
            currentImageUrl={tempSrc}
          />
        )}
      </div>
    );
  }
  
  // Read mode with minimal visual changes
  return (
    <img
      ref={imageRef}
      src={currentSrc}
      alt={alt}
      className={`editable-image-modern ${isAuthenticated ? 'is-authenticated' : ''} ${showEditableHighlights ? 'editable-highlight' : ''} ${className}`}
      style={{
        ...style,
        cursor: isAuthenticated ? 'pointer' : 'default',
      }}
      width={width}
      height={height}
      loading={loading}
      onClick={handleEdit}
      onError={onError}
      title={isAuthenticated ? 'Click to edit image' : undefined}
      data-context={context}
      data-context-id={id}
      tabIndex={isAuthenticated ? 0 : undefined}
      role={isAuthenticated ? 'button' : undefined}
      aria-label={isAuthenticated ? `Edit image ${id}` : alt}
      onKeyDown={isAuthenticated ? (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleEdit();
        }
      } : undefined}
    />
  );
};