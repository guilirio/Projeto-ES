import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './veiculo.css';
import logoTrio from '../assets/logo.svg'; 

// Ícones SVG
const IconDashboard = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const IconClients = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconCar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 16H9m10 0h3v-3.15M7 16H4v-3.15M21 9l-2-6H5L3 9h18z"></path><rect x="3" y="9" width="18" height="9" rx="2"></rect><circle cx="7" cy="14" r="2"></circle><circle cx="17" cy="14" r="2"></circle></svg>;
const IconPayment = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>;
const IconCarRental = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path></svg>;

const Veiculo = ({ onLogout }) => {
  const navigate = useNavigate();
  
  // --- Estados de Controle Visual ---
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [activeMenuRow, setActiveMenuRow] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  
  // --- Estado para Edição (NOVO) ---
  const [editingId, setEditingId] = useState(null); 

  // --- Estados de Dados ---
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // --- Estado do Formulário ---
  const initialFormState = {
    modelo: '',
    quilometragem: '',
    marca: '',
    Categoria_id: '',
    placa: '',
    chassi: '',
    situacao: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  // Categorias (Mock)
  const categoriasOptions = [
    { id: 1, nome: 'Econômico' },
    { id: 2, nome: 'SUV' },
    { id: 3, nome: 'Luxo' },
    { id: 4, nome: 'Utilitário' }
  ];

  // --- Carregar Dados (GET) ---
  useEffect(() => {
    fetchVeiculos();
  }, []);

  const fetchVeiculos = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3333/veiculos');
      const data = await response.json();
      setVeiculos(data);
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Manipuladores de Eventos ---
  const toggleRowMenu = (id) => {
    setActiveMenuRow(activeMenuRow === id ? null : id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // --- Resetar Formulário ---
  const resetForm = () => {
    setFormData(initialFormState);
    setIsCreating(false);
    setEditingId(null);
    setActiveMenuRow(null);
  };

  // --- Preparar para Editar (NOVO) ---
  const handleEdit = (veiculo) => {
    setFormData({
      modelo: veiculo.modelo,
      quilometragem: veiculo.quilometragem,
      marca: veiculo.marca,
      // Se o backend retornar Categoria_id direto, usa ele. Se não, tenta pegar de Categoria.id
      Categoria_id: veiculo.Categoria_id || veiculo.Categoria?.id || '',
      placa: veiculo.placa,
      chassi: veiculo.chassi,
      situacao: veiculo.situacao
    });
    setEditingId(veiculo.id); // Marca qual ID estamos editando
    setIsCreating(true); // Abre o formulário
    setActiveMenuRow(null); // Fecha o menu flutuante
  };

  // --- Excluir Veículo (NOVO) ---
  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este veículo?")) return;

    try {
      const response = await fetch(`http://localhost:3333/veiculos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert("Veículo excluído com sucesso!");
        fetchVeiculos(); // Atualiza a lista
      } else {
        const errorData = await response.json();
        alert(`Erro ao excluir: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Erro ao excluir:", error);
      alert("Erro de conexão ao tentar excluir.");
    }
    setActiveMenuRow(null);
  };

  // --- Salvar (Criar ou Editar) ---
  const handleSave = async (e) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      quilometragem: parseInt(formData.quilometragem),
      Categoria_id: parseInt(formData.Categoria_id)
    };

    // Define se é POST (criar) ou PUT (editar)
    const url = editingId 
      ? `http://localhost:3333/veiculos/${editingId}`
      : 'http://localhost:3333/veiculos';
    
    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert(editingId ? 'Veículo atualizado com sucesso!' : 'Veículo cadastrado com sucesso!');
        resetForm();
        fetchVeiculos(); 
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro de conexão ao salvar veículo.');
    }
  };

  // --- Filtro Local ---
  const filteredVeiculos = veiculos.filter((v) =>
    (v.modelo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (v.placa || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (status) => {
    switch (status) {
      case 'DISPONIVEL': return 'status-disponivel';
      case 'ALUGADO': return 'status-alugado';
      case 'MANUTENCAO': return 'status-manutencao';
      default: return '';
    }
  };

  const formatStatus = (status) => {
    const map = { 'DISPONIVEL': 'Disponível', 'ALUGADO': 'Alugado', 'MANUTENCAO': 'Indisponível' };
    return map[status] || status;
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          {logoTrio ? <img src={logoTrio} alt="Trio Bit Garage" /> : <h3>Trio Bit</h3>}
        </div>
        <nav className="sidebar-menu">
          <div className="menu-item" onClick={() => navigate('/dashboard')}>
            <IconDashboard /><span>Dashboard</span>
          </div>
          <div className="menu-label">MENU</div>
          <div className="menu-item" onClick={() => navigate('/clients')}>
            <IconClients /><span>Clientes</span>
          </div>
          <div className="menu-item" onClick={() => navigate('/locacoes')}> 
            <IconCarRental /><span>Locação de Carros</span>
          </div>
          <div className="menu-item active" onClick={() => navigate('/veiculos')}> 
            <IconCar /><span>Veículos</span>
          </div>
          <div className="menu-item" onClick={() => navigate('/pagamentos')}>
            <IconPayment /><span>Pagamentos</span>
          </div>
        </nav>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <div className="header-welcome">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#333' }}>
                {isCreating ? (editingId ? 'Editar Veículo' : 'Novo Veículo') : 'Todos os veículos'}
              </h2>
            </div>
            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
              {isCreating ? 'Preencha os dados do veículo' : 'Visualizar, pesquisar e gerenciar frota'}
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
              <div className="user-info"><span className="user-name">Luke S.</span><span className="user-role">Admin</span></div>
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

        {isCreating ? (
          /* === FORMULÁRIO (Criação ou Edição) === */
          <div className="client-form-container">
            <div 
                style={{ display: 'flex', alignItems: 'center', color: '#FF914D', cursor: 'pointer', marginBottom: '20px', fontWeight: 500 }}
                onClick={resetForm}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '5px'}}><polyline points="15 18 9 12 15 6"></polyline></svg>
                Voltar
            </div>

            <form className="client-form" onSubmit={handleSave}>
              <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>
                {editingId ? 'Editar dados do veículo' : 'Adicionar novo veículo'}
              </h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Modelo</label>
                  <input name="modelo" placeholder="Ex: Classic" value={formData.modelo} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Quilometragem</label>
                  <input name="quilometragem" type="number" placeholder="Ex: 48000" value={formData.quilometragem} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Marca</label>
                  <input name="marca" placeholder="Ex: Chevrolet" value={formData.marca} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Categoria</label>
                  <select name="Categoria_id" value={formData.Categoria_id} onChange={handleInputChange} required style={{ padding: '12px 15px', borderRadius: '8px', border: '1px solid #E0E0E0', backgroundColor: '#fafafa' }}>
                    <option value="" disabled>Selecione a categoria</option>
                    {categoriasOptions.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.nome}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Placa</label>
                  {/* Se estiver editando, talvez queira bloquear a placa (disabled), mas deixei liberado */}
                  <input name="placa" placeholder="Ex: ABC1234" value={formData.placa} onChange={handleInputChange} required maxLength="10" />
                </div>
                <div className="form-group">
                  <label>Chassi</label>
                  <input name="chassi" placeholder="Ex: 152848557" value={formData.chassi} onChange={handleInputChange} required maxLength="17" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label>Situação</label>
                  <select name="situacao" value={formData.situacao} onChange={handleInputChange} required style={{ padding: '12px 15px', borderRadius: '8px', border: '1px solid #E0E0E0', backgroundColor: '#fafafa', width: '100%' }}>
                    <option value="" disabled>Selecione a situação</option>
                    <option value="DISPONIVEL">Disponível</option>
                    <option value="ALUGADO">Alugado</option>
                    <option value="MANUTENCAO">Manutenção</option>
                  </select>
                </div>
              </div>

              <div className="form-actions-bottom" style={{ justifyContent: 'center' }}>
                <button type="submit" className="btn-save" style={{ width: '300px' }}>
                  {editingId ? 'Salvar Alterações' : 'Adicionar Veículo'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* === LISTAGEM === */
          <>
            <div className="clients-filters-card">
              <div className="filter-item search-box">
                <label>Pesquisa rápida</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Digite placa ou modelo" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
              </div>
              <div className="filter-item total-counter">
                <h3>{veiculos.length}</h3>
                <span>Total de veículos</span>
              </div>
              <div className="filter-item dropdown-filter">
                <label>Filtrar</label>
                <select>
                  <option>Todos</option>
                  <option>Disponíveis</option>
                  <option>Alugados</option>
                </select>
              </div>
              <button className="btn-new-client" onClick={() => setIsCreating(true)}>Cadastrar Novo</button>
            </div>

            <div className="clients-table-container">
              <div className="table-header">
                <h3>Todos os veículos</h3>
                <div className="pagination-info">Mostrando <span className="highlight">10</span> por página</div>
              </div>
              
              <table className="clients-table">
                <thead>
                  <tr>
                    <th>S/N</th><th>Placa</th><th>Chassi</th><th>Modelo</th><th>Marca</th><th>Quilometragem</th><th>Situação</th><th>Categoria</th><th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="9" style={{textAlign: 'center', padding: '20px'}}>Carregando...</td></tr>
                  ) : filteredVeiculos.map((v, index) => (
                    <tr key={v.id}>
                      <td>{String(index + 1).padStart(2, '0')}</td>
                      <td>{v.placa}</td>
                      <td>{v.chassi}</td>
                      <td>{v.modelo}</td>
                      <td>{v.marca}</td>
                      <td>{v.quilometragem}</td>
                      <td><span className={`status-badge ${getStatusClass(v.situacao)}`}>{formatStatus(v.situacao)}</span></td>
                      <td>{v.Categoria?.nome || '-'}</td>
                      <td className="action-cell">
                        <span className="link-ver-mais" onClick={() => toggleRowMenu(v.id)}>Ver mais</span>
                        {activeMenuRow === v.id && (
                          <div className="action-menu-popover">
                            <div className="popover-item">Visualizar</div>
                            {/* --- AÇÕES CONECTADAS AQUI --- */}
                            <div className="popover-item" onClick={() => handleEdit(v)}>Editar</div>
                            <div className="popover-item" onClick={() => handleDelete(v.id)} style={{color: 'red'}}>Excluir</div>
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
              <button className="page-btn">{">>"}</button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Veiculo;