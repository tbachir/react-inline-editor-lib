import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, X, Type, Image, Settings } from 'lucide-react';
import { Button } from './ui/Button';
import { useViewport } from '../hooks/useViewport';
import { designTokens } from '../design/DesignTokens';

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
export const MobileEditingInterface: React.FC<MobileEditingInterfaceProps> = ({
  isVisible,
  onSave,
  onCancel,
  onToggleKeyboard,
  isSaving = false,
  hasChanges = false
}) => {
  const { isMobile } = useViewport();

  if (!isMobile || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: `1px solid ${designTokens.colors.neutral[200]}`,
          padding: designTokens.spacing.md,
          zIndex: 10000,
          boxShadow: designTokens.shadows.xl,
        }}
      >
        {/* Safe area for devices with home indicator */}
        <div style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          {/* Quick actions bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: designTokens.spacing.sm,
            }}
          >
            <div style={{ display: 'flex', gap: designTokens.spacing.sm }}>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Type size={16} />}
                onClick={onToggleKeyboard}
              >
                Keyboard
              </Button>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Image size={16} />}
              >
                Media
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<Settings size={16} />}
            >
              Options
            </Button>
          </div>

          {/* Main action buttons */}
          <div
            style={{
              display: 'flex',
              gap: designTokens.spacing.sm,
            }}
          >
            <Button
              variant="secondary"
              size="lg"
              leftIcon={<X size={18} />}
              onClick={onCancel}
              disabled={isSaving}
              style={{ flex: 1 }}
            >
              Cancel
            </Button>
            
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Save size={18} />}
              onClick={onSave}
              disabled={isSaving || !hasChanges}
              isLoading={isSaving}
              style={{ flex: 2 }}
            >
              {isSaving ? 'Saving...' : hasChanges ? 'Save Changes' : 'No Changes'}
            </Button>
          </div>

          {/* Status indicator */}
          {hasChanges && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                marginTop: designTokens.spacing.sm,
                padding: designTokens.spacing.sm,
                background: designTokens.colors.primary[50],
                border: `1px solid ${designTokens.colors.primary[200]}`,
                borderRadius: designTokens.borderRadius.md,
                textAlign: 'center',
                fontSize: designTokens.typography.fontSize.sm[0],
                color: designTokens.colors.primary[700],
              }}
            >
              📝 You have unsaved changes
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};