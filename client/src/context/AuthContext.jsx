import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

/**
 * Auth Context
 * Manages authentication state, login/logout, and token management
 */

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user on mount if token exists
    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await api.get('/auth/me');
                setUser(response.data.data.user);
            } catch (err) {
                console.error('Auth check failed:', err);
                // Token is invalid, clear it
                localStorage.removeItem('token');
                setToken(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    /**
     * Register a new user
     */
    const register = async (userData) => {
        try {
            setError(null);
            const response = await api.post('/auth/register', userData);
            const { user, token: newToken } = response.data.data;

            localStorage.setItem('token', newToken);
            setToken(newToken);
            setUser(user);

            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed';
            setError(message);
            return { success: false, error: message };
        }
    };

    /**
     * Login user
     */
    const login = async (credentials) => {
        try {
            setError(null);
            const response = await api.post('/auth/login', credentials);
            const { user, token: newToken } = response.data.data;

            localStorage.setItem('token', newToken);
            setToken(newToken);
            setUser(user);

            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed';
            setError(message);
            return { success: false, error: message };
        }
    };

    /**
     * Logout user
     */
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setError(null);
    };

    /**
     * Update user profile
     */
    const updateProfile = async (profileData) => {
        try {
            setError(null);
            const response = await api.put('/user/profile', profileData);
            setUser(response.data.data.user);
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Update failed';
            setError(message);
            return { success: false, error: message };
        }
    };

    const value = {
        user,
        token,
        loading,
        error,
        isAuthenticated: !!user,
        register,
        login,
        logout,
        updateProfile,
        clearError: () => setError(null)
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
