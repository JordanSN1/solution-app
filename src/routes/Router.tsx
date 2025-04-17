import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Navbar from '../components/layout/Navbar';
import  Restaurant from '../components/pages/Restaurants'
import { useAuth } from '../context/AuthContext';

// Route protégée qui nécessite que l'utilisateur soit connecté
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    return isAuthenticated ? <>{element}</> : <Navigate to="/login" />;
};

// Composant temporaire pour la page d'accueil
const Home: React.FC = () => (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Bienvenue sur l'application Solution</h1>
        <p>Cette application vise à aider à la gestion des restaurants et à faciliter les dons caritatifs.</p>
    </div>
);

// Composant temporaire pour la page des restaurants
const Restaurants: React.FC = () => (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Découvrez nos restaurants partenaires</h1>
        <p>Liste des restaurants disponible prochainement...</p>
    </div>
);

const AppRouter: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route
                    path="/login"
                    element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
                />
                <Route
                    path="/register"
                    element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
                />
                <Route
                    path="/Restaurants"
                    element={!isAuthenticated ? <Restaurant /> : <Navigate to="/" />}
                />

                <Route
                    path="/"
                    element={<Home />}
                />
            </Routes>
        </Router>
    );
};

export default AppRouter;
