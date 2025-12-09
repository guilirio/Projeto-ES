import React, { useState } from "react";
import "./RedefineSenha.css";
import logoTrio from "../assets/logo.svg";

const RedefineSenha = ({ onBackToLogin }) => {
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    console.log("Nova senha definida:", senha);

    alert("Senha redefinida com sucesso!");

    // volta para a tela anterior (login ou onde você configurou)
    onBackToLogin();
  };

  return (
    <div className="main-wrapper">
      <div className="orange-strip"></div>

      <div className="content-area">
        <div className="auth-card">
          <main className="card-body">

            <div className="logo-section">
              <img src={logoTrio} alt="Trio Bit Garage" className="card-logo" />
            </div>

            <div className="text-section">
              <span className="subtitle">Redefinição de senha</span>
              <h1 className="title">Defina sua nova senha</h1>
              <p className="description">
                Insira sua nova senha e confirme para atualizar o acesso à sua conta.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">

              <div className="input-group">
                <label htmlFor="senha">Nova senha</label>
                <input
                  type="password"
                  id="senha"
                  placeholder="Digite a nova senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="confirmarSenha">Confirmar senha</label>
                <input
                  type="password"
                  id="confirmarSenha"
                  placeholder="Confirme sua nova senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-submit">
                Redefinir Senha
              </button>
            </form>

          </main>
        </div>
      </div>
    </div>
  );
};

export default RedefineSenha;
