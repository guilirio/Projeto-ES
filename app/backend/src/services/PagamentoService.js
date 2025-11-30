// src/services/pagamentoService.js
const { Pagamento, Locacao } = require('../models/index');

const PagamentoService = {
  // Criar
  create: async (data) => {
    // data = { Locacao_id, valor_pago, metodo_pagamento}
    
    // Verifica se a locação existe
    const locacao = await Locacao.findByPk(data.Locacao_id);
    if (!locacao) {
      throw new Error('Locação não encontrada');
    }

    const novoPagamento = await Pagamento.create(data);
    return novoPagamento;
  },

  // Listar Todos
  getAll: async () => {
    return await Pagamento.findAll({
      include: { model: Locacao, attributes: ['id', 'valor_total'] }
    });
  },

  // Buscar por ID 
  getById: async (id) => {
    const pagamento = await Pagamento.findByPk(id, {
      include: { model: Locacao, attributes: ['id', 'valor_total', 'status'] }
    });
    return pagamento;
  },

  // Atualizar
  update: async (id, data) => {
    const pagamento = await Pagamento.findByPk(id);

    // Se não achar, retorna null
    if (!pagamento) return null;

    // Atualiza a instância e retorna o objeto atualizado
    const pagamentoAtualizado = await pagamento.update(data);
    return pagamentoAtualizado;
  },

  // Deletar (NOVO)
  delete: async (id) => {
    const pagamento = await Pagamento.findByPk(id);

    // Se não achar, retorna null
    if (!pagamento) return null;

    // Remove do banco
    await pagamento.destroy();
    return true;
  }
};

module.exports = PagamentoService;