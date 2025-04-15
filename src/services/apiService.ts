import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    is_restaurant_owner: boolean;
}

interface User {
    id_user: number;
    firstName: string;
    lastName: string;
    email: string;
    is_admin: boolean;
    is_restaurant_owner: boolean;
}

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    user?: T;
}

export const apiService = {
    async register(userData: UserData): Promise<{ success: boolean, message?: string }> {
        try {
            const response = await axios.post<ApiResponse<User>>(`${API_URL}/auth/register`, userData);
            return {
                success: response.data.success,
                message: response.data.message
            };
        } catch (error: any) {
            if (error.response) {
                // Erreur avec réponse du serveur (ex: email déjà utilisé)
                return {
                    success: false,
                    message: error.response.data.message || 'Erreur lors de l\'inscription'
                };
            }
            
            console.error('Erreur d\'inscription:', error);
            return { 
                success: false, 
                message: 'Erreur de connexion au serveur' 
            };
        }
    },

    async login(email: string, password: string): Promise<User> {
        try {
            const response = await axios.post<ApiResponse<User>>(`${API_URL}/auth/login`, { email, password });
            
            if (response.data.success && response.data.user) {
                return response.data.user;
            } else {
                throw new Error(response.data.message || 'Échec de la connexion');
            }
        } catch (error: any) {
            if (error.response) {
                throw new Error(error.response.data.message || 'Échec de la connexion');
            }
            
            console.error('Erreur de connexion:', error);
            throw new Error('Erreur de connexion au serveur');
        }
    },

    // Ajouter une méthode pour vérifier si l'utilisateur est connecté
    async checkAuth(): Promise<User | null> {
        const token = localStorage.getItem('auth_token');
        if (!token) return null;

        try {
            // Dans une implémentation réelle, cette route vérifierait le token JWT
            // Pour l'instant, c'est juste une simulation
            return null;
        } catch (error) {
            console.error('Erreur de vérification d\'authentification:', error);
            return null;
        }
    }
}; 