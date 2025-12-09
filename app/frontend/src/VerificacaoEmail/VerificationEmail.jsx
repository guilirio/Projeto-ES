import React, { useState, useRef } from 'react';
import './VerificationEmail.css';
import logoTrio from '../assets/logo.svg';

const VerificationEmail = ({ onRegister, onBackToForgot, onCodeVerified }) => {
  const [codes, setCodes] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(0, 1);

    const newCodes = [...codes];
    newCodes[index] = digit;
    setCodes(newCodes);

    // avança automaticamente
    if (digit && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !codes[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const code = codes.join('');

    // --- VALIDAÇÃO ---
    const allFilled = codes.every((c) => c !== '');
    const onlyDigits = /^\d{6}$/.test(code);

    if (!allFilled || !onlyDigits) {
      alert("Por favor, preencha todos os 6 dígitos corretamente.");
      return;
    }

    console.log("Código digitado:", code);

    if (onCodeVerified) {
      onCodeVerified(code);
    }
  };

  const handleResend = () => {
    console.log("Reenviar código...");
    alert("Código reenviado com sucesso!");
  };

  return (
    <div className="main-wrapper">
      <div className="orange-strip"></div>

      <div className="content-area">
        <div className="auth-card">
          <header className="card-header">
            <button 
              type="button"
              className="btn-create-account"
              onClick={onRegister}
            >
              Criar Conta
            </button>
          </header>

          <main className="card-body">
            <div className="logo-section">
              <img src={logoTrio} alt="Trio Bit Garage" className="card-logo" />
            </div>

            <div className="text-section">
              <span className="subtitle">Recuperação de senha</span>
              <h1 className="title">Verificação de email</h1>
              <p className="description">
                Insira o código de 6 dígitos que enviamos para o seu e-mail.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="code-inputs">
                {codes.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    className="code-input"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => (inputsRef.current[index] = el)}
                  />
                ))}
              </div>

              <div className="resend-wrapper">
                Não recebeu o código?
                <button
                  type="button"
                  className="resend-button"
                  onClick={handleResend}
                >
                  Reenviar
                </button>
              </div>

              <button type="submit" className="btn-submit">
                Confirmar código
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default VerificationEmail;
