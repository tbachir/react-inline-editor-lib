import React from "react";

import { useAuth } from '../auth';
import { useNotifications } from '../notifications';
import type { EditableContent, ContentContextValue } from '../types';
import { ApiService } from '../services/ApiService';

const ContentContext = React.createContext<ContentContextValue | null>(null);

export const useContent = () => {
    const context = React.useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within ContentProvider');
    }
    return context;
};

interface ContentProviderProps {
    children: React.ReactNode;
    apiBaseUrl?: string;
    onVersionConflict?: (conflict: {
        clientVersion: number;
        serverVersion: number;
        serverContent: string;
        clientContent: string;
    }) => Promise<'overwrite' | 'keep_server' | 'cancel'>;
}

/**
 * Enhanced content provider with consolidated notification system
 */
export const ContentProvider: React.FC<ContentProviderProps> = ({
    children,
    apiBaseUrl,
    onVersionConflict
}) => {
    const { isAuthenticated } = useAuth();
    const { error, warning, promise } = useNotifications();
    const [isLoading, setIsLoading] = React.useState(true);
    const [contents, setContents] = React.useState<Record<string, EditableContent>>({});
    
    // Use environment variable for API base URL if not provided
    const effectiveApiBaseUrl = apiBaseUrl || import.meta.env.VITE_API_BASE_URL;
    const [apiService] = React.useState(() => new ApiService(effectiveApiBaseUrl));

    // Log configuration on initialization
    React.useEffect(() => {
        const config = apiService.getConfig();
        console.log('[ContentProvider] Initialized with config:', config);
        console.log('[ContentProvider] Debug enabled:', import.meta.env.VITE_DEBUG_ENABLED);
    }, [apiService]);

    /**
     * Generate unique key for content
     */
    const generateKey =  React.useCallback((context: string, contextId: string): string => {
        if (!context || !contextId) {
            throw new Error('Context and contextId are required and cannot be empty');
        }
        return `${context}#${contextId}`;
    }, []);

    /**
     * Convert content array to Record with unique keys
     */
    const arrayToContentRecord =  React.useCallback((contentArray: EditableContent[]): Record<string, EditableContent> => {
        const record: Record<string, EditableContent> = {};
        
        for (const content of contentArray) {
            if (content.context && content.context_id) {
                const key = generateKey(content.context, content.context_id);
                record[key] = content;
            }
        }
        
        return record;
    }, [generateKey]);

    /**
     * Load contents from API with consolidated notifications
     */
    const loadContents =  React.useCallback(async (): Promise<void> => {
        try {
            const contentArray = await apiService.loadAllContents();
            const newContents = arrayToContentRecord(contentArray);
            setContents(newContents);
            
            console.log('[ContentProvider] Loaded', Object.keys(newContents).length, 'contents');
            
            // Only show success notification if there are contents and user is authenticated
            if (Object.keys(newContents).length > 0 && isAuthenticated) {
                // Use a more subtle notification for content loading
                console.log(`[ContentProvider] Successfully loaded ${Object.keys(newContents).length} editable contents`);
            }
        } catch (loadError) {
            console.error('[ContentProvider] Failed to load contents:', loadError);
            error('Failed to load content. Please refresh the page.');
            throw loadError;
        }
    }, [apiService, arrayToContentRecord, error, isAuthenticated]);

    /**
     * Initialize on mount and auth change
     */
    React.useEffect(() => {
        const initialize = async () => {
            setIsLoading(true);
            try {
                await loadContents();
            } catch (initError) {
                console.error('[ContentProvider] Initialization failed:', initError);
            } finally {
                setIsLoading(false);
            }
        };

        initialize();
    }, [isAuthenticated, loadContents]);

    /**
     * Get content by context and contextId
     */
    const getContent =  React.useCallback((context: string, contextId: string, defaultContent: string): string => {
        if (!context || !contextId) {
            console.warn('[ContentProvider] getContent called with empty context or contextId');
            return defaultContent;
        }

        try {
            const key = generateKey(context, contextId);
            return contents[key]?.content || defaultContent;
        } catch (getError) {
            console.error('[ContentProvider] Error in getContent:', getError);
            return defaultContent;
        }
    }, [contents, generateKey]);

    /**
     * Save content with consolidated notifications and conflict handling
     */
    const saveContent =  React.useCallback(async (
        editableContent: EditableContent, 
        defaultContent?: string
    ): Promise<boolean> => {
        // Validation
        if (!editableContent.context || !editableContent.context_id) {
            console.error('[ContentProvider] Cannot save: context and context_id are required');
            error('Invalid content configuration');
            return false;
        }

        if (!isAuthenticated) {
            console.error('[ContentProvider] Cannot save: authentication required');
            warning('Please log in to save changes');
            return false;
        }

        const key = generateKey(editableContent.context, editableContent.context_id);
        const existingContent = contents[key];

        // Don't send defaultContent if content already exists
        const shouldSendDefaultContent = !existingContent && defaultContent !== undefined;

        try {
            // Optimistic update
            setContents(prev => ({
                ...prev,
                [key]: { ...editableContent, lastModified: Date.now() }
            }));

            // Prepare content to save
            const contentToSave: EditableContent = {
                ...editableContent,
                // Include ID and version if they exist
                ...(existingContent && {
                    editable_id: existingContent.editable_id,
                    version: existingContent.version
                })
            };

            // Save via API - notifications are handled by the calling component
            const result = await apiService.saveContent(
                contentToSave, 
                shouldSendDefaultContent ? defaultContent : undefined
            );

            // Handle different statuses
            switch (result.status) {
                case 'success':
                    // Update with API response
                    setContents(prev => ({
                        ...prev,
                        [key]: result.content
                    }));
                    console.log('[ContentProvider] Content saved successfully:', editableContent.context_id);
                    return true;

                case 'no_action':
                    // Content already exists
                    setContents(prev => ({
                        ...prev,
                        [key]: result.content
                    }));
                    console.log('[ContentProvider] Content already exists, using server version');
                    return true;

                case 'no_change':
                    // No changes detected
                    console.log('[ContentProvider] No changes detected');
                    warning('No changes detected');
                    return true;

                default:
                    throw new Error(`Unexpected status: ${result.status}`);
            }

        } catch (saveError) {
            console.error('[ContentProvider] Save failed:', saveError);

            // Revert optimistic update
            setContents(prev => {
                const reverted = { ...prev };
                const originalContent = contents[key];
                
                if (originalContent) {
                    reverted[key] = originalContent;
                } else {
                    delete reverted[key];
                }
                
                return reverted;
            });

            // Handle version conflicts
            if (ApiService.isVersionConflictError(saveError)) {
                const conflict = ApiService.getConflictInfo(saveError);
                if (conflict && onVersionConflict) {
                    const resolution = await onVersionConflict({
                        clientVersion: conflict.client_version,
                        serverVersion: conflict.server_version,
                        serverContent: conflict.server_content,
                        clientContent: editableContent.content
                    });

                    switch (resolution) {
                        case 'overwrite':
                            // Force save with new version
                            const updatedContent = {
                                ...editableContent,
                                version: conflict.server_version,
                                editable_id: conflict.editable_id
                            };
                            return saveContent(updatedContent);

                        case 'keep_server':
                            // Update with server version
                            setContents(prev => ({
                                ...prev,
                                [key]: {
                                    ...editableContent,
                                    content: conflict.server_content,
                                    version: conflict.server_version,
                                    editable_id: conflict.editable_id,
                                    lastModified: Date.now()
                                }
                            }));
                            warning('Using server version of content');
                            return false;

                        case 'cancel':
                        default:
                            warning('Save cancelled');
                            return false;
                    }
                } else {
                    // No conflict callback, show error
                    const conflict = ApiService.getConflictInfo(saveError);
                    if (conflict) {
                        error(`Content was modified by another user. Please refresh to get the latest version.`);
                    }
                }
            }

            return false;
        }
    }, [isAuthenticated, generateKey, apiService, contents, onVersionConflict, error, warning]);

    /**
     * Force resynchronization with consolidated notifications
     */
    const refreshContents =  React.useCallback(async (): Promise<void> => {
        setIsLoading(true);
        try {
            await promise(
                loadContents(),
                {
                    loading: 'Refreshing content...',
                    success: 'Content refreshed successfully!',
                    error: 'Failed to refresh content'
                }
            );
        } finally {
            setIsLoading(false);
        }
    }, [loadContents, promise]);

    const value: ContentContextValue = {
        isLoading,
        contents,
        getContent,
        saveContent,
        refreshContents
    };

    return (
        <ContentContext.Provider value={value}>
            {children}
        </ContentContext.Provider>
    );
};