import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

interface User {
    id_user: number;
    firstName: string;
    lastName: string;
    email: string;
    is_admin: boolean;
    is_restaurant_owner: boolean;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Vérifier si l'utilisateur est déjà connecté au chargement
    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                const savedUser = localStorage.getItem('user');
                if (savedUser) {
                    const parsedUser = JSON.parse(savedUser);
                    setUser(parsedUser);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Erreur lors de la vérification du statut utilisateur:', error);
                localStorage.removeItem('user');
            } finally {
                setIsLoading(false);
            }
        };

        checkUserStatus();
    }, []);

    const login = (userData: User) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
