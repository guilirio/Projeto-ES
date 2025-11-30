import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Login/login.jsx';
import Forgot from './Forgot/Forgot.jsx'; 
import Register from './Register/Register.jsx';
import Dashboard from './Dashboard/dashboard.jsx';
import Clients from './Clients/clients.jsx';
// Importação do componente de Veículo (Certifique-se que o arquivo criado está nesta pasta)
import Veiculo from './Veiculo/veiculo.jsx'; 

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
  // Adicione a prop onNavigate para o Dashboard redirecionar
  return <Dashboard onLogout={handleLogout} onNavigate={navigate} />;
};

// Wrapper para a tela de Clientes
const ClientsScreen = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logout efetuado");
    navigate('/login');
  };
  return <Clients onLogout={handleLogout} />;
};

// Wrapper simplificado para a tela de Veículos
const VeiculoScreen = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logout efetuado");
    navigate('/login');
  };
  return <Veiculo onLogout={handleLogout} />;
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

          {/* Rotas Protegidas (Dashboard e Funcionalidades) */}
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/clients" element={<ClientsScreen />} />
          
          {/* Rota Única para Veículos */}
          <Route path="/veiculos" element={<VeiculoScreen />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;