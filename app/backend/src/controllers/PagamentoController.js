const PagamentoService = require('../services/PagamentoService');

const PagamentoController = {
  // Criar
  async create(req, res) {
    try {
      const { Locacao_id, valor_pago, metodo_pagamento } = req.body;

      if (!Locacao_id || !valor_pago || !metodo_pagamento) {
        return res.status(400).json({ error: 'Locacao_id, valor_pago e metodo_pagamento são obrigatórios' });
      }

      const pagamento = await PagamentoService.create(req.body);
      return res.status(201).json(pagamento);

    } catch (error) {
      // Captura erro se a Locação não existir
      return res.status(500).json({ error: error.message });
    }
  },

  // Listar Todos
  async getAll(req, res) {
    try {
      const pagamentos = await PagamentoService.getAll();
      return res.status(200).json(pagamentos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Buscar por ID (NOVO)
  async getById(req, res) {
    try {
      const { id } = req.params;
      const pagamento = await PagamentoService.getById(id);

      if (!pagamento) {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }

      return res.status(200).json(pagamento);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Atualizar
  async update(req, res) {
    try {
      const { id } = req.params;
      const pagamentoAtualizado = await PagamentoService.update(id, req.body);

      if (!pagamentoAtualizado) {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }

      return res.status(200).json(pagamentoAtualizado);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Deletar
  async delete(req, res) {
    try {
      const { id } = req.params;
      const sucesso = await PagamentoService.delete(id);

      if (!sucesso) {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }

      return res.status(204).send(); // 204 = No Content
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

module.exports = PagamentoController;