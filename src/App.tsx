import React from 'react';
import './Global.css';
import Navbar from './components/navbar/navbar';
import AppRouter from './routes/Router';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="pt-20">
        <Navbar />
        <AppRouter />
      </div>
    </AuthProvider>
  );
}

export default App;