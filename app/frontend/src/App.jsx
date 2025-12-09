import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Login/login.jsx';
import Forgot from './Forgot/forgot.jsx';
import VerificationEmail from './VerificacaoEmail/VerificationEmail.jsx';
import RedefineSenha from './RedefineSenha/RedefineSenha.jsx';
import Register from './Register/register.jsx';
import Dashboard from './Dashboard/dashboard.jsx';
import Clients from './Clients/clients.jsx';
// Importação do componente de Veículo
import Veiculo from './Veiculo/veiculo.jsx'; 
// --- NOVO: Importação do componente de Locação ---
import Locacao from './Locacao/locacao.jsx'; 
import Pagamento from './Pagamento/pagamento.jsx';

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
      onCodeSent={() => navigate('/verify')}
    />
  );
};


// Wrapper para injetar a navegação no componente verificationEmail
const VerificationEmailScreen = () => {
  const navigate = useNavigate();

  return (
    <VerificationEmail
      onRegister={() => navigate("/register")}
      onBackToForgot={() => navigate("/forgot")}
      onCodeVerified={() => navigate("/reset")}
    />
  );
};

// Wrapper para injetar a navegação no componente RedefineSenha
const RedefineSenhaScreen = () => {
  const navigate = useNavigate();
  return (
    <RedefineSenha
      onBackToLogin={() => navigate('/login')}
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

// --- NOVO: Wrapper para a tela de Locações ---
const LocacaoScreen = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logout efetuado");
    navigate('/login');
  };
  return <Locacao onLogout={handleLogout} />;
};

const PagamentoScreen = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logout efetuado");
    navigate('/login');
  };
  return <Pagamento onLogout={handleLogout} />;
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
          <Route path="/verify" element={<VerificationEmailScreen />} />
          <Route path="/reset" element={<RedefineSenhaScreen />} />
          <Route path="/register" element={<RegisterScreen />} />

          {/* Rotas Protegidas (Dashboard e Funcionalidades) */}
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/clients" element={<ClientsScreen />} />
          
          {/* Rota Única para Veículos */}
          <Route path="/veiculos" element={<VeiculoScreen />} />

          {/* --- NOVA ROTA: Locação de Veículos --- */}
          <Route path="/locacoes" element={<LocacaoScreen />} />
          {/* Rota para Pagamentos */}
          <Route path="/pagamentos" element={<PagamentoScreen />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;