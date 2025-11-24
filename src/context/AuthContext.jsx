import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('bannerly_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async () => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser = {
                    id: '1',
                    name: 'Demo User',
                    email: 'demo@bannerly.com',
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
                    plan: 'free'
                };
                setUser(mockUser);
                localStorage.setItem('bannerly_user', JSON.stringify(mockUser));
                resolve(mockUser);
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('bannerly_user');
    };

    const value = {
        user,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
