import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Login/login.jsx';
import Forgot from './Forgot/Forgot.jsx'; 
import Register from './Register/Register.jsx';
import Dashboard from './Dashboard/dashboard.jsx';
// Importar o componente de Clientes
import Clients from './Clients/clients.jsx';

// Wrapper para injetar a navegação no componente Login
const LoginScreen = () => {
  const navigate = useNavigate();
  return (
    <Login 
      onForgotPassword={() => navigate('/forgot')} 
      onRegister={() => navigate('/register')} 
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
  return <Register onLogin={() => navigate('/login')} />;
};

// Wrapper para o Dashboard
const DashboardScreen = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logout efetuado");
    navigate('/login');
  };
  return <Dashboard onLogout={handleLogout} />;
};

// Novo Wrapper para a tela de Clientes
const ClientsScreen = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logout efetuado");
    navigate('/login');
  };
  return <Clients onLogout={handleLogout} />;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Redireciona a raiz "/" para "/login" automaticamente */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Rotas de Autenticação */}
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/forgot" element={<ForgotScreen />} />
          <Route path="/register" element={<RegisterScreen />} />

          {/* Rota do Dashboard */}
          <Route path="/dashboard" element={<DashboardScreen />} />

          {/* Rota de Clientes */}
          <Route path="/clients" element={<ClientsScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;