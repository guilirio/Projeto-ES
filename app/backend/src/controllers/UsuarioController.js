const UsuarioService = require('../services/UsuarioService');

const UsuarioController = {
  async create(req, res) {
    try {
      // Validação básica dos campos obrigatórios
      const { nome, email, perfil, cpf, cnh, senha } = req.body;
      if (!nome || !email || !perfil || !cpf || !cnh || !senha) {
        return res
          .status(400)
          .json({ error: 'Campos obrigatórios estão faltando...' });
      }

      // Chama o Service para criar
      const novoUsuario = await UsuarioService.create(req.body);

      return res.status(201).json(novoUsuario);
    } catch (error) {
      // Tratamento de erro (ex: email/cpf duplicado)
      return res.status(500).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const usuarios = await UsuarioService.getAll();
      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioService.getById(id);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado...' });
      }

      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const usuarioAtualizado = await UsuarioService.update(id, req.body);

      if (!usuarioAtualizado) {
        return res.status(404).json({ error: 'Usuário não encontrado...' });
      }

      return res.status(200).json(usuarioAtualizado);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await UsuarioService.delete(id);

      if (!deleted) {
        return res.status(404).json({ error: 'Usuário não encontrado...' });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = UsuarioController;