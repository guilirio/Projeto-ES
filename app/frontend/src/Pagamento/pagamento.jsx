import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Veiculo/veiculo.css'; // Reutiliza CSS padrão
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
  const [selectedLocacao, setSelectedLocacao] = useState(null); // Para o Modal de Detalhes

  // --- Estados de Dados ---
  const [locacoes, setLocacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // --- Carregar Dados (GET) ---
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Buscamos apenas Locações, pois elas contêm os dados financeiros (valor_total)
      const response = await fetch('http://localhost:3333/locacoes');
      const data = await response.json();

      // Filtra apenas as locações VIGENTES (ATIVAS) para exibição de cobrança
      // Se quiser mostrar histórico completo, remova o .filter ou ajuste a lógica
      const ativas = data.filter(l => l.status === 'ATIVA');
      setLocacoes(ativas);

    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setLocacoes([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleRowMenu = (id) => setActiveMenuRow(activeMenuRow === id ? null : id);

  // --- Filtro Local ---
  const filteredLocacoes = locacoes.filter((l) => {
    const termo = searchTerm.toLowerCase();
    const cliente = (l.Usuario?.nome || '').toLowerCase();
    const veiculo = (l.Veiculo?.modelo || '').toLowerCase();
    return cliente.includes(termo) || veiculo.includes(termo);
  });

  return (
    <div className="dashboard-container" style={{ position: 'relative' }}>
      
      {/* --- Sidebar --- */}
      <aside className="sidebar">
        <div className="sidebar-logo">
           {logoTrio ? <img src={logoTrio} alt="Trio Bit Garage" /> : <h3>Trio Bit</h3>}
        </div>
        <nav className="sidebar-menu">
          <div className="menu-item" onClick={() => navigate('/dashboard')}><IconDashboard /><span>Dashboard</span></div>
          <div className="menu-label">MENU</div>
          <div className="menu-item" onClick={() => navigate('/clients')}><IconClients /><span>Clientes</span></div>
          <div className="menu-item" onClick={() => navigate('/locacoes')}><IconCarRental /><span>Locação de Carros</span></div>
          <div className="menu-item" onClick={() => navigate('/veiculos')}><IconCar /><span>Veículos</span></div>
          <div className="menu-item active" onClick={() => navigate('/pagamentos')}><IconPayment /><span>Pagamentos</span></div>
        </nav>
      </aside>

      {/* --- Main Content --- */}
      <main className="main-content">
        <header className="top-header">
          <div className="header-welcome">
            <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#333' }}>Financeiro</h2>
            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Locações vigentes e valores a receber</p>
          </div>

          <div className="header-actions">
            <div className="user-profile" onClick={() => setShowUserDropdown(!showUserDropdown)}>
              <div className="avatar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <div className="user-info"><span className="user-name">Luke S.</span><span className="user-role">Admin</span></div>
              {showUserDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-item logout" onClick={onLogout}>Sair</div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* --- LISTAGEM (Sem opção de criar novo) --- */}
        <div className="clients-filters-card">
          <div className="filter-item search-box">
            <label>Pesquisar locação</label>
            <div className="input-wrapper">
              <input 
                type="text" 
                placeholder="Cliente ou Modelo..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>

          <div className="filter-item total-counter">
            <h3>{locacoes.length}</h3>
            <span>Locações Vigentes</span>
          </div>

          {/* Botão removido conforme solicitado */}
        </div>

        <div className="clients-table-container">
          <div className="table-header">
            <h3>Pagamentos Previstos</h3>
            <div className="pagination-info">Mostrando <span className="highlight">{filteredLocacoes.length}</span> registros</div>
          </div>
          
          <table className="clients-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Veículo</th>
                <th>Período</th>
                <th>Valor Total</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>Carregando...</td></tr>
              ) : filteredLocacoes.length === 0 ? (
                <tr><td colSpan="6" style={{textAlign: 'center', padding: '20px', color: '#999'}}>Nenhuma locação vigente encontrada.</td></tr>
              ) : filteredLocacoes.map((l) => (
                <tr key={l.id}>
                  <td>#{String(l.id).padStart(3, '0')}</td>
                  <td>{l.Usuario?.nome || 'N/A'}</td>
                  <td>{l.Veiculo?.modelo || 'N/A'}</td>
                  <td style={{ fontSize: '0.85rem' }}>
                    {new Date(l.data_retirada).toLocaleDateString()} até {new Date(l.data_devolucao).toLocaleDateString()}
                  </td>
                  <td style={{ fontWeight: 'bold', color: '#333' }}>
                    R$ {parseFloat(l.valor_total).toFixed(2)}
                  </td>
                  <td className="action-cell">
                    <span className="link-ver-mais" onClick={() => toggleRowMenu(l.id)}>Ver mais</span>
                    {activeMenuRow === l.id && (
                      <div className="action-menu-popover">
                        {/* Ação solicitada: EXIBIR dados da locação */}
                        <div className="popover-item" onClick={() => {
                          setSelectedLocacao(l);
                          setActiveMenuRow(null);
                        }}>
                          Visualizar
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* --- MODAL DE DETALHES --- */}
      {selectedLocacao && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white', padding: '30px', borderRadius: '12px', width: '90%', maxWidth: '500px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)', position: 'relative'
          }}>
            <h3 style={{ marginTop: 0, color: '#333', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              Detalhes da Locação #{selectedLocacao.id}
            </h3>
            
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', color: '#555' }}>
              <p><strong>Cliente:</strong> {selectedLocacao.Usuario?.nome} <br/><small>(Email: {selectedLocacao.Usuario?.email})</small></p>
              
              <div style={{ backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '8px' }}>
                <p style={{ margin: 0 }}><strong>Veículo:</strong> {selectedLocacao.Veiculo?.modelo}</p>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>Placa: {selectedLocacao.Veiculo?.placa}</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong>Retirada:</strong><br/>
                  {new Date(selectedLocacao.data_retirada).toLocaleDateString()}
                </div>
                <div>
                  <strong>Devolução:</strong><br/>
                  {new Date(selectedLocacao.data_devolucao).toLocaleDateString()}
                </div>
              </div>

              <div style={{ marginTop: '10px', fontSize: '1.2rem', color: '#FF914D', fontWeight: 'bold', textAlign: 'right' }}>
                Total: R$ {parseFloat(selectedLocacao.valor_total).toFixed(2)}
              </div>
            </div>

            <button 
              onClick={() => setSelectedLocacao(null)}
              style={{
                marginTop: '25px', width: '100%', padding: '12px', backgroundColor: '#333', color: 'white',
                border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Pagamento;