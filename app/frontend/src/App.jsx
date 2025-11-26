import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Login/login.jsx';
// Certifique-se de que o caminho abaixo corresponde onde você salvou o arquivo Forgot.jsx
import Forgot from './Forgot/Forgot.jsx'; 
// Importando o novo componente de Registro
import Register from './Register/Register.jsx';

import Dashboard from './Dashboard/dashboard.jsx';

// Wrapper para injetar a navegação no componente Login
const LoginScreen = () => {
  const navigate = useNavigate();
  return (
    <Login 
      onForgotPassword={() => navigate('/forgot')} 
      onRegister={() => navigate('/register')} 
      // Adicionei esta prop para você conectar no botão "Entrar" do Login.jsx se desejar
      onLoginSuccess={() => navigate('/dashboard')}
    />
  );
};

// Wrapper para injetar a navegação no componente Forgot
const ForgotScreen = () => {
  const navigate = useNavigate();
  return (
    <Forgot 
      onBackToLogin={() => navigate('/login')} 
      onRegister={() => navigate('/register')} 
    />
  );
};

// Wrapper para injetar a navegação no componente Register
const RegisterScreen = () => {
  const navigate = useNavigate();
  // Alterado para navegar para /login ao clicar em "Entrar"
  return <Register onLogin={() => navigate('/login')} />;
};

// Wrapper para o Dashboard para lidar com o Logout
const DashboardScreen = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Aqui você pode limpar tokens ou estados de sessão
    console.log("Logout efetuado");
    navigate('/login');
  };

  return <Dashboard onLogout={handleLogout} />;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Redireciona a raiz "/" para "/login" automaticamente */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Rota principal de Login definida como /login */}
          <Route path="/login" element={<LoginScreen />} />
          
          {/* Rota de recuperação de senha */}
          <Route path="/forgot" element={<ForgotScreen />} />

          {/* Rota de Cadastro */}
          <Route path="/register" element={<RegisterScreen />} />

          {/* Rota do Dashboard CORRIGIDA */}
          <Route path="/dashboard" element={<DashboardScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;