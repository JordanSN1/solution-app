import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { useAuth } from '../../context/AuthContext';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import MainImage from '../../assets/images/MainImage.png';
import { apiService } from '../../services/apiService';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        
        try {
            const user = await apiService.login(email, password);
            login(user);
            navigate('/');
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Échec de la connexion');
        } finally {
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
                    <h2 className={styles.title}>Connexion</h2>
                    {error && <div className={styles.error}>{error}</div>}
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <input
                                type="email"
                                placeholder="Email"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                type="password"
                                placeholder="Mot de passe"
                                className={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className={styles.button}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
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

                    <Link to="/register" className={styles.link}>
                        Vous n'avez pas de compte ? Créer un compte
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;