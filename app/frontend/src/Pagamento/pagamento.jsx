import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Reutiliza o CSS de veículos para manter o design idêntico
import '../Veiculo/veiculo.css'; 
import logoTrio from '../assets/logo.svg'; 

// --- Ícones SVG ---
const IconDashboard = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const IconClients = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconCar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 16H9m10 0h3v-3.15M7 16H4v-3.15M21 9l-2-6H5L3 9h18z"></path><rect x="3" y="9" width="18" height="9" rx="2"></rect><circle cx="7" cy="14" r="2"></circle><circle cx="17" cy="14" r="2"></circle></svg>;
const IconPayment = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>;
const IconCarRental = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path></svg>;

const Pagamento = ({ onLogout }) => {
  const navigate = useNavigate();
  
  // --- Estados de Controle Visual ---
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [activeMenuRow, setActiveMenuRow] = useState(null);
  const [isCreating, setIsCreating] = useState(false); // Alterna entre Lista e Formulário

  // --- Estados de Dados ---
  const [pagamentos, setPagamentos] = useState([]);
  const [locacoes, setLocacoes] = useState([]); // Necessário para selecionar a qual aluguel o pagamento se refere
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // --- Estado do Formulário ---
  const [formData, setFormData] = useState({
    Locacao_id: '',
    valor_pago: '',
    metodo_pagamento: ''
  });

  const metodosPagamento = ['PIX', 'DINHEIRO', 'CARTAO CREDITO', 'CARTAO DEBITO'];

  // --- Carregar Dados (GET) ---
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Busca Pagamentos e Locações em paralelo
      const [resPagamentos, resLocacoes] = await Promise.all([
        fetch('http://localhost:3333/pagamentos'),
        fetch('http://localhost:3333/locacoes')
      ]);

      // Tratamento de erro caso a rota ainda não exista no backend
      if (!resPagamentos.ok) throw new Error('Falha ao buscar pagamentos');
      
      const dataPagamentos = await resPagamentos.json();
      const dataLocacoes = await resLocacoes.json();

      setPagamentos(dataPagamentos);
      setLocacoes(dataLocacoes);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      // Fallback para array vazio para não quebrar a tela
      setPagamentos([]);
    } finally {
      setLoading(false);
    }
  };

  // --- Manipuladores ---
  const toggleRowMenu = (id) => setActiveMenuRow(activeMenuRow === id ? null : id);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // --- Salvar Pagamento (POST) ---
  const handleSave = async (e) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      Locacao_id: parseInt(formData.Locacao_id),
      valor_pago: parseFloat(formData.valor_pago)
    };

    try {
      const response = await fetch('http://localhost:3333/pagamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Pagamento registrado com sucesso!');
        setFormData({ Locacao_id: '', valor_pago: '', metodo_pagamento: '' });
        setIsCreating(false);
        fetchData(); // Recarrega a lista
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro de conexão ao salvar pagamento.');
    }
  };

  // --- Filtro Local ---
  const filteredPagamentos = pagamentos.filter((p) => {
    const termo = searchTerm.toLowerCase();
    const metodo = (p.metodo_pagamento || '').toLowerCase();
    const idStr = String(p.id);
    return metodo.includes(termo) || idStr.includes(termo);
  });

  return (
    <div className="dashboard-container">
      {/* --- Sidebar --- */}
      <aside className="sidebar">
        <div className="sidebar-logo">
           {logoTrio ? <img src={logoTrio} alt="Trio Bit Garage" /> : <h3>Trio Bit</h3>}
        </div>
        <nav className="sidebar-menu">
          <div className="menu-item" onClick={() => navigate('/dashboard')}>
            <IconDashboard />
            <span>Dashboard</span>
          </div>
          <div className="menu-label">MENU</div>
          <div className="menu-item" onClick={() => navigate('/clients')}>
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
          {/* Item Ativo */}
          <div className="menu-item active" onClick={() => navigate('/pagamentos')}>
            <IconPayment />
            <span>Pagamentos</span>
          </div>
        </nav>
      </aside>

      {/* --- Main Content --- */}
      <main className="main-content">
        <header className="top-header">
          <div className="header-welcome">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#333' }}>
                {isCreating ? 'Novo pagamento' : 'Todos os pagamentos'}
              </h2>
            </div>
            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
              {isCreating 
                ? 'Registrar uma nova transação financeira' 
                : 'Visualizar histórico de pagamentos e faturamento'}
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
                <span className="user-role">Admin</span>
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

        {isCreating ? (
          /* === FORMULÁRIO === */
          <div className="client-form-container">
            <div 
                style={{ display: 'flex', alignItems: 'center', color: '#FF914D', cursor: 'pointer', marginBottom: '20px', fontWeight: 500 }}
                onClick={() => setIsCreating(false)}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '5px'}}><polyline points="15 18 9 12 15 6"></polyline></svg>
                Voltar
            </div>

            <form className="client-form" onSubmit={handleSave}>
              <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Registrar Pagamento</h3>
              
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Locação Referente</label>
                  <select 
                    name="Locacao_id" 
                    value={formData.Locacao_id} 
                    onChange={handleInputChange}
                    required
                    style={{ padding: '12px 15px', borderRadius: '8px', border: '1px solid #E0E0E0', backgroundColor: '#fafafa', width: '100%' }}
                  >
                    <option value="" disabled>Selecione a locação...</option>
                    {locacoes.map(loc => (
                      <option key={loc.id} value={loc.id}>
                        Locação #{loc.id} - {loc.Veiculo?.modelo} (Total: R$ {loc.valor_total})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Valor Pago (R$)</label>
                  <input 
                    name="valor_pago" 
                    type="number"
                    step="0.01"
                    placeholder="Ex: 500.00"
                    value={formData.valor_pago}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Método de Pagamento</label>
                  <select 
                    name="metodo_pagamento" 
                    value={formData.metodo_pagamento} 
                    onChange={handleInputChange}
                    required
                    style={{ padding: '12px 15px', borderRadius: '8px', border: '1px solid #E0E0E0', backgroundColor: '#fafafa' }}
                  >
                    <option value="" disabled>Selecione o método</option>
                    {metodosPagamento.map(metodo => (
                      <option key={metodo} value={metodo}>{metodo}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-actions-bottom" style={{ justifyContent: 'center' }}>
                <button type="submit" className="btn-save" style={{ width: '300px' }}>
                  Confirmar Pagamento
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* === LISTAGEM === */
          <>
            <div className="clients-filters-card">
              <div className="filter-item search-box">
                <label>Pesquisar pagamento</label>
                <div className="input-wrapper">
                  <input 
                    type="text" 
                    placeholder="ID ou método..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
              </div>

              <div className="filter-item total-counter">
                <h3>{pagamentos.length}</h3>
                <span>Transações</span>
              </div>

              <div className="filter-item dropdown-filter">
                <label>Filtrar</label>
                <select>
                  <option>Todos</option>
                  <option>PIX</option>
                  <option>Cartão</option>
                </select>
              </div>

              <button className="btn-new-client" onClick={() => setIsCreating(true)}>
                Novo Pagamento
              </button>
            </div>

            <div className="clients-table-container">
              <div className="table-header">
                <h3>Histórico Financeiro</h3>
                <div className="pagination-info">Mostrando <span className="highlight">10</span> por página</div>
              </div>
              
              <table className="clients-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Locação Ref.</th>
                    <th>Valor Pago</th>
                    <th>Método</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>Carregando...</td></tr>
                  ) : filteredPagamentos.length === 0 ? (
                    <tr><td colSpan="5" style={{textAlign: 'center', padding: '20px', color: '#999'}}>Nenhum pagamento encontrado.</td></tr>
                  ) : filteredPagamentos.map((p) => (
                    <tr key={p.id}>
                      <td>#{String(p.id).padStart(3, '0')}</td>
                      <td>
                        Locação #{p.Locacao_id} 
                        {/* Se o backend trouxer o include da locação, podemos mostrar mais detalhes aqui */}
                      </td>
                      <td style={{ fontWeight: 'bold', color: '#333' }}>
                        R$ {parseFloat(p.valor_pago).toFixed(2)}
                      </td>
                      <td>
                        <span className="status-badge" style={{ 
                          color: p.metodo_pagamento === 'PIX' ? '#28a745' : '#007bff',
                          backgroundColor: 'rgba(0,0,0,0.05)',
                          padding: '4px 8px', borderRadius: '4px'
                        }}>
                          {p.metodo_pagamento}
                        </span>
                      </td>
                      <td className="action-cell">
                        <span className="link-ver-mais" onClick={() => toggleRowMenu(p.id)}>Ver mais</span>
                        {activeMenuRow === p.id && (
                          <div className="action-menu-popover">
                            <div className="popover-item">Detalhes</div>
                            <div className="popover-item">Estornar</div>
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

export default Pagamento;