import React, { useState } from 'react';
import './login.css';
import logoTrio from '../assets/logo.svg'; 

const Login = ({ onForgotPassword, onRegister, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [errorMsg, setErrorMsg] = useState('');

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do login:', formData);
    
    // Simulação de autenticação bem-sucedida
    // Aqui você validaria o usuário/senha com seu backend
    
    // Se sucesso, chama a função de navegação para o Dashboard:
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <div className="main-wrapper">
      <div className="orange-strip"></div>
      <div className="content-area">
        <div className="login-card">
          
          {/* Header do Card com Botão Criar Conta */}
          <header className="card-header">
            <button type="button" className="btn-create-account" onClick={onRegister}>Criar Conta</button>
          </header>

          <main className="login-card-body">
            
            {/* LOGO AGORA AQUI - Centralizada acima do título */}
            <div className="logo-section">
              <img src={logoTrio} alt="Trio Bit Garage" className="card-logo" />
            </div>

            <div className="welcome-text">
              <span className="welcome-sub">Bem vindo ao Trio Bit Garage</span>
              <h1 className="login-title">Faça o login</h1>
            </div>

            {errorMsg && <div style={{color: 'red', textAlign: 'center', marginBottom: '15px'}}>{errorMsg}</div>}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Entre com endereço de email" value={formData.email} onChange={handleInputChange} required />
              </div>

              <div className="input-group">
                <label htmlFor="password">Senha</label>
                <div className="password-wrapper">
                  <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="••••••••••••" value={formData.password} onChange={handleInputChange} required />
                  <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                    {/* SVG do olho... */}
                    {showPassword ? "👁️" : "🙈"}
                  </button>
                </div>
              </div>

              <div className="form-actions">
                <label className="checkbox-container">
                  <input type="checkbox" name="remember" checked={formData.remember} onChange={handleInputChange} />
                  <span className="checkmark"></span> Lembrar
                </label>
                <a href="#" className="forgot-password" onClick={(e) => {e.preventDefault(); onForgotPassword();}}>Eu esqueci minha senha</a>
              </div>

              <button type="submit" className="btn-submit">
                Entrar
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Login;
