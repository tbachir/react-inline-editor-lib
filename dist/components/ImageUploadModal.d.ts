import React from "react";
interface ImageUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onImageSelected: (url: string) => void;
}
/**
 * Modal pour uploader des images ou importer depuis une URL
 */
export declare const ImageUploadModal: React.FC<ImageUploadModalProps>;
export {};
