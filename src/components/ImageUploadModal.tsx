// src/inline-editor/components/ImageUploadModal.tsx

import React from "react";

import { MediaUploadService, UploadProgress } from '../services/MediaUploadService';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageSelected: (url: string) => void;
}

type UploadMode = 'file' | 'url';

/**
 * Modal pour uploader des images ou importer depuis une URL
 */
export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onImageSelected
}) => {
  const [mode, setMode] = React.useState<UploadMode>('file');
  const [isDragging, setIsDragging] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string>('');
  const [externalUrl, setExternalUrl] = React.useState('');
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [error, setError] = React.useState<string>('');
  
  const fileInputRef =  React.useRef<HTMLInputElement>(null);
  const mediaService =  React.useRef(new MediaUploadService()).current;

  // Nettoyer la preview au démontage
  React.useEffect(() => {
    return () => {
      if (previewUrl && !MediaUploadService.isUrl(previewUrl)) {
        MediaUploadService.revokePreviewUrl(previewUrl);
      }
    };
  }, [previewUrl]);

  /**
   * Gestion du drag & drop
   */
  const handleDragOver =  React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave =  React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop =  React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      selectFile(imageFile);
    } else {
      setError('Veuillez déposer une image');
    }
  }, []);

  /**
   * Sélection d'un fichier
   */
  const selectFile =  React.useCallback((file: File) => {
    setSelectedFile(file);
    setError('');
    
    // Créer une preview
    if (previewUrl && !MediaUploadService.isUrl(previewUrl)) {
      MediaUploadService.revokePreviewUrl(previewUrl);
    }
    
    const newPreviewUrl = MediaUploadService.createPreviewUrl(file);
    setPreviewUrl(newPreviewUrl);
  }, [previewUrl]);

  /**
   * Upload du fichier sélectionné
   */
  const handleFileUpload =  React.useCallback(async () => {
    if (!selectedFile) {
      setError('Aucun fichier sélectionné');
      return;
    }

    setIsUploading(true);
    setError('');
    setUploadProgress(0);

    try {
      const result = await mediaService.uploadFile(
        selectedFile,
        (progress: UploadProgress) => {
          setUploadProgress(progress.percentage);
        }
      );

      if (result.success && result.data) {
        onImageSelected(result.data.url);
        onClose();
      } else {
        setError(result.error || 'Échec de l\'upload');
      }
    } catch (err) {
      setError('Erreur lors de l\'upload');
      console.error('[ImageUploadModal] Upload error:', err);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [selectedFile, mediaService, onImageSelected, onClose]);

  /**
   * Import depuis une URL
   */
  const handleUrlImport =  React.useCallback(async () => {
    if (!externalUrl.trim()) {
      setError('Veuillez entrer une URL');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const result = await mediaService.uploadFromUrl(externalUrl);

      if (result.success && result.data) {
        onImageSelected(result.data.url);
        onClose();
      } else {
        setError(result.error || 'Échec de l\'import');
      }
    } catch (err) {
      setError('Erreur lors de l\'import');
      console.error('[ImageUploadModal] Import error:', err);
    } finally {
      setIsUploading(false);
    }
  }, [externalUrl, mediaService, onImageSelected, onClose]);

  /**
   * Utiliser l'URL directement sans import
   */
  const handleUseDirectUrl =  React.useCallback(() => {
    if (!externalUrl.trim()) {
      setError('Veuillez entrer une URL');
      return;
    }

    onImageSelected(externalUrl);
    onClose();
  }, [externalUrl, onImageSelected, onClose]);

  /**
   * Réinitialiser le modal
   */
  const handleClose =  React.useCallback(() => {
    setSelectedFile(null);
    setPreviewUrl('');
    setExternalUrl('');
    setError('');
    setMode('file');
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="image-upload-modal-overlay"
      onClick={handleClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000
      }}
    >
      <div 
        className="image-upload-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#1f2937',
          borderRadius: '12px',
          padding: '24px',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto',
          color: 'white'
        }}
      >
        <h2 style={{ margin: '0 0 20px 0', fontSize: '24px' }}>
          Modifier l'image
        </h2>

        {/* Tabs de sélection du mode */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <button
            onClick={() => setMode('file')}
            style={{
              flex: 1,
              padding: '12px',
              background: mode === 'file' ? '#3b82f6' : '#374151',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background 0.2s'
            }}
          >
            📤 Upload un fichier
          </button>
          <button
            onClick={() => setMode('url')}
            style={{
              flex: 1,
              padding: '12px',
              background: mode === 'url' ? '#3b82f6' : '#374151',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background 0.2s'
            }}
          >
            🔗 Depuis une URL
          </button>
        </div>

        {/* Mode Upload de fichier */}
        {mode === 'file' && (
          <div>
            {/* Zone de drop */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${isDragging ? '#3b82f6' : '#6b7280'}`,
                borderRadius: '8px',
                padding: '40px',
                textAlign: 'center',
                cursor: 'pointer',
                background: isDragging ? 'rgba(59, 130, 246, 0.1)' : 'rgba(55, 65, 81, 0.5)',
                transition: 'all 0.2s'
              }}
            >
              {selectedFile ? (
                <div>
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{
                        maxWidth: '300px',
                        maxHeight: '200px',
                        objectFit: 'contain',
                        margin: '0 auto 16px'
                      }}
                    />
                  )}
                  <p style={{ margin: '8px 0', fontSize: '14px' }}>
                    {selectedFile.name}
                  </p>
                  <p style={{ margin: '0', fontSize: '12px', color: '#9ca3af' }}>
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <>
                  <p style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
                    📁 Glissez une image ici
                  </p>
                  <p style={{ margin: '0', fontSize: '14px', color: '#9ca3af' }}>
                    ou cliquez pour sélectionner
                  </p>
                </>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) selectFile(file);
              }}
              style={{ display: 'none' }}
            />

            {/* Progress bar */}
            {isUploading && uploadProgress > 0 && (
              <div style={{ marginTop: '16px' }}>
                <div style={{
                  background: '#374151',
                  borderRadius: '4px',
                  height: '8px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    background: '#3b82f6',
                    height: '100%',
                    width: `${uploadProgress}%`,
                    transition: 'width 0.3s'
                  }} />
                </div>
                <p style={{
                  textAlign: 'center',
                  marginTop: '8px',
                  fontSize: '14px',
                  color: '#9ca3af'
                }}>
                  {uploadProgress}%
                </p>
              </div>
            )}
          </div>
        )}

        {/* Mode URL */}
        {mode === 'url' && (
          <div>
            <input
              type="text"
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              style={{
                width: '100%',
                padding: '12px',
                background: '#374151',
                border: '1px solid #6b7280',
                borderRadius: '6px',
                color: 'white',
                fontSize: '16px'
              }}
            />
            
            <div style={{
              marginTop: '12px',
              padding: '12px',
              background: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '6px',
              fontSize: '14px'
            }}>
              <p style={{ margin: '0 0 8px 0' }}>
                💡 Deux options disponibles :
              </p>
              <ul style={{ margin: '0', paddingLeft: '20px' }}>
                <li>
                  <strong>Importer dans WordPress</strong> : L'image sera téléchargée et stockée dans votre médiathèque
                </li>
                <li>
                  <strong>Utiliser l'URL directement</strong> : L'image restera hébergée sur le site externe
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Message d'erreur */}
        {error && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid #ef4444',
            borderRadius: '6px',
            color: '#ef4444',
            fontSize: '14px'
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Actions */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginTop: '24px',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={handleClose}
            disabled={isUploading}
            style={{
              padding: '10px 20px',
              background: '#6b7280',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              cursor: isUploading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              opacity: isUploading ? 0.5 : 1
            }}
          >
            Annuler
          </button>

          {mode === 'file' && (
            <button
              onClick={handleFileUpload}
              disabled={!selectedFile || isUploading}
              style={{
                padding: '10px 20px',
                background: '#10b981',
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                cursor: !selectedFile || isUploading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                opacity: !selectedFile || isUploading ? 0.5 : 1
              }}
            >
              {isUploading ? 'Upload...' : 'Uploader'}
            </button>
          )}

          {mode === 'url' && (
            <>
              <button
                onClick={handleUseDirectUrl}
                disabled={!externalUrl.trim() || isUploading}
                style={{
                  padding: '10px 20px',
                  background: '#3b82f6',
                  border: 'none',
                  borderRadius: '6px',
                  color: 'white',
                  cursor: !externalUrl.trim() || isUploading ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  opacity: !externalUrl.trim() || isUploading ? 0.5 : 1
                }}
              >
                Utiliser l'URL
              </button>
              <button
                onClick={handleUrlImport}
                disabled={!externalUrl.trim() || isUploading}
                style={{
                  padding: '10px 20px',
                  background: '#10b981',
                  border: 'none',
                  borderRadius: '6px',
                  color: 'white',
                  cursor: !externalUrl.trim() || isUploading ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  opacity: !externalUrl.trim() || isUploading ? 0.5 : 1
                }}
              >
                {isUploading ? 'Import...' : 'Importer dans WP'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};