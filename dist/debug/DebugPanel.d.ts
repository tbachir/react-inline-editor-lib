import React from "react";
/**
 * Panel de debug simplifié
 * Responsabilité : afficher les informations de debug essentielles
 */
export declare const DebugPanel: React.FC;
export declare const addDebugSection: (section: {
    id: string;
    title: string;
    component: React.ComponentType;
}) => void;
