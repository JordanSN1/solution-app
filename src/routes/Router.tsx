import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import { useAuth } from '../context/AuthContext';

const AppRouter: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Router>
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
                    path="/"
                    element={isAuthenticated ? <div>Page d'accueil</div> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
};

export default AppRouter;
