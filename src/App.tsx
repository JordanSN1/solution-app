import React from 'react';
import './Global.css';
import AppRouter from './routes/Router';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
