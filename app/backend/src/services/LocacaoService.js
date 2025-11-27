const { Locacao, Usuario, Veiculo } = require('../models/index');

const LocacaoService = {
    create: async (data) => {
    // data = { data_retirada, data_devolucao, valor_total, Usuario_id, Veiculo_id }

    // Verifica se o Veículo existe
    const veiculo = await Veiculo.findByPk(data.Veiculo_id);
    if (!veiculo) {
      throw new Error('Veículo não encontrado');
    }

    // REGRA DE NEGÓCIO: Verifica se o carro está disponível
    if (veiculo.situacao !== 'DISPONIVEL') {
      throw new Error('Este veículo não está disponível para locação no momento.');
    }

    // Verifica se o Usuário existe
    const usuario = await Usuario.findByPk(data.Usuario_id);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    // Cria a locação
    const novaLocacao = await Locacao.create(data);

    // ATUALIZAÇÃO AUTOMÁTICA: Muda o status do carro para ALUGADO
    await veiculo.update({ situacao: 'ALUGADO' });

    return novaLocacao;
  },

  // Listar Todas (Trazendo os dados do Cliente e do Carro)
  getAll: async () => {
    const locacoes = await Locacao.findAll({
      include: [
        { model: Usuario, attributes: ['id', 'nome', 'email'] }, // Traz quem alugou
        { model: Veiculo, attributes: ['id', 'modelo', 'placa'] } // Traz qual carro
      ]
    });
    return locacoes;
  },

  // Buscar por ID
  getById: async (id) => {
    const locacao = await Locacao.findByPk(id, {
      include: [
        { model: Usuario, attributes: ['id', 'nome', 'cpf'] },
        { model: Veiculo, attributes: ['id', 'modelo', 'placa', 'situacao'] }
      ]
    });
    return locacao;
  },

  // Atualizar (Liberar o carro na devolução)
  update: async (id, data) => {
    const locacao = await Locacao.findByPk(id);

    if (!locacao) return null;

    // Atualiza a locação
    const locacaoAtualizada = await locacao.update(data);

    // REGRA DE NEGÓCIO: Se o status mudou para 'CONCLUIDA' ou 'CANCELADA', liberar o carro
    if (data.status === 'CONCLUIDA' || data.status === 'CANCELADA') {
      const veiculo = await Veiculo.findByPk(locacao.Veiculo_id);
      if (veiculo) {
        await veiculo.update({ situacao: 'DISPONIVEL' });
      }
    }

    return locacaoAtualizada;
  },

  // Deletar
  delete: async (id) => {
    const locacao = await Locacao.findByPk(id);
    if (!locacao) return null;
    
    await locacao.destroy();
    return true;
  }
};

module.exports = LocacaoService;