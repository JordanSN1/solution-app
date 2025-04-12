import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Implémentez la logique d'inscription ici
        console.log(formData);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.imageSection}>
                    <div className={styles.imageContainer}>
                        <img
                            src="/images/auth-image.jpg"
                            alt="Children playing"
                            className={styles.image}
                        />
                    </div>
                </div>

                <div className={styles.formSection}>
                    <h2 className={styles.title}>Créer un compte</h2>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                name="nom"
                                placeholder="Nom"
                                className={styles.input}
                                value={formData.nom}
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

                        <button type="submit" className={styles.button}>
                            Créer un compte
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