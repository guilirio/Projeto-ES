const { Usuario } = require('../models/index');

const AuthService = {
  login: async (email, senha) => {
    // Busca o usuário pelo email
    const usuario = await Usuario.findOne({
      where: { email: email },
    });

    // Verifica se o perfil é CLIENTE
    if (usuario.perfil === 'CLIENTE') {
      // Lançamos um erro específico para o controller pegar
      throw new Error('SEM_PERMISSAO');
    }

    // Se não achar o usuário OU a senha não bater
    if (!usuario || usuario.senha !== senha) {
      // Retornamos null para indicar "Credenciais Inválidas"
      return null;
    }

    // Se chegou aqui, é ADMIN ou FUNCIONARIO. Retorna o usuário limpo.
    const usuarioSemSenha = usuario.toJSON();
    delete usuarioSemSenha.senha;

    return usuarioSemSenha;
  },
};

module.exports = AuthService;