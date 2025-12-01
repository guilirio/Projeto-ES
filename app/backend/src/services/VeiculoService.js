const { Veiculo, Categoria } = require('../models/index');

const VeiculoService = {
  create: async (data) => {
    // data deve conter: { placa, chassi, modelo, marca, quilometragem, situacao, Categoria_id }
    const novoVeiculo = await Veiculo.create(data);
    return novoVeiculo;
  },

  // Listar Todos (Com dados da Categoria)
  getAll: async () => {
    const veiculos = await Veiculo.findAll({
      // O 'include' faz o JOIN e traz o objeto da Categoria junto
      include: {
        model: Categoria,
        attributes: ['id', 'nome', 'valor_diaria'] // Traz só o que importa
      }
    });
    return veiculos;
  },

  // Buscar por ID
  getById: async (id) => {
    const veiculo = await Veiculo.findByPk(id, {
      include: {
        model: Categoria,
        attributes: ['id', 'nome', 'valor_diaria']
      }
    });
    return veiculo;
  },

  // Atualizar um veículo
  update: async (id, data) => {
    const veiculo = await Veiculo.findByPk(id);

    if (!veiculo) {
      return null;
    }

    // Atualiza e salva
    const veiculoAtualizado = await veiculo.update(data);
    return veiculoAtualizado;
  },

  // Deletar um veículo
  delete: async (id) => {
    const veiculo = await Veiculo.findByPk(id);

    if (!veiculo) {
      return null;
    }

    // Deleta
    await veiculo.destroy();
    return true; // Retorna true para confirmar que apagou
  },
};

module.exports = VeiculoService;