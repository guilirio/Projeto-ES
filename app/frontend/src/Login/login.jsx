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

  // --- Função de Login Atualizada ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Ativa o loading

    try {
      // Monta o objeto JSON como o backend espera
      const payload = {
        email: formData.email,
        senha: formData.password
      };

      // Faz a requisição POST
      const response = await fetch('http://localhost:3333/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      // Verifica a resposta
      if (response.ok) {
        // Se o status for 200/201, o login foi aprovado
        // Se o backend retornar algum dado (token, user id), você pode pegar aqui:
        // const data = await response.json(); 
        
        // Chama a função de sucesso para redirecionar
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        // Se a senha ou email estiverem errados (Status 400, 401, etc)
        const errorData = await response.json();
        alert(errorData.error || "Email ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Erro de conexão com o servidor. Verifique se o backend está rodando.");
    } finally {
      setIsLoading(false); // Desativa o loading independentemente do resultado
    }
  };

  return (
    <div className="main-wrapper">
      <div className="orange-strip"></div>

      <div className="content-area">
        <div className="login-card">
          
          <header className="card-header">
            <button 
              type="button" 
              className="btn-create-account"
              onClick={onRegister} 
            >
              Criar Conta
            </button>
          </header>

          <main className="login-card-body">
            
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
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                <a 
                  href="#" 
                  className="forgot-password"
                  onClick={(e) => {
                    e.preventDefault();
                    onForgotPassword();
                  }}
                >
                  Eu esqueci minha senha
                </a>
              </div>

              <button 
                type="submit" 
                className="btn-submit" 
                disabled={isLoading} // Desabilita se estiver carregando
                style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'wait' : 'pointer' }}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Login;
