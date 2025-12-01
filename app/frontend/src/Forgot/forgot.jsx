import React, { useState } from 'react';
import './forgot.css';

// Importando a logo do mesmo local
import logoTrio from '../assets/logo.svg';

// Recebendo as props de navegação
const Forgot = ({ onRegister, onBackToLogin, onCodeSent }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Solicitar recuperação para:', email);

    // Aqui você chama a próxima tela
    if (onCodeSent) {
      onCodeSent(); // navega para VerificationEmail
    }
  };


  return (
    <div className="main-wrapper">
      {/* Barra laranja superior decorativa */}
      <div className="orange-strip"></div>

      <div className="content-area">
        <div className="auth-card">
          
          {/* Header do Card com Botão Criar Conta */}
          <header className="card-header">
            <button 
              type="button" 
              className="btn-create-account"
              onClick={onRegister} // Adicionado evento de clique para navegação
            >
              Criar Conta
            </button>
          </header>

          <main className="card-body">
            
            {/* Logo Centralizada */}
            <div className="logo-section">
              <img src={logoTrio} alt="Trio Bit Garage" className="card-logo" />
            </div>

            {/* Textos de Cabeçalho */}
            <div className="text-section">
              <span className="subtitle">Recuperação de senha</span>
              <h1 className="title">Esqueceu sua senha?</h1>
              <p className="description">
                Insira o endereço de e-mail vinculado a esta conta e lhe enviaremos um código para que você possa alterar sua senha.
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="input-group">
                <label htmlFor="email">Endereço de email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Entre com seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-submit">
                Enviar
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Forgot;