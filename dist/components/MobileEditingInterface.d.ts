import React from 'react';
interface MobileEditingInterfaceProps {
    isVisible: boolean;
    onSave: () => void;
    onCancel: () => void;
    onToggleKeyboard?: () => void;
    isSaving?: boolean;
    hasChanges?: boolean;
}
/**
 * Mobile-optimized editing interface with touch-friendly controls
 */
export declare const MobileEditingInterface: React.FC<MobileEditingInterfaceProps>;
export {};
