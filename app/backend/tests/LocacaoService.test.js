const LocacaoService = require('../src/services/LocacaoService');

// Mock (Simulação) dos Models para não precisar do banco real rodando
jest.mock('../src/models/index', () => ({
  Veiculo: {
    findByPk: jest.fn(),
    update: jest.fn()
  },
  Usuario: {
    findByPk: jest.fn()
  },
  Locacao: {
    create: jest.fn()
  }
}));

const { Veiculo, Usuario, Locacao } = require('../src/models/index');

describe('LocacaoService - Testes Unitários', () => {

  // Teste 1: Deve bloquear locação se veículo não existe
  test('Deve lançar erro se o veículo não for encontrado', async () => {
    Veiculo.findByPk.mockResolvedValue(null); // Simula que não achou

    await expect(LocacaoService.create({ Veiculo_id: 999 }))
      .rejects
      .toThrow('Veículo não encontrado');
  });

  // Teste 2: Deve bloquear locação se veículo não está disponível
  test('Deve lançar erro se o veículo não estiver DISPONIVEL', async () => {
    Veiculo.findByPk.mockResolvedValue({ id: 1, situacao: 'MANUTENCAO' });

    await expect(LocacaoService.create({ Veiculo_id: 1 }))
      .rejects
      .toThrow('Este veículo não está disponível');
  });

  // Teste 3: Deve criar locação com sucesso se tudo estiver ok
  test('Deve criar locação se veículo e usuário existirem', async () => {
    // Configura os mocks para sucesso
    Veiculo.findByPk.mockResolvedValue({ 
        id: 1, 
        situacao: 'DISPONIVEL', 
        update: jest.fn() // Simula a função de atualizar status
    });
    Usuario.findByPk.mockResolvedValue({ id: 1, nome: 'Teste' });
    Locacao.create.mockResolvedValue({ id: 100, status: 'ATIVA' });

    const resultado = await LocacaoService.create({ 
        Veiculo_id: 1, 
        Usuario_id: 1, 
        data_retirada: '2025-12-01' 
    });

    expect(resultado).toHaveProperty('id', 100);
    expect(Veiculo.findByPk).toHaveBeenCalledWith(1);
  });

});