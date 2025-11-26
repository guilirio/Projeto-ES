import React, { useState } from 'react';
import './login.css';

// IMPORTANTE: O React não lê caminhos como "C:\Users...".
// Use o caminho relativo a partir de onde este arquivo (login.jsx) está salvo.
// Exemplo: Se login.jsx está em 'src/pages', e a logo em 'src/assets', use '../assets/logo.svg'
import logoTrio from '../assets/logo.svg'; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do login:', formData);
    // Lógica de autenticação
  };

  return (
    <div className="main-wrapper">
      {/* Barra laranja superior (apenas estético) */}
      <div className="orange-strip"></div>

      <div className="content-area">
        <div className="login-card">
          
          {/* Header do Card com Botão Criar Conta */}
          <header className="card-header">
            <button type="button" className="btn-create-account">
              Criar Conta
            </button>
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

            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Entre com endereço de email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Senha</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={togglePasswordVisibility}
                    aria-label="Mostrar ou ocultar senha"
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M1 1l22 22"></path>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="form-actions">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  Lembrar
                </label>
                <a href="#forgot-password" className="forgot-password">
                  Eu esqueci minha senha
                </a>
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