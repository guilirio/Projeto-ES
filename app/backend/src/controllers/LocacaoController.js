const LocacaoService = require('../services/LocacaoService');

const LocacaoController = {
  async create(req, res) {
    try {
      const { data_retirada, data_devolucao, valor_total, Usuario_id, Veiculo_id } = req.body;

      if (!data_retirada || !data_devolucao || !valor_total || !Usuario_id || !Veiculo_id) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }

      const novaLocacao = await LocacaoService.create(req.body);
      return res.status(201).json(novaLocacao);

    } catch (error) {
      // Captura erros de validação (ex: Carro indisponível)
      return res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const locacoes = await LocacaoService.getAll();
      return res.status(200).json(locacoes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const locacao = await LocacaoService.getById(id);

      if (!locacao) {
        return res.status(404).json({ error: 'Locação não encontrada' });
      }

      return res.status(200).json(locacao);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const locacaoAtualizada = await LocacaoService.update(id, req.body);

      if (!locacaoAtualizada) {
        return res.status(404).json({ error: 'Locação não encontrada' });
      }

      return res.status(200).json(locacaoAtualizada);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const sucesso = await LocacaoService.delete(id);

      if (!sucesso) {
        return res.status(404).json({ error: 'Locação não encontrada' });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

module.exports = LocacaoController;