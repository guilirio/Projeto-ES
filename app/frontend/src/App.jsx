import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './Login/login.jsx';
import Forgot from './Forgot/forgot.jsx'; 

// Wrapper para injetar a navegação no componente Login
const LoginScreen = () => {
  const navigate = useNavigate();
  return <Login onForgotPassword={() => navigate('/forgot')} />;
};

// Wrapper para injetar a navegação no componente Forgot
const ForgotScreen = () => {
  const navigate = useNavigate();
  return <Forgot onBackToLogin={() => navigate('/')} />;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Rota principal - Login */}
          <Route path="/" element={<LoginScreen />} />

          {/* Rota principal - Login */}
          <Route path="/login" element={<LoginScreen />} />
          
          {/* Rota de recuperação de senha */}
          <Route path="/forgot" element={<ForgotScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;