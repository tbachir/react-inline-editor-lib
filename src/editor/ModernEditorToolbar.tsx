import React from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../auth';
import { useNotifications } from '../notifications';

interface ModernEditorToolbarProps {
    showEditableHighlights: boolean;
    toggleEditableHighlights: () => void;
}

/**
 * Modern redesigned editor toolbar with enhanced UX
 */
export const ModernEditorToolbar: React.FC<ModernEditorToolbarProps> = ({
    showEditableHighlights,
    toggleEditableHighlights
}) => {
    const { isAuthenticated, logout, user } = useAuth();
    const { success, info } = useNotifications();

    // Don't show toolbar if user is not authenticated
    if (!isAuthenticated) {
        return null;
    }

    const handleLogout = () => {
        logout();
        success('Successfully logged out');
    };

    const handleToggleHighlights = () => {
        toggleEditableHighlights();
        info(showEditableHighlights ? 'Edit highlights hidden' : 'Edit highlights shown');
    };

    return (
        <motion.div
            className="global-editor-toolbar-modern"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            {/* User indicator */}
            <motion.div
                className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-blue-800">
                    {user?.name || 'Editor'}
                </span>
            </motion.div>

            {/* Highlight toggle */}
            <motion.button
                onClick={handleToggleHighlights}
                className={`global-editor-toolbar-btn-modern ${showEditableHighlights ? 'active' : ''}`}
                title={showEditableHighlights ? 'Hide editable highlights' : 'Show editable highlights'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
            >
                {showEditableHighlights ? <EyeOff size={18} /> : <Eye size={18} />}
            </motion.button>

            {/* Settings button (placeholder for future features) */}
            <motion.button
                className="global-editor-toolbar-btn-modern"
                title="Editor settings"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                onClick={() => info('Settings panel coming soon')}
            >
                <Settings size={18} />
            </motion.button>

            {/* Logout button */}
            <motion.button
                onClick={handleLogout}
                className="global-editor-toolbar-btn-modern logout"
                title="Logout"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
            >
                <LogOut size={18} />
            </motion.button>
        </motion.div>
    );
};