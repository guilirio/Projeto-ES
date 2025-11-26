import React, { useState } from 'react';
import './register.css';
import logoTrio from '../assets/logo.svg'; // Ajuste o caminho conforme sua estrutura

const Register = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    console.log('Dados de registro:', formData);
    // Lógica de cadastro aqui
  };

  return (
    <div className="main-wrapper">
      {/* Barra laranja superior */}
      <div className="orange-strip"></div>

      <div className="content-area">
        <div className="register-card">
          
          {/* Header do Card com botão para voltar ao Login */}
          <header className="card-header">
            <span className="header-label">Já tem uma conta?</span>
            <button type="button" className="btn-header-action" onClick={onLogin}>
              Entrar
            </button>
          </header>

          <main className="card-body">
            {/* Logo */}
            <div className="logo-section">
              <img src={logoTrio} alt="Trio Bit Garage" className="card-logo" />
            </div>

            <div className="text-section">
              <span className="subtitle">Bem vindo ao Trio Bit Garage</span>
              <h1 className="title">Crie sua conta</h1>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {/* Campo Nome */}
              <div className="input-group">
                <label htmlFor="name">Nome completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Campo Email */}
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Campo Senha */}
              <div className="input-group">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Campo Confirmar Senha */}
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirmar senha</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="btn-submit">
                Cadastrar
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Register;