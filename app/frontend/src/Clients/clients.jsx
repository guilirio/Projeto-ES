import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './clients.css';
import logoTrio from '../assets/logo.svg';

// Ícones (Mesmos do Dashboard para manter consistência)
const IconDashboard = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const IconClients = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconCar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 16H9m10 0h3v-3.15M7 16H4v-3.15M21 9l-2-6H5L3 9h18z"></path><rect x="3" y="9" width="18" height="9" rx="2"></rect><circle cx="7" cy="14" r="2"></circle><circle cx="17" cy="14" r="2"></circle></svg>;
const IconPayment = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>;
const IconCarRental = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path></svg>;

const Clients = ({ onLogout }) => {
  const navigate = useNavigate();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [activeMenuRow, setActiveMenuRow] = useState(null);
  
  // Estado para alternar entre Lista e Formulário de Criação
  const [isCreating, setIsCreating] = useState(false);

  // Estado do Formulário
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    endereco: ''
  });

  // Dados Mockados
  const clientsData = [
    { id: '01', nome: 'Maria Silva', telefone: '(99) 99999-9999', cpf: '12345678901', email: 'maria@hotmail.com' },
    { id: '02', nome: 'João Santos', telefone: '(99) 99999-9999', cpf: '12345678901', email: 'joao@outlook.com' },
    { id: '03', nome: 'Ana Costa', telefone: '(99) 99999-9999', cpf: '12345678901', email: 'ana@hotmail.com' },
    { id: '04', nome: 'Pedro Rocha', telefone: '(99) 99999-9999', cpf: '12345678901', email: 'pedro@outlook.com' },
    { id: '05', nome: 'Lucas Lima', telefone: '(99) 99999-9999', cpf: '12345678901', email: 'lucas@a.com' },
    { id: '06', nome: 'Carla Dias', telefone: '(99) 99999-9999', cpf: '12345678901', email: 'carla@a.com' },
    { id: '07', nome: 'Paulo Vieira', telefone: '(99) 99999-9999', cpf: '12345678901', email: 'paulo@a.com' },
  ];

  const toggleRowMenu = (id) => {
    setActiveMenuRow(activeMenuRow === id ? null : id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Salvando cliente:", formData);
    // Lógica de backend viria aqui
    
    // Resetar e voltar para lista
    setIsCreating(false);
    setFormData({ nome: '', cpf: '', email: '', telefone: '', endereco: '' });
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Fixa */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logoTrio} alt="Trio Bit Garage" />
        </div>
        <nav className="sidebar-menu">
          <div className="menu-item" onClick={() => navigate('/dashboard')}>
            <IconDashboard />
            <span>Dashboard</span>
          </div>
          <div className="menu-label">MENU</div>
          <div className="menu-item active">
            <IconClients />
            <span>Clientes</span>
          </div>
          <div className="menu-item" onClick={() => navigate('/locacoes')}>
            <IconCarRental />
            <span>Locação de Carros</span>
          </div>
          <div className="menu-item" onClick={() => navigate('/veiculos')}>
            <IconCar />
            <span>Veículos</span>
          </div>
          <div className="menu-item" onClick={() => navigate('/pagamentos')}>
            <IconPayment />
            <span>Pagamentos</span>
          </div>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <main className="main-content">
        <header className="top-header">
          <div className="header-welcome">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#333' }}>
                {isCreating ? 'Cadastro de Cliente' : 'Todos os clientes'}
              </h2>
            </div>
            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
              {isCreating 
                ? 'Preencha os dados abaixo para cadastrar um novo cliente' 
                : 'Visualizar, pesquisar e adicionar novos clientes'}
            </p>
          </div>

          <div className="header-actions">
            <button className="btn-icon notification">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            </button>
            <div className="user-profile" onClick={() => setShowUserDropdown(!showUserDropdown)}>
              <div className="avatar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <div className="user-info">
                <span className="user-name">Luke S.</span>
                <span className="user-role">RH</span>
              </div>
              <svg className={`chevron ${showUserDropdown ? 'rotate' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              {showUserDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-item">Perfil</div>
                  <div className="dropdown-item logout" onClick={onLogout}>Sair</div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* --- RENDERIZAÇÃO CONDICIONAL --- */}
        {isCreating ? (
          /* --- FORMULÁRIO DE CADASTRO --- */
          <div className="client-form-container">
            <form className="client-form" onSubmit={handleSave}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nome">Nome Completo</label>
                  <input 
                    type="text" id="nome" name="nome" 
                    placeholder="Ex: Maria Silva" 
                    value={formData.nome} onChange={handleInputChange} required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cpf">CPF</label>
                  <input 
                    type="text" id="cpf" name="cpf" 
                    placeholder="000.000.000-00" 
                    value={formData.cpf} onChange={handleInputChange} required 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" id="email" name="email" 
                    placeholder="exemplo@email.com" 
                    value={formData.email} onChange={handleInputChange} required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telefone">Telefone</label>
                  <input 
                    type="tel" id="telefone" name="telefone" 
                    placeholder="(00) 00000-0000" 
                    value={formData.telefone} onChange={handleInputChange} required 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="endereco">Endereço</label>
                  <input 
                    type="text" id="endereco" name="endereco" 
                    placeholder="Rua, Número, Bairro, Cidade - UF" 
                    value={formData.endereco} onChange={handleInputChange} 
                  />
                </div>
              </div>

              <div className="form-actions-bottom">
                <button type="button" className="btn-cancel" onClick={() => setIsCreating(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-save">
                  Salvar Cliente
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* --- LISTA DE CLIENTES --- */
          <>
            <div className="clients-filters-card">
              <div className="filter-item search-box">
                <label>Pesquisa rápida de um cliente</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Digite o nome de pesquisa" />
                  <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
              </div>

              <div className="filter-item total-counter">
                <h3>250</h3>
                <span>Total de clientes</span>
              </div>

              <div className="filter-item dropdown-filter">
                <label>Filtrar cliente</label>
                <select>
                  <option>Todos</option>
                  <option>Ativos</option>
                  <option>Inativos</option>
                </select>
              </div>

              <button className="btn-new-client" onClick={() => setIsCreating(true)}>
                Cadastrar Novo
              </button>
            </div>

            <div className="clients-table-container">
              <div className="table-header">
                <h3>Todos os clientes</h3>
                <div className="pagination-info">Mostrando <span className="highlight">07</span> por página</div>
              </div>
              
              <table className="clients-table">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>CPF</th>
                    <th>Email</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {clientsData.map((client) => (
                    <tr key={client.id}>
                      <td>{client.id}</td>
                      <td>{client.nome}</td>
                      <td>{client.telefone}</td>
                      <td>{client.cpf}</td>
                      <td>{client.email}</td>
                      <td className="action-cell">
                        <span className="link-ver-mais" onClick={() => toggleRowMenu(client.id)}>Ver mais</span>
                        {activeMenuRow === client.id && (
                          <div className="action-menu-popover">
                            <div className="popover-item">Visualizar</div>
                            <div className="popover-item">Editar</div>
                            <div className="popover-item">Excluir</div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination-controls">
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <button className="page-btn">4</button>
              <button className="page-btn">5</button>
              <button className="page-btn">{">>"}</button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Clients;