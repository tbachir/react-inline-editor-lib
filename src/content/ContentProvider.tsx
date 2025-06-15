import React from "react";
import { useAuth } from '../auth';
import { useNotifications } from '../notifications';
import { useDebounce } from '../hooks/useDebounce';
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
 * Enhanced content provider with performance optimizations
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
    
    // Cache for frequently accessed content
    const contentCache = React.useRef(new Map<string, { content: EditableContent; timestamp: number }>());
    const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
    
    const effectiveApiBaseUrl = apiBaseUrl || import.meta.env.VITE_API_BASE_URL;
    const [apiService] = React.useState(() => new ApiService(effectiveApiBaseUrl));

    // Debounced save to prevent excessive API calls
    const debouncedSave = useDebounce(async (content: EditableContent, defaultContent?: string) => {
        return await performSave(content, defaultContent);
    }, 500);

    /**
     * Generate unique key for content with validation
     */
    const generateKey = React.useCallback((context: string, contextId: string): string => {
        if (!context?.trim() || !contextId?.trim()) {
            throw new Error('Context and contextId are required and cannot be empty');
        }
        return `${context}#${contextId}`;
    }, []);

    /**
     * Get content from cache first, then fallback to state
     */
    const getContentFromCache = React.useCallback((key: string): EditableContent | null => {
        const cached = contentCache.current.get(key);
        if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
            return cached.content;
        }
        contentCache.current.delete(key);
        return null;
    }, []);

    /**
     * Update cache when content changes
     */
    const updateCache = React.useCallback((key: string, content: EditableContent) => {
        contentCache.current.set(key, {
            content,
            timestamp: Date.now()
        });
    }, []);

    /**
     * Optimized content getter with caching
     */
    const getContent = React.useCallback((context: string, contextId: string, defaultContent: string): string => {
        if (!context?.trim() || !contextId?.trim()) {
            console.warn('[ContentProvider] getContent called with empty context or contextId');
            return defaultContent;
        }

        try {
            const key = generateKey(context, contextId);
            
            // Check cache first
            const cached = getContentFromCache(key);
            if (cached) {
                return cached.content;
            }
            
            // Fallback to state
            const stateContent = contents[key];
            if (stateContent) {
                updateCache(key, stateContent);
                return stateContent.content;
            }
            
            return defaultContent;
        } catch (getError) {
            console.error('[ContentProvider] Error in getContent:', getError);
            return defaultContent;
        }
    }, [contents, generateKey, getContentFromCache, updateCache]);

    /**
     * Actual save implementation
     */
    const performSave = React.useCallback(async (
        editableContent: EditableContent, 
        defaultContent?: string
    ): Promise<boolean> => {
        if (!editableContent.context?.trim() || !editableContent.context_id?.trim()) {
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

        try {
            // Optimistic update
            const optimisticContent = { ...editableContent, lastModified: Date.now() };
            setContents(prev => ({ ...prev, [key]: optimisticContent }));
            updateCache(key, optimisticContent);

            const contentToSave: EditableContent = {
                ...editableContent,
                ...(existingContent && {
                    editable_id: existingContent.editable_id,
                    version: existingContent.version
                })
            };

            const result = await apiService.saveContent(
                contentToSave, 
                !existingContent && defaultContent !== undefined ? defaultContent : undefined
            );

            switch (result.status) {
                case 'success':
                case 'no_action':
                    const updatedContent = result.content;
                    setContents(prev => ({ ...prev, [key]: updatedContent }));
                    updateCache(key, updatedContent);
                    return true;

                case 'no_change':
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
                if (existingContent) {
                    reverted[key] = existingContent;
                    updateCache(key, existingContent);
                } else {
                    delete reverted[key];
                    contentCache.current.delete(key);
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
                            const updatedContent = {
                                ...editableContent,
                                version: conflict.server_version,
                                editable_id: conflict.editable_id
                            };
                            return performSave(updatedContent);

                        case 'keep_server':
                            const serverContent = {
                                ...editableContent,
                                content: conflict.server_content,
                                version: conflict.server_version,
                                editable_id: conflict.editable_id,
                                lastModified: Date.now()
                            };
                            setContents(prev => ({ ...prev, [key]: serverContent }));
                            updateCache(key, serverContent);
                            warning('Using server version of content');
                            return false;

                        case 'cancel':
                        default:
                            warning('Save cancelled');
                            return false;
                    }
                } else {
                    error('Content was modified by another user. Please refresh to get the latest version.');
                }
            }

            return false;
        }
    }, [isAuthenticated, generateKey, apiService, contents, onVersionConflict, error, warning, updateCache]);

    /**
     * Public save method that uses debouncing
     */
    const saveContent = React.useCallback(async (
        editableContent: EditableContent, 
        defaultContent?: string
    ): Promise<boolean> => {
        return debouncedSave(editableContent, defaultContent);
    }, [debouncedSave]);

    /**
     * Convert content array to Record with unique keys
     */
    const arrayToContentRecord = React.useCallback((contentArray: EditableContent[]): Record<string, EditableContent> => {
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
    const loadContents = React.useCallback(async (): Promise<void> => {
        try {
            const contentArray = await apiService.loadAllContents();
            const newContents = arrayToContentRecord(contentArray);
            setContents(newContents);
            
            // Update cache with new contents
            Object.entries(newContents).forEach(([key, content]) => {
                updateCache(key, content);
            });
            
            if (Object.keys(newContents).length > 0 && isAuthenticated) {
                console.log(`[ContentProvider] Successfully loaded ${Object.keys(newContents).length} editable contents`);
            }
        } catch (loadError) {
            console.error('[ContentProvider] Failed to load contents:', loadError);
            error('Failed to load content. Please refresh the page.');
            throw loadError;
        }
    }, [apiService, arrayToContentRecord, error, isAuthenticated, updateCache]);

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
     * Force resynchronization with consolidated notifications
     */
    const refreshContents = React.useCallback(async (): Promise<void> => {
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