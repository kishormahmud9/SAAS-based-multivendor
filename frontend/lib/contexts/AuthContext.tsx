"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import * as authAPI from '@/lib/api/auth';
import { registerLogoutCallback } from '@/lib/api/fetchWithAuth';

interface User {
    id: string;
    name: string | null;
    email: string;
    role: string;
    emailVerified: Date | null;
    permissions?: string[];
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string, rememberMe: boolean) => Promise<User | undefined>;
    register: (name: string, email: string, password: string) => Promise<{ userId: string; email: string }>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
    hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check authentication status on mount
    useEffect(() => {
        checkAuth();
    }, []);

    // --- Auto Refresh: proactive token refresh every 13 minutes ---
    // accessToken expires in 15 min, so we refresh 2 min early to avoid expiry mid-request
    useEffect(() => {
        const REFRESH_INTERVAL = 13 * 60 * 1000 // 13 minutes

        const interval = setInterval(async () => {
            // Only refresh if user is authenticated
            if (!user) return

            const result = await authAPI.refreshToken()
            if (!result.success) {
                // Refresh failed — both tokens expired, force logout
                setUser(null)
                window.location.href = '/login'
            } else if (result.user) {
                setUser(result.user)
            }
        }, REFRESH_INTERVAL)

        return () => clearInterval(interval)
    }, [user])

    // --- Register logout callback so fetchWithAuth can trigger logout ---
    const performLogout = useCallback(async () => {
        await authAPI.logout()
        setUser(null)
    }, [])

    useEffect(() => {
        registerLogoutCallback(performLogout)
    }, [performLogout])

    const checkAuth = async () => {
        try {
            const result = await authAPI.getCurrentUser();
            if (result.success && result.user) {
                setUser(result.user);
            } else {
                // Try to refresh token
                const refreshResult = await authAPI.refreshToken();
                if (refreshResult.success && refreshResult.user) {
                    setUser(refreshResult.user);
                } else {
                    setUser(null);
                }
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string, rememberMe: boolean) => {
        const result = await authAPI.login(email, password, rememberMe);

        if (!result.success) {
            const error: any = new Error(result.error || 'Login failed');
            error.field = result.field;
            throw error;
        }

        if (result.user) {
            setUser(result.user);
            return result.user;
        }
    };

    const register = async (name: string, email: string, password: string) => {
        const result = await authAPI.register(name, email, password);

        if (!result.success) {
            throw new Error(result.error || 'Registration failed');
        }

        if (!result.data) {
            throw new Error('Registration failed - no data returned');
        }

        return result.data;
    };

    const logout = async () => {
        await performLogout();
    };

    const refreshUser = async () => {
        const result = await authAPI.getCurrentUser();
        if (result.success && result.user) {
            setUser(result.user);
        }
    };

    const hasPermission = useCallback((permission: string) => {
        // If user is a vendor, they have all permissions for now (Mock logic)
        if (user?.role === 'VENDOR') return true;
        
        // Otherwise check assigned permissions
        return user?.permissions?.includes(permission) || false;
    }, [user]);

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
        hasPermission
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
