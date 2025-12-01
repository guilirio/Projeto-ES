const VeiculoService = require('../services/VeiculoService');

const VeiculoController = {
  async create(req, res) {
    try {
      const { placa, chassi, modelo, marca, Categoria_id, situacao, quilometragem } = req.body;

      // Validação simples
      if (!placa || !chassi || !modelo || !marca || !Categoria_id || !situacao) {
        return res.status(400).json({ 
          error: 'Campos obrigatórios: placa, chassi, modelo, marca, situacao e Categoria_id' 
        });
      }

      const novoVeiculo = await VeiculoService.create(req.body);
      return res.status(201).json(novoVeiculo);

    } catch (error) {
      // Erros de "Unique Constraint" (Placa duplicada)
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'Já existe um veículo com esta Placa ou Chassi.' });
      }
      return res.status(500).json({ error: error.message });
    }
  },

  // Listar Todos
  async getAll(req, res) {
    try {
      const veiculos = await VeiculoService.getAll();
      return res.status(200).json(veiculos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Buscar por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const veiculo = await VeiculoService.getById(id);

      if (!veiculo) {
        return res.status(404).json({ error: 'Veículo não encontrado...' });
      }

      return res.status(200).json(veiculo);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Atualizar
  async update(req, res) {
    try {
      const { id } = req.params;
      const veiculoAtualizado = await VeiculoService.update(id, req.body);

      if (!veiculoAtualizado) {
        return res.status(404).json({ error: 'Veículo não encontrado...' });
      }

      return res.status(200).json(veiculoAtualizado);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Deletar (COM TRATAMENTO DE ERRO MELHORADO)
  async delete(req, res) {
    try {
      const { id } = req.params;
      const sucesso = await VeiculoService.delete(id);

      if (!sucesso) {
        return res.status(404).json({ error: 'Veículo não encontrado...' });
      }

      return res.status(204).send();
    } catch (error) {
      // Detecta erro de chave estrangeira (Veículo está alugado/tem histórico)
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({ 
          error: 'Não é possível excluir este veículo pois ele possui histórico de locações. Exclua as locações associadas primeiro.' 
        });
      }
      
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = VeiculoController;