// src/inline-editor/debug/DebugPanel.tsx

import React from "react";

import { useAuth } from '../auth';
import { useContent } from '../content';

/**
 * Panel de debug simplifié
 * Responsabilité : afficher les informations de debug essentielles
 */
export const DebugPanel: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  // Seulement en développement et si debug activé
  if (import.meta.env.PROD || !import.meta.env.VITE_DEBUG_ENABLED) {
    return null;
  }
  
  return (
    <div className="debug-panel">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="debug-toggle"
      >
        🔧 {isOpen ? 'Close' : 'Debug'}
      </button>
      
      {isOpen && (
        <div className="debug-content">
          <AuthDebugSection />
          <ContentDebugSection />
          <ContextDebugSection />
          <EnvironmentDebugSection />
        </div>
      )}
    </div>
  );
};

/**
 * Section Auth
 */
function AuthDebugSection() {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <div className="debug-section">
      <h4>Authentication</h4>
      <div>Status: {isAuthenticated ? '✅ Authenticated' : '❌ Not authenticated'}</div>
      <div>User: {user?.name || 'None'}</div>
      <div>Token: {localStorage.getItem('inline_editor_token') ? '✅ Present' : '❌ Missing'}</div>
    </div>
  );
}

/**
 * Section Content
 */
function ContentDebugSection() {
  const { isLoading, contents, refreshContents } = useContent();
  const contentCount = Object.keys(contents).length;
  
  return (
    <div className="debug-section">
      <h4>Content</h4>
      <div>Loading: {isLoading ? '⏳ Yes' : '✅ No'}</div>
      <div>Contents: {contentCount} items</div>
      <div>
        Latest contents:
        <pre style={{ fontSize: '10px', maxHeight: '100px', overflow: 'auto', marginTop: '4px' }}>
          {JSON.stringify(
            Object.fromEntries(
              Object.entries(contents).slice(0, 3).map(([key, content]) => [
                key, 
                { 
                  content: content.content?.substring(0, 50) + (content.content && content.content.length > 50 ? '...' : ''),
                  version: content.version 
                }
              ])
            ), 
            null, 
            2
          )}
        </pre>
      </div>
      <button onClick={refreshContents}>🔄 Refresh</button>
    </div>
  );
}

/**
 * Section Context
 */
function ContextDebugSection() {
  const editableElements = document.querySelectorAll('.editable-wrapper[data-context]');
  
  return (
    <div className="debug-section">
      <h4>Context</h4>
      <div>Page: {window.location.pathname}</div>
      <div>Editable elements: {editableElements.length}</div>
      <div>
        Elements:
        <div style={{ fontSize: '10px', maxHeight: '80px', overflow: 'auto' }}>
          {Array.from(editableElements).slice(0, 5).map((el, idx) => (
            <div key={idx}>
              • {el.getAttribute('data-context-id')} ({el.getAttribute('data-context')})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Section Environment
 */
function EnvironmentDebugSection() {
  return (
    <div className="debug-section">
      <h4>Environment</h4>
      <div>API Base URL: {import.meta.env.VITE_API_BASE_URL || 'Not set'}</div>
      <div>Debug Enabled: {import.meta.env.VITE_DEBUG_ENABLED || 'false'}</div>
      <div>Min Loader Duration: {import.meta.env.VITE_MIN_LOADER_DURATION || '0'}s</div>
      <div>Mode: {import.meta.env.MODE}</div>
      <div>Dev: {import.meta.env.DEV ? 'Yes' : 'No'}</div>
      <div>Prod: {import.meta.env.PROD ? 'Yes' : 'No'}</div>
    </div>
  );
}

// Export function to add custom debug sections (for future extensibility)
export const addDebugSection = (section: { id: string; title: string; component: React.ComponentType }) => {
  // Future implementation for custom debug sections
  console.log('[DebugPanel] Custom debug section registered:', section.id);
};