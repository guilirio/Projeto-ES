import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import logoTrio from '../assets/logo.svg';

// Ícones SVG simples
const IconDashboard = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const IconClients = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconCar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 16H9m10 0h3v-3.15M7 16H4v-3.15M21 9l-2-6H5L3 9h18z"></path><rect x="3" y="9" width="18" height="9" rx="2"></rect><circle cx="7" cy="14" r="2"></circle><circle cx="17" cy="14" r="2"></circle></svg>;
const IconPayment = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>;
const IconCarRental = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path></svg>;

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="dashboard-container">
      {/* --- Sidebar Fixa --- */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logoTrio} alt="Trio Bit Garage" />
        </div>

        <nav className="sidebar-menu">
          <div className="menu-item active">
            <IconDashboard />
            <span>Dashboard</span>
          </div>

          <div className="menu-label">MENU</div>
          
          {/* Navegação adicionada: Redireciona para /clients */}
          <div className="menu-item" onClick={() => navigate('/clients')}>
            <IconClients />
            <span>Clientes</span>
          </div>
          <div className="menu-item">
            <IconCarRental />
            <span>Locação de Carros</span>
          </div>
          <div className="menu-item">
            <IconCar />
            <span>Veículos</span>
          </div>
          <div className="menu-item">
            <IconPayment />
            <span>Pagamentos</span>
          </div>
        </nav>
      </aside>

      {/* --- Conteúdo Principal --- */}
      <main className="main-content">
        {/* Header */}
        <header className="top-header">
          <div className="header-welcome">
            <h2>Bem-vindo, Sr. Luke Skywalker</h2>
            <p>Hoje é quarta-feira, 19 de novembro de 2025.</p>
          </div>

          <div className="header-actions">
            <button className="btn-icon notification">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            </button>
            
            <div className="user-profile" onClick={() => setShowDropdown(!showDropdown)}>
              <div className="avatar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <div className="user-info">
                <span className="user-name">Luke S.</span>
                <span className="user-role">RH</span>
              </div>
              <svg className={`chevron ${showDropdown ? 'rotate' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>

              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    Perfil
                  </div>
                  <div className="dropdown-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                    Configurações
                  </div>
                  <div className="dropdown-item logout" onClick={onLogout}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    Sair
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Grid do Dashboard */}
        <div className="dashboard-grid">
          
          {/* Cards de Status */}
          <div className="card stat-card" style={{ gridColumn: "span 2" }}>
            <div className="stat-info">
              <h3>210</h3>
              <span className="stat-label">Total de clientes</span>
              <span className="stat-trend negative">↓ 0,2% abaixo do último mês</span>
            </div>
            <div className="stat-icon blue-bg">📄</div>
          </div>

          <div className="card stat-card" style={{ gridColumn: "span 2" }}>
            <div className="stat-info">
              <h3>230</h3>
              <span className="stat-label">Total de locações no mês</span>
              <span className="stat-trend positive">↑ 2% a mais que no último mês</span>
            </div>
            <div className="stat-icon purple-bg">🚀</div>
          </div>

          {/* Tabelas Centrais */}
          <div className="card wide-card">
            <div className="card-header">
              <h3>Locações de Veículos</h3>
            </div>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>S/N</th><th>Carro</th><th>Vendedor</th><th>Cliente</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>01</td><td>Ford Fiesta 1</td><td>Fábio V.</td><td>Maria</td><td className="status-pending">Pendente</td></tr>
                <tr><td>02</td><td>Ford Fiesta 2</td><td>Anakin S.</td><td>Jota</td><td className="status-approved">Aprovado</td></tr>
                <tr><td>03</td><td>Ford Ka 5</td><td>Fábio V.</td><td>Carmém</td><td className="status-approved">Aprovado</td></tr>
                <tr><td>04</td><td>Ford ka 3</td><td>Anakin S.</td><td>Miranda</td><td className="status-approved">Aprovado</td></tr>
              </tbody>
            </table>
          </div>

          {/* Lista de Clientes */}
          <div className="card wide-card">
            <div className="card-header">
              <h3>Lista de Clientes</h3>
            </div>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Nome</th><th>Telefone</th><th>Email</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Maria Silva</td><td>(11) 99999-9999</td><td>maria@email.com</td><td className="status-approved">Ativo</td></tr>
                <tr><td>João Santos</td><td>(11) 88888-8888</td><td>joao@email.com</td><td className="status-pending">Pendente</td></tr>
                <tr><td>Carmém Lúcia</td><td>(11) 77777-7777</td><td>carmem@email.com</td><td className="status-approved">Ativo</td></tr>
                <tr><td>Miranda Souza</td><td>(21) 96666-6666</td><td>miranda@email.com</td><td className="status-approved">Ativo</td></tr>
              </tbody>
            </table>
          </div>

          {/* Rodapé: Comprovantes e Gráfico */}
          <div className="card wide-card">
            <div className="card-header">
              <h3>Comprovantes de pagamento</h3>
            </div>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>S/N</th><th>Assunto</th><th>Data</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>01</td><td>Solicitação de orçamento</td><td>25/01/2023</td><td className="status-pending">Pendente</td></tr>
                <tr><td>02</td><td>Solicitação de taxa</td><td>19/01/2023</td><td className="status-approved">Aprovado</td></tr>
                <tr><td>03</td><td>Solicitação de orçamento</td><td>10/01/2023</td><td className="status-approved">Aprovado</td></tr>
              </tbody>
            </table>
          </div>

          <div className="card chart-card">
            <div className="card-header">
              <h3>Devolução das Locações Mensais</h3>
            </div>
            <div className="chart-content">
              <div className="chart-legend">
                <h4>Total veículos alugados: 230</h4>
                <ul>
                  <li><span className="dot orange"></span> 36 Pendentes</li>
                  <li><span className="dot green"></span> 171 Concluídos</li>
                  <li><span className="dot red"></span> 23 Atrasados</li>
                </ul>
              </div>
              <div className="donut-chart">
                <div className="donut-hole"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;