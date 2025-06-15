import React from "react";

import { MagicToken } from './MagicToken';
import type { User, AuthContextValue } from '../types';

const AuthContext = React.createContext<AuthContextValue | null>(null);

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

/**
 * Provider d'authentification
 * Responsabilité : gérer l'état d'authentification et l'utilisateur
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState<User | null>(null);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';

    /**
     * Initialise l'authentification au montage
     */
    React.useEffect(() => {
        const initAuth = async () => {
            console.group('[AuthProvider] Init auth');
            const token = MagicToken.detect();
            if (!token) {
                console.warn('[AuthProvider] No token detected. User is not authenticated.');
                setIsAuthenticated(false);
                setUser(null);
                console.groupEnd();
                return;
            }
            if (MagicToken.isExpired(token)) {
                console.warn('[AuthProvider] Token is expired. Clearing...');
                MagicToken.clear();
                setIsAuthenticated(false);
                setUser(null);
                console.groupEnd();
                return;
            }
            // Token valide, récupérer l'utilisateur
            try {
                console.info('[AuthProvider] Token is valid. Fetching user info...');
                const user = await fetchUser(token);
                if (user) {
                    setIsAuthenticated(true);
                    setUser(user);
                    console.info('[AuthProvider] User authenticated:', user);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                    console.warn('[AuthProvider] Token valid but user fetch failed.');
                }
            } catch (err) {
                setIsAuthenticated(false);
                setUser(null);
                console.error('[AuthProvider] Error fetching user:', err);
            }
            console.groupEnd();
        };

        initAuth();
    }, []);

    /**
     * Déconnexion
     */
    const logout = () => {
        MagicToken.clear();
        setIsAuthenticated(false);
        setUser(null);
        console.info('[AuthProvider] User logged out.');
    };

    /**
     * Récupère les infos utilisateur depuis l'API
     */
    const fetchUser = async (token: string): Promise<User | null> => {
        try {
            // Ex. d'appel à une API protégée
            const resp = await fetch(`${apiBaseUrl}/wp-json/wp/v2/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!resp.ok) {
                console.warn('[AuthProvider] fetchUser: API responded', resp.status);
                return null;
            }
            const user = await resp.json();
            console.debug('[AuthProvider] fetchUser: API returned', user);
            return user as User;
        } catch (error) {
            console.error('[AuthProvider] fetchUser: Error', error);
            return null;
        }
    };

    const value: AuthContextValue = {
        isAuthenticated,
        user,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};