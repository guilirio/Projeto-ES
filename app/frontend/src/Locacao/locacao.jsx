import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Veiculo/veiculo.css'; 
import logoTrio from '../assets/logo.svg'; 

// Ícones (Mesmos do original)
const IconDashboard = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const IconClients = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconCar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 16H9m10 0h3v-3.15M7 16H4v-3.15M21 9l-2-6H5L3 9h18z"></path><rect x="3" y="9" width="18" height="9" rx="2"></rect><circle cx="7" cy="14" r="2"></circle><circle cx="17" cy="14" r="2"></circle></svg>;
const IconPayment = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>;
const IconCarRental = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path></svg>;

const Locacao = ({ onLogout }) => {
  const navigate = useNavigate();
  
  // --- Estados Visuais ---
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [activeMenuRow, setActiveMenuRow] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const [locacoes, setLocacoes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // --- Estado do Formulário ---
  const [formData, setFormData] = useState({
    Usuario_id: '',     // ID do Cliente
    Veiculo_id: '',     // ID do Carro
    data_retirada: '',
    data_devolucao: '',
    valor_total: ''
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      // Busca Locações, Clientes e Veículos em paralelo
      const [resLocacoes, resClientes, resVeiculos] = await Promise.all([
        fetch('http://localhost:3333/locacoes'),
        fetch('http://localhost:3333/usuarios'),
        fetch('http://localhost:3333/veiculos')
      ]);

      const dataLocacoes = await resLocacoes.json();
      const dataClientes = await resClientes.json();
      const dataVeiculos = await resVeiculos.json();

      setLocacoes(dataLocacoes);
      
      // Filtrar apenas usuários perfil 'CLIENTE' se necessário, ou usar todos
      setClientes(dataClientes.filter(u => u.perfil === 'CLIENTE')); 
      
      // Filtrar apenas veículos 'DISPONIVEL' para o cadastro (opcional)
      setVeiculos(dataVeiculos);

    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Helpers ---
  const toggleRowMenu = (id) => setActiveMenuRow(activeMenuRow === id ? null : id);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // --- Salvar Locação (POST) ---
  const handleSave = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      Usuario_id: parseInt(formData.Usuario_id),
      Veiculo_id: parseInt(formData.Veiculo_id),
      valor_total: parseFloat(formData.valor_total) || 0
    };

    try {
      const response = await fetch('http://localhost:3333/locacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Locação registrada com sucesso!');
        setFormData({ Usuario_id: '', Veiculo_id: '', data_retirada: '', data_devolucao: '', valor_total: '' });
        setIsCreating(false);
        fetchAllData(); // Atualiza a lista e o status dos carros
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro de conexão.');
    }
  };

  // --- Função para FINALIZAR (Excluir) a Locação ---
  const handleFinalizar = async (id) => {
    // Confirmação para evitar cliques acidentais
    if (!window.confirm("Deseja realmente finalizar esta locação? O registro será excluído.")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3333/locacoes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert("Locação finalizada com sucesso!");
        fetchAllData(); // Atualiza a lista removendo o item excluído
      } else {
        const errorData = await response.json();
        alert(`Erro ao finalizar: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Erro ao finalizar:", error);
      alert("Erro de conexão ao tentar finalizar.");
    }
    setActiveMenuRow(null); // Fecha o menu
  };

  // --- Filtro Local ---
  const filteredLocacoes = locacoes.filter((l) => {
    const clienteNome = l.Usuario?.nome || '';
    const veiculoModelo = l.Veiculo?.modelo || '';
    const termo = searchTerm.toLowerCase();
    return clienteNome.toLowerCase().includes(termo) || veiculoModelo.toLowerCase().includes(termo);
  });

  // --- Status Badge ---
  const getStatusClass = (status) => {
    switch (status) {
      case 'ATIVA': return 'status-alugado'; // Laranja
      case 'CONCLUIDA': return 'status-disponivel'; // Verde
      case 'CANCELADA': return 'status-manutencao'; // Vermelho
      default: return '';
    }
  };

  const formatStatus = (status) => {
    const map = { 
      'ATIVA': 'Ativa', 
      'CONCLUIDA': 'Concluída', 
      'CANCELADA': 'Cancelada' 
    };
    return map[status] || status;
  };

  // --- Filtro e Ordenação (Ativas primeiro) ---
  const filteredLocacoes = locacoes
    .filter((l) => {
      const clienteNome = l.Usuario?.nome || '';
      const veiculoModelo = l.Veiculo?.modelo || '';
      const termo = searchTerm.toLowerCase();
      return clienteNome.toLowerCase().includes(termo) || veiculoModelo.toLowerCase().includes(termo);
    })
    .sort((a, b) => {
      // Ordenação: Se 'a' é ATIVA e 'b' não é, 'a' vem primeiro (-1)
      if (a.status === 'ATIVA' && b.status !== 'ATIVA') return -1;
      if (a.status !== 'ATIVA' && b.status === 'ATIVA') return 1;
      return 0; // Se forem iguais mantém ordem original (ou pode ordenar por data)
    });

  return (
    <div className="dashboard-container">
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
          
          {/* Ativo nesta tela */}
          <div className="menu-item active" onClick={() => navigate('/locacoes')}>
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

      <main className="main-content">
        <header className="top-header">
          <div className="header-welcome">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#333' }}>
                {isCreating ? 'Novo aluguel' : 'Todas as locações'}
              </h2>
            </div>
            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
              {isCreating ? 'Cadastrar novo aluguel' : 'Visualizar, pesquisar e adicionar novas locações'}
            </p>
          </div>
          <div className="header-actions">
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
                onClick={resetForm}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '5px'}}><polyline points="15 18 9 12 15 6"></polyline></svg>
                Voltar
            </div>

            <form className="client-form" onSubmit={handleSave}>
              <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Criar locação</h3>

              <div className="form-row">
                <div className="form-group full-width">
                  <label>Cliente</label>
                  <select name="Usuario_id" value={formData.Usuario_id} onChange={handleInputChange} required>
                    <option value="" disabled>Selecione o cliente...</option>
                    {clientes.map(c => (
                      <option key={c.id} value={c.id}>{c.nome} (CPF: {c.cpf})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Data de Início</label>
                  <input 
                    type="date"
                    name="data_retirada"
                    value={formData.data_retirada}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Data de Entrega</label>
                  <input 
                    type="date"
                    name="data_devolucao"
                    value={formData.data_devolucao}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Carro</label>
                  <select 
                    name="Veiculo_id" 
                    value={formData.Veiculo_id} 
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Selecione o veículo...</option>
                    {veiculos.map(v => (
                      <option key={v.id} value={v.id} disabled={v.situacao !== 'DISPONIVEL'}>
                        {v.modelo} - {v.placa} {v.situacao !== 'DISPONIVEL' ? '(Indisponível)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Valor Total (R$)</label>
                  <input type="number" step="0.01" name="valor_total" value={formData.valor_total} onChange={handleInputChange} required />
                </div>
              </div>

              {/* Campo Status - EDITÁVEL tanto na criação quanto na edição */}
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Status</label>
                  <select 
                    name="status" 
                    value={formData.status} 
                    onChange={handleInputChange}
                    required
                  >
                    <option value="ATIVA">Ativa</option>
                    <option value="CONCLUIDA">Concluída</option>
                    <option value="CANCELADA">Cancelada</option>
                  </select>
                </div>
              </div>

              <div className="form-actions-bottom" style={{ justifyContent: 'center' }}>
                <button type="submit" className="btn-save" style={{ width: '300px' }}>
                  Adicionar
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
                  <input 
                    type="text" 
                    placeholder="Digite id ou cliente..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
              </div>
              <div className="filter-item total-counter">
                <h3>{locacoes.length}</h3>
                <span>Total de locações</span>
              </div>

              <div className="filter-item dropdown-filter">
                <label>Filtrar locações</label>
                <select>
                  <option>Todos</option>
                  <option>Ativas</option>
                  <option>Concluídas</option>
                </select>
              </div>

              <button className="btn-new-client" onClick={() => setIsCreating(true)}>
                Cadastrar Novo
              </button>
            </div>

            <div className="clients-table-container">
              <table className="clients-table">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Cliente</th>
                    <th>Carro (Modelo)</th>
                    <th>Retirada</th>
                    <th>Devolução</th>
                    <th>Valor (R$)</th>
                    <th>Status</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                   {loading ? (<tr><td colSpan="8" style={{textAlign: 'center'}}>Carregando...</td></tr>) : 
                   filteredLocacoes.map((l, index) => (
                     <tr key={l.id}>
                       <td>{String(index + 1).padStart(2, '0')}</td>
                       <td>{l.Usuario?.nome || 'N/A'}</td>
                       <td>{l.Veiculo?.modelo || 'N/A'}</td>
                       <td>{new Date(l.data_retirada).toLocaleDateString()}</td>
                       <td>{new Date(l.data_devolucao).toLocaleDateString()}</td>
                       <td>{parseFloat(l.valor_total).toFixed(2)}</td>
                       <td>
                          <span className={`status-badge ${getStatusClass(l.status)}`}>
                            {l.status}
                          </span>
                       </td>
                       <td className="action-cell">
                         <span className="link-ver-mais" onClick={() => toggleRowMenu(l.id)}>Ver mais</span>
                         {activeMenuRow === l.id && (
                           <div className="action-menu-popover">
                             {/* Alteração solicitada: Apenas opção Finalizar que deleta o registro */}
                             <div className="popover-item" onClick={() => handleFinalizar(l.id)}>Finalizar</div>
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
export default Locacao;