"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/src/services/auth.service';

interface User {
    id: string;
    name: string | null;
    email: string;
    role: string;
    storeId?: string | null;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string, rememberMe: boolean) => Promise<User | undefined>;
    register: (name: string, email: string, password: string) => Promise<any>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
    hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const result = await authService.getMe();
            // In the backend response, 'data' itself is the user object for /me
            if (result.success && result.data) {
                setUser(result.data);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string, rememberMe: boolean) => {
        const result = await authService.login({ email, password, rememberMe });

        if (result.success && result.data.user) {
            setUser(result.data.user);
            return result.data.user;
        }
    };

    const register = async (name: string, email: string, password: string) => {
        const result = await authService.register({ name, email, password });

        if (!result.success) {
            throw new Error(result.message || 'Registration failed');
        }

        return result.data;
    };

    const logout = async () => {
        try {
            await authService.logout();
        } finally {
            localStorage.clear();
            setUser(null);
            router.push('/login');
        }
    };

    const refreshUser = async () => {
        const result = await authService.getMe();
        if (result.success && result.data) {
            setUser(result.data);
        }
    };

    // Simple role-based permission check for frontend UI visibility.
    // Real authorization is enforced on the backend.
    const hasPermission = (permission: string): boolean => {
        if (!user) return false;
        const role = user.role?.toUpperCase();
        
        // Super Admins and Admins have full access
        if (role === 'SUPER_ADMIN' || role === 'ADMIN') return true;
        
        // Vendor and Vendor Staff have access to their portal features
        if (role === 'VENDOR' || role === 'VENDOR_STAFF') return true;

        // Fallback for customer/user roles (limited features)
        return false;
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
        hasPermission,
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
