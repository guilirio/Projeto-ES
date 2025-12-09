import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './clients.css';
import logoTrio from '../assets/logo.svg';

// Ícones (Mantinham-se os mesmos)
const IconDashboard = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const IconClients = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconCar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 16H9m10 0h3v-3.15M7 16H4v-3.15M21 9l-2-6H5L3 9h18z"></path><rect x="3" y="9" width="18" height="9" rx="2"></rect><circle cx="7" cy="14" r="2"></circle><circle cx="17" cy="14" r="2"></circle></svg>;
const IconPayment = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>;
const IconCarRental = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path></svg>;

const Clients = ({ onLogout }) => {
  const navigate = useNavigate();
  
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [activeMenuRow, setActiveMenuRow] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null); // NOVO: Controle de edição

  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const initialFormState = {
    nome: '',
    cpf: '',
    cnh: '',
    email: '',
    telefone: '',
    senha: '123',
    perfil: 'CLIENTE'
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3333/usuarios');
      const data = await response.json();
      const apenasClientes = data.filter(user => user.perfil === 'CLIENTE');
      setClientes(apenasClientes);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Resetar Formulário ---
  const resetForm = () => {
    setFormData(initialFormState);
    setIsCreating(false);
    setEditingId(null);
    setActiveMenuRow(null);
  };

  // --- Preparar Edição ---
  const handleEdit = (cliente) => {
    setFormData({
      nome: cliente.nome,
      cpf: cliente.cpf,
      cnh: cliente.cnh,
      email: cliente.email,
      telefone: cliente.telefone || '',
      senha: cliente.senha || '', // Backend não retorna senha, manter vazio ou tratar se necessário
      perfil: 'CLIENTE'
    });
    setEditingId(cliente.id);
    setIsCreating(true);
    setActiveMenuRow(null);
  };

  // --- Salvar (Criar ou Editar) ---
  const handleSave = async (e) => {
    e.preventDefault();
    
    // Define URL e Método baseado se é edição ou criação
    const url = editingId 
      ? `http://localhost:3333/usuarios/${editingId}` 
      : 'http://localhost:3333/usuarios';
    
    const method = editingId ? 'PUT' : 'POST';

    // Remove a senha do payload se for edição e estiver vazia (para não sobrescrever)
    const payload = { ...formData };
    if (editingId && !payload.senha) delete payload.senha;

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert(editingId ? 'Cliente atualizado com sucesso!' : 'Cliente cadastrado com sucesso!');
        resetForm();
        fetchClientes();
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro de conexão ao salvar cliente.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este cliente?")) return;
    try {
      const response = await fetch(`http://localhost:3333/usuarios/${id}`, { method: 'DELETE' });
      if (response.ok) {
        alert("Cliente excluído com sucesso!");
        fetchClientes();
      } else {
        const errorData = await response.json();
        alert(`Erro ao excluir: ${errorData.error}`);
      }
    } catch (error) {
      alert("Erro de conexão.");
    }
    setActiveMenuRow(null);
  };

  const filteredClients = clientes.filter((c) =>
    (c.nome || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.cpf || '').includes(searchTerm)
  );

  const toggleRowMenu = (id) => setActiveMenuRow(activeMenuRow === id ? null : id);
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-logo">{logoTrio ? <img src={logoTrio} alt="Trio Bit" /> : <h3>Trio Bit</h3>}</div>
        <nav className="sidebar-menu">
           {/* Menu Items iguais ao original... */}
           <div className="menu-item" onClick={() => navigate('/dashboard')}><IconDashboard /><span>Dashboard</span></div>
           <div className="menu-label">MENU</div>
           <div className="menu-item active"><IconClients /><span>Clientes</span></div>
           <div className="menu-item" onClick={() => navigate('/locacoes')}><IconCarRental /><span>Locação de Carros</span></div>
           <div className="menu-item" onClick={() => navigate('/veiculos')}><IconCar /><span>Veículos</span></div>
           <div className="menu-item" onClick={() => navigate('/pagamentos')}><IconPayment /><span>Pagamentos</span></div>
        </nav>
      </aside>

      <main className="main-content">
        <header className="top-header">
            {/* Header igual ao original */}
            <div className="header-welcome">
              <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#333' }}>
                {isCreating ? (editingId ? 'Editar Cliente' : 'Cadastro de Cliente') : 'Todos os clientes'}
              </h2>
            </div>
            <div className="header-actions">
            <div className="user-profile" onClick={() => setShowUserDropdown(!showUserDropdown)}>
              <div className="avatar"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>
              <div className="user-info"><span className="user-name">Luke S.</span><span className="user-role">Admin</span></div>
              {showUserDropdown && (<div className="dropdown-menu"><div className="dropdown-item logout" onClick={onLogout}>Sair</div></div>)}
            </div>
          </div>
        </header>

        {isCreating ? (
          <div className="client-form-container">
            <div 
                style={{ display: 'flex', alignItems: 'center', color: '#FF914D', cursor: 'pointer', marginBottom: '20px', fontWeight: 500 }}
                onClick={resetForm}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '5px'}}><polyline points="15 18 9 12 15 6"></polyline></svg>
                Voltar
            </div>

            <form className="client-form" onSubmit={handleSave}>
              <div className="form-row">
                <div className="form-group">
                  <label>Nome Completo</label>
                  <input name="nome" value={formData.nome} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>CPF</label>
                  <input name="cpf" value={formData.cpf} onChange={handleInputChange} required maxLength="14"/>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>CNH</label>
                  <input name="cnh" value={formData.cnh} onChange={handleInputChange} required maxLength="11"/>
                </div>
                <div className="form-group">
                  <label>Telefone</label>
                  <input name="telefone" value={formData.telefone} onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
              </div>
              
              <div className="form-actions-bottom">
                <button type="submit" className="btn-save">
                  {editingId ? 'Salvar Alterações' : 'Salvar Cliente'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="clients-filters-card">
              <div className="filter-item search-box">
                <label>Pesquisa rápida</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Digite nome ou CPF" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
              </div>
              <div className="filter-item total-counter">
                <h3>{clientes.length}</h3>
                <span>Total de clientes</span>
              </div>
              <button className="btn-new-client" onClick={() => setIsCreating(true)}>Cadastrar Novo</button>
            </div>

            <div className="clients-table-container">
              <table className="clients-table">
                <thead><tr><th>S/N</th><th>Nome</th><th>CPF</th><th>CNH</th><th>Email</th><th>Ação</th></tr></thead>
                <tbody>
                  {loading ? (<tr><td colSpan="6" style={{textAlign: 'center'}}>Carregando...</td></tr>) : 
                  filteredClients.map((client, index) => (
                    <tr key={client.id}>
                      <td>{String(index + 1).padStart(2, '0')}</td>
                      <td>{client.nome}</td>
                      <td>{client.cpf}</td>
                      <td>{client.cnh}</td>
                      <td>{client.email}</td>
                      <td className="action-cell">
                        <span className="link-ver-mais" onClick={() => toggleRowMenu(client.id)}>Ver mais</span>
                        {activeMenuRow === client.id && (
                          <div className="action-menu-popover">
                            {/* NOVO: Botão Editar */}
                            <div className="popover-item" onClick={() => handleEdit(client)}>Editar</div>
                            <div className="popover-item" onClick={() => handleDelete(client.id)} style={{color: 'red'}}>Excluir</div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
};
export default Clients;