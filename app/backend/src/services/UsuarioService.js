const { Usuario } = require('../models/index');

const UsuarioService = {
  create: async (data) => {
    // 'data' já vem com { nome, email, perfil, cpf, cnh, senha, ... }
    // Como não há criptografia, apenas criamos o usuário
    const novoUsuario = await Usuario.create(data);
    return novoUsuario;
  },

  getAll: async () => {
    // Ao listar todos, nao exibe o campo de senha
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['senha'] },
    });
    return usuarios;
  },

  getById: async (id) => {
    const usuario = await Usuario.findByPk(id);
    return usuario; // Retorna o objeto ou null se não encontrar
  },

  update: async (id, data) => {
    const [updated] = await Usuario.update(data, {
      where: { id: id },
    });

    if (updated) {
      const usuarioAtualizado = await Usuario.findByPk(id);
      return usuarioAtualizado;
    }
    return null; // Retorna null se não encontrou para atualizar
  },

  delete: async (id) => {
    const deleted = await Usuario.destroy({
      where: { id: id },
    });
    return deleted;
  },
};

module.exports = UsuarioService;