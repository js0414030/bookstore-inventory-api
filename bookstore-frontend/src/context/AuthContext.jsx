import React, { createContext, useEffect, useState, useCallback } from 'react';

const AuthContext = createContext();

const API_BASE = 'http://localhost:5000/api';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Save accessToken and user
    const saveAuth = (token, userData) => {
        setAccessToken(token);
        setUser(userData);
        localStorage.setItem('accessToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // Clear auth data on logout
    const clearAuth = () => {
        setAccessToken(null);
        setUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
    };

    // Login API call
    const login = async (email, password) => {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // to send cookies
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) throw new Error('Login failed');
        const data = await res.json();
        saveAuth(data.accessToken, data.user);
    };

    // Register API call
    const register = async (email, password) => {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) throw new Error('Registration failed');
        const data = await res.json();
        saveAuth(data.accessToken, data.user);
    };

    // Refresh token API call
    const refreshToken = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE}/auth/refresh_token`, {
                method: 'POST',
                credentials: 'include',
            });
            if (!res.ok) throw new Error('Failed to refresh token');
            const data = await res.json();
            saveAuth(data.accessToken, data.user);
        } catch (err) {
            clearAuth();
        } finally {
            setLoading(false);
        }
    }, []);

    // Logout API call
    const logout = async () => {
        await fetch(`${API_BASE}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });
        clearAuth();
    };

    // On mount, load saved user and try to refresh token
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setAccessToken(localStorage.getItem('accessToken'));
        }
        refreshToken();
    }, [refreshToken]);

    // Value to pass into context consumers
    const value = {
        user,
        accessToken,
        login,
        register,
        logout,
        loading,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export default AuthContext;
