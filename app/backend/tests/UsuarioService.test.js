const UsuarioService = require('../src/services/UsuarioService');

// 1. Mock do Model Usuario
jest.mock('../src/models/index', () => ({
  Usuario: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    destroy: jest.fn()
  }
}));

const { Usuario } = require('../src/models/index');

describe('UsuarioService - Testes Unitários', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Teste 1: Criação de Usuário
  test('Deve criar um novo usuário com sucesso', async () => {
    const dadosUsuario = {
      nome: 'Luke Skywalker',
      email: 'luke@galaxy.com',
      perfil: 'ADMIN',
      cpf: '12345678901',
      senha: 'force'
    };

    // Simula o retorno do banco com ID gerado
    Usuario.create.mockResolvedValue({ id: 1, ...dadosUsuario });

    const resultado = await UsuarioService.create(dadosUsuario);

    expect(resultado).toHaveProperty('id', 1);
    expect(resultado.email).toBe('luke@galaxy.com');
    expect(Usuario.create).toHaveBeenCalledWith(dadosUsuario);
  });

  // Teste 2: Segurança na Listagem (Não retornar senha)
  test('Deve listar usuários excluindo o campo de senha', async () => {
    Usuario.findAll.mockResolvedValue([
      { id: 1, nome: 'Han Solo' }
    ]);

    await UsuarioService.getAll();

    // Verifica se a opção "attributes: { exclude: ['senha'] }" foi passada
    expect(Usuario.findAll).toHaveBeenCalledWith({
      attributes: { exclude: ['senha'] }
    });
  });

  // Teste 3: Atualização - Usuário não encontrado
  test('Deve retornar null ao tentar atualizar usuário inexistente', async () => {
    Usuario.findByPk.mockResolvedValue(null); // Simula não encontrar

    const resultado = await UsuarioService.update(999, { nome: 'Darth Vader' });

    expect(resultado).toBeNull();
  });

  // Teste 4: Atualização - Sucesso
  test('Deve atualizar os dados se o usuário existir', async () => {
    // Mock do usuário encontrado no banco (objeto com função update)
    const mockUsuarioBanco = {
      id: 10,
      nome: 'Obi-Wan',
      update: jest.fn() // Função mockada do Sequelize
    };

    Usuario.findByPk.mockResolvedValue(mockUsuarioBanco);

    const novosDados = { nome: 'Ben Kenobi' };
    await UsuarioService.update(10, novosDados);

    // Verifica se a função .update() do objeto foi chamada
    expect(mockUsuarioBanco.update).toHaveBeenCalledWith(novosDados);
  });

});