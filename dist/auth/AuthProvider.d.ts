import React from "react";
import type { AuthContextValue } from '../types';
export declare const useAuth: () => AuthContextValue;
interface AuthProviderProps {
    children: React.ReactNode;
}
/**
 * Provider d'authentification
 * Responsabilité : gérer l'état d'authentification et l'utilisateur
 */
export declare const AuthProvider: React.FC<AuthProviderProps>;
export {};
