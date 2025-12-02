import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Veiculo/veiculo.css'; 
import logoTrio from '../assets/logo.svg'; 

// --- Ícones SVG ---
const IconDashboard = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const IconClients = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconCar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 16H9m10 0h3v-3.15M7 16H4v-3.15M21 9l-2-6H5L3 9h18z"></path><rect x="3" y="9" width="18" height="9" rx="2"></rect><circle cx="7" cy="14" r="2"></circle><circle cx="17" cy="14" r="2"></circle></svg>;
const IconPayment = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>;
const IconCarRental = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path></svg>;

const Locacao = ({ onLogout }) => {
  const navigate = useNavigate();
  
  // --- Estados de Controle Visual ---
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [activeMenuRow, setActiveMenuRow] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  
  // --- Estado para Edição ---
  const [editingId, setEditingId] = useState(null); 

  // --- Estados de Dados ---
  const [locacoes, setLocacoes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // --- Estado do Formulário ---
  const initialFormState = {
    Usuario_id: '',
    Veiculo_id: '',
    data_retirada: '',
    data_devolucao: '',
    valor_total: '',
    status: 'ATIVA'
  };

  const [formData, setFormData] = useState(initialFormState);
  const [statusAnterior, setStatusAnterior] = useState(''); // Para controlar mudanças de status

  // --- Carregar Dados Iniciais ---
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      const [resLocacoes, resClientes, resVeiculos] = await Promise.all([
        fetch('http://localhost:3333/locacoes'),
        fetch('http://localhost:3333/usuarios'),
        fetch('http://localhost:3333/veiculos')
      ]);

      const dataLocacoes = await resLocacoes.json();
      const dataClientes = await resClientes.json();
      const dataVeiculos = await resVeiculos.json();

      setLocacoes(dataLocacoes);
      setClientes(dataClientes.filter(u => u.perfil === 'CLIENTE'));
      setVeiculos(dataVeiculos);

    } catch (error) {
      console.error("Erro ao carregar dados:", error);
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
    setStatusAnterior('');
  };

  // --- Preparar para Editar ---
  const handleEdit = (locacao) => {
    setFormData({
      Usuario_id: locacao.Usuario_id || locacao.Usuario?.id || '',
      Veiculo_id: locacao.Veiculo_id || locacao.Veiculo?.id || '',
      data_retirada: locacao.data_retirada ? locacao.data_retirada.split('T')[0] : '',
      data_devolucao: locacao.data_devolucao ? locacao.data_devolucao.split('T')[0] : '',
      valor_total: locacao.valor_total || '',
      status: locacao.status || 'ATIVA'
    });
    setStatusAnterior(locacao.status || 'ATIVA'); // Guarda o status anterior
    setEditingId(locacao.id);
    setIsCreating(true);
    setActiveMenuRow(null);
  };

  // --- Função para CANCELAR locação (atualiza status) ---
  const handleCancelar = async (id) => {
    if (!window.confirm("Deseja realmente CANCELAR esta locação?")) {
      return;
    }

    try {
      // Primeiro buscar a locação atual
      const responseGet = await fetch(`http://localhost:3333/locacoes/${id}`);
      const locacaoAtual = await responseGet.json();
      
      if (!locacaoAtual) {
        alert("Locação não encontrada!");
        return;
      }

      // Preparar dados para atualização (apenas mudar status)
      const dadosAtualizados = {
        ...locacaoAtual,
        status: 'CANCELADA'
      };

      // Atualizar a locação
      const response = await fetch(`http://localhost:3333/locacoes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosAtualizados)
      });

      if (response.ok) {
        // Se o veículo estava alugado, liberar ele
        if (locacaoAtual.Veiculo_id && locacaoAtual.status === 'ATIVA') {
          await atualizarStatusVeiculo(locacaoAtual.Veiculo_id, 'DISPONIVEL');
        }
        alert("Locação cancelada com sucesso!");
        fetchAllData(); // Atualiza a lista
      } else {
        const errorData = await response.json();
        alert(`Erro ao cancelar: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Erro ao cancelar:", error);
      alert("Erro de conexão ao tentar cancelar.");
    }
    setActiveMenuRow(null);
  };

  // --- Função para CONCLUIR locação (atualiza status) ---
  const handleConcluir = async (id) => {
    if (!window.confirm("Deseja realmente CONCLUIR esta locação?")) {
      return;
    }

    try {
      // Primeiro buscar a locação atual
      const responseGet = await fetch(`http://localhost:3333/locacoes/${id}`);
      const locacaoAtual = await responseGet.json();
      
      if (!locacaoAtual) {
        alert("Locação não encontrada!");
        return;
      }

      // Preparar dados para atualização (apenas mudar status)
      const dadosAtualizados = {
        ...locacaoAtual,
        status: 'CONCLUIDA'
      };

      // Atualizar a locação
      const response = await fetch(`http://localhost:3333/locacoes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosAtualizados)
      });

      if (response.ok) {
        // Se o veículo estava alugado, liberar ele
        if (locacaoAtual.Veiculo_id && locacaoAtual.status === 'ATIVA') {
          await atualizarStatusVeiculo(locacaoAtual.Veiculo_id, 'DISPONIVEL');
        }
        alert("Locação concluída com sucesso!");
        fetchAllData(); // Atualiza a lista
      } else {
        const errorData = await response.json();
        alert(`Erro ao concluir: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Erro ao concluir:", error);
      alert("Erro de conexão ao tentar concluir.");
    }
    setActiveMenuRow(null);
  };

  // --- Função para atualizar status do veículo ---
  const atualizarStatusVeiculo = async (veiculoId, novoStatus) => {
    try {
      const response = await fetch(`http://localhost:3333/veiculos/${veiculoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ situacao: novoStatus })
      });

      if (!response.ok) {
        console.error(`Erro ao atualizar status do veículo ${veiculoId}`);
      }
    } catch (error) {
      console.error("Erro ao atualizar veículo:", error);
    }
  };

  // --- Salvar (Criar ou Editar) ---
  const handleSave = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      Usuario_id: parseInt(formData.Usuario_id),
      Veiculo_id: parseInt(formData.Veiculo_id),
      valor_total: parseFloat(formData.valor_total) || 0
    };

    // Define se é POST (criar) ou PUT (editar)
    const url = editingId 
      ? `http://localhost:3333/locacoes/${editingId}`
      : 'http://localhost:3333/locacoes';
    
    const method = editingId ? 'PUT' : 'POST';

    try {
      // Se estiver editando, verificar mudança de status
      if (editingId && formData.Veiculo_id && statusAnterior !== formData.status) {
        // Status mudou, precisa atualizar veículo
        
        if (formData.status === 'ATIVA') {
          // Se voltou a ser ativa, veículo fica ALUGADO
          await atualizarStatusVeiculo(parseInt(formData.Veiculo_id), 'ALUGADO');
        } else if (formData.status === 'CONCLUIDA' || formData.status === 'CANCELADA') {
          // Se concluída ou cancelada, veículo fica DISPONÍVEL
          // Mas só se antes estava ativa (alugado)
          if (statusAnterior === 'ATIVA') {
            await atualizarStatusVeiculo(parseInt(formData.Veiculo_id), 'DISPONIVEL');
          }
        }
      } else if (!editingId && formData.status === 'ATIVA' && formData.Veiculo_id) {
        // Nova locação com status ativa: veículo fica ALUGADO
        await atualizarStatusVeiculo(parseInt(formData.Veiculo_id), 'ALUGADO');
      }

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert(editingId ? 'Locação atualizada com sucesso!' : 'Locação cadastrada com sucesso!');
        resetForm();
        fetchAllData(); 
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro de conexão ao salvar locação.');
    }
  };

  // --- Filtro Local ---
  const filteredLocacoes = locacoes.filter((l) => {
    const clienteNome = l.Usuario?.nome || '';
    const veiculoModelo = l.Veiculo?.modelo || '';
    const veiculoPlaca = l.Veiculo?.placa || '';
    const termo = searchTerm.toLowerCase();
    return clienteNome.toLowerCase().includes(termo) || 
           veiculoModelo.toLowerCase().includes(termo) ||
           veiculoPlaca.toLowerCase().includes(termo);
  });

  // --- Status Badge ---
  const getStatusClass = (status) => {
    switch (status) {
      case 'ATIVA': return 'status-alugado';
      case 'CONCLUIDA': return 'status-disponivel';
      case 'CANCELADA': return 'status-manutencao';
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
          <div className="menu-item active" onClick={() => navigate('/locacoes')}> 
            <IconCarRental /><span>Locação de Carros</span>
          </div>
          <div className="menu-item" onClick={() => navigate('/veiculos')}> 
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
                {isCreating ? (editingId ? 'Editar Locação' : 'Nova Locação') : 'Todas as locações'}
              </h2>
            </div>
            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
              {isCreating ? 'Preencha os dados da locação' : 'Visualizar, pesquisar e gerenciar locações'}
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
                {editingId ? 'Editar dados da locação' : 'Adicionar nova locação'}
              </h3>

              <div className="form-row">
                <div className="form-group full-width">
                  <label>Cliente</label>
                  <select 
                    name="Usuario_id" 
                    value={formData.Usuario_id} 
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Selecione o cliente...</option>
                    {clientes.map(c => (
                      <option key={c.id} value={c.id}>{c.nome} (CPF: {c.cpf})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Data de Retirada</label>
                  <input 
                    type="date"
                    name="data_retirada"
                    value={formData.data_retirada}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Data de Devolução</label>
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
                  <label>Veículo</label>
                  <select 
                    name="Veiculo_id" 
                    value={formData.Veiculo_id} 
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Selecione o veículo...</option>
                    {veiculos.map(v => (
                      <option key={v.id} value={v.id} disabled={v.situacao !== 'DISPONIVEL' && !editingId}>
                        {v.modelo} - {v.placa} {v.situacao !== 'DISPONIVEL' && !editingId ? '(Indisponível)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Valor Total (R$)</label>
                  <input 
                    type="number"
                    step="0.01"
                    name="valor_total"
                    placeholder="Ex: 1000.00"
                    value={formData.valor_total}
                    onChange={handleInputChange}
                    required 
                  />
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
                  {editingId ? 'Salvar Alterações' : 'Adicionar Locação'}
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
                  <input 
                    type="text" 
                    placeholder="Digite cliente, modelo ou placa..." 
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
                <label>Filtrar</label>
                <select>
                  <option>Todos</option>
                  <option>Ativas</option>
                  <option>Concluídas</option>
                  <option>Canceladas</option>
                </select>
              </div>

              <button className="btn-new-client" onClick={() => setIsCreating(true)}>
                Cadastrar Novo
              </button>
            </div>

            <div className="clients-table-container">
              <div className="table-header">
                <h3>Todas as locações</h3>
                <div className="pagination-info">Mostrando <span className="highlight">10</span> por página</div>
              </div>

              <table className="clients-table">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Cliente</th>
                    <th>Veículo (Modelo/Placa)</th>
                    <th>Retirada</th>
                    <th>Devolução</th>
                    <th>Valor (R$)</th>
                    <th>Status</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                   {loading ? (
                     <tr><td colSpan="8" style={{textAlign: 'center', padding:'20px'}}>Carregando...</td></tr>
                   ) : filteredLocacoes.map((l, index) => (
                     <tr key={l.id}>
                       <td>{String(index + 1).padStart(2, '0')}</td>
                       <td>{l.Usuario?.nome || 'N/A'}</td>
                       <td>{l.Veiculo?.modelo || 'N/A'} ({l.Veiculo?.placa || 'N/A'})</td>
                       <td>{l.data_retirada ? new Date(l.data_retirada).toLocaleDateString() : 'N/A'}</td>
                       <td>{l.data_devolucao ? new Date(l.data_devolucao).toLocaleDateString() : 'N/A'}</td>
                       <td>{parseFloat(l.valor_total || 0).toFixed(2)}</td>
                       <td>
                          <span className={`status-badge ${getStatusClass(l.status)}`}>
                            {formatStatus(l.status)}
                          </span>
                       </td>
                       <td className="action-cell">
                         <span className="link-ver-mais" onClick={() => toggleRowMenu(l.id)}>Ver mais</span>
                         {activeMenuRow === l.id && (
                           <div className="action-menu-popover">
                             <div className="popover-item">Visualizar</div>
                             <div className="popover-item" onClick={() => handleEdit(l)}>Editar</div>
                             {l.status === 'ATIVA' && (
                               <>
                                 <div className="popover-item" onClick={() => handleConcluir(l.id)}>Concluir</div>
                                 <div className="popover-item" onClick={() => handleCancelar(l.id)}>Cancelar</div>
                               </>
                             )}
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
              <button className="page-btn">{">>"}</button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Locacao;