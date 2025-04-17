import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import MainImage from '../../assets/images/MainImage.png';
import { apiService } from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        is_restaurant_owner: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setIsLoading(true);

        // Validation de base
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            setError('Veuillez remplir tous les champs obligatoires');
            setIsLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Le mot de passe doit contenir au moins 6 caractères');
            setIsLoading(false);
            return;
        }

        try {
            const result = await apiService.register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                is_restaurant_owner: formData.is_restaurant_owner
            });

            if (result.success) {
                setSuccess('Compte créé avec succès! Connexion en cours...');
                
                // Attendre un peu avant de rediriger pour montrer le message de succès
                setTimeout(async () => {
                    try {
                        // Connexion automatique après l'inscription
                        const user = await apiService.login(formData.email, formData.password);
                        login(user);
                        navigate('/');
                    } catch (loginError) {
                        setError('Inscription réussie mais échec de la connexion automatique. Veuillez vous connecter manuellement.');
                        navigate('/login');
                    } finally {
                        setIsLoading(false);
                    }
                }, 1500);
            } else if (result.message) {
                setError(result.message);
                setIsLoading(false);
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'inscription');
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.imageSection}>
                    <div className={styles.imageContainer}>
                        <img
                            src={MainImage}
                            alt="Children playing"
                            className={styles.image}
                        />
                    </div>
                </div>

                <div className={styles.formSection}>
                    <h2 className={styles.title}>Créer un compte</h2>
                    {error && <div className={styles.error}>{error}</div>}
                    {success && <div className={styles.success}>{success}</div>}
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Prénom"
                                className={styles.input}
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Nom"
                                className={styles.input}
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className={styles.input}
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                type="password"
                                name="password"
                                placeholder="Mot de passe"
                                className={styles.input}
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirmer le mot de passe"
                                className={styles.input}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.checkboxGroup}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="is_restaurant_owner"
                                    checked={formData.is_restaurant_owner}
                                    onChange={handleChange}
                                />
                                Je suis propriétaire de restaurant
                            </label>
                        </div>

                        <button 
                            type="submit" 
                            className={styles.button} 
                            disabled={isLoading}
                        >
                            {isLoading ? 'Création en cours...' : 'Créer un compte'}
                        </button>
                    </form>

                    <div className={styles.divider}>
                        <span>OU</span>
                    </div>

                    <div className={styles.socialButtons}>
                        <button className={`${styles.socialButton} ${styles.googleButton}`}>
                            <GoogleIcon className={styles.socialIcon} />
                            <span>Google</span>
                        </button>
                        <button className={`${styles.socialButton} ${styles.facebookButton}`}>
                            <FacebookIcon className={styles.socialIcon} />
                            <span>Facebook</span>
                        </button>
                    </div>

                    <Link to="/login" className={styles.link}>
                        Vous avez déjà un compte ? Se connecter
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register; 