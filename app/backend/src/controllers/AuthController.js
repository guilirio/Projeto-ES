const AuthService = require('../services/AuthService');

const AuthController = {
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios...' });
      }

      // Chama o serviço
      const usuarioLogado = await AuthService.login(email, senha);

      // Se retornou null, é email ou senha errados
      if (!usuarioLogado) {
        return res.status(401).json({ error: 'Email ou senha inválidos...' });
      }

      return res.status(200).json({
        message: 'Logado com sucesso!',
        usuario: usuarioLogado,
      });

    } catch (error) {
      if (error.message === 'SEM_PERMISSAO') {
        // HTTP 403 = Forbidden (Proibido)
        return res.status(403).json({ 
          error: 'Este usuário não tem permissão para acessar o sistema.' 
        });
      }

      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = AuthController;