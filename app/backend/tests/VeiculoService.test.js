const VeiculoService = require('../src/services/VeiculoService');

// 1. Mock dos Models
jest.mock('../src/models/index', () => ({
  Veiculo: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    destroy: jest.fn() // Necessário para o teste de exclusão
  },
  Categoria: {} // Mock vazio pois é usado no include
}));

const { Veiculo } = require('../src/models/index');

describe('VeiculoService - Testes Unitários', () => {

  // Limpa os mocks antes de cada teste para não haver interferência
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Teste 1: Sucesso ao criar veículo
  test('Deve criar um novo veículo com sucesso', async () => {
    const dadosVeiculo = {
      placa: 'ABC-1234',
      modelo: 'Fusca',
      marca: 'VW',
      Categoria_id: 1,
      situacao: 'DISPONIVEL'
    };

    // Simula o retorno do Sequelize
    Veiculo.create.mockResolvedValue({ id: 1, ...dadosVeiculo });

    const resultado = await VeiculoService.create(dadosVeiculo);

    expect(resultado).toHaveProperty('id', 1);
    expect(resultado.placa).toBe('ABC-1234');
    expect(Veiculo.create).toHaveBeenCalledWith(dadosVeiculo);
  });

  // Teste 2: Listar veículos
  test('Deve retornar uma lista de veículos', async () => {
    const listaMock = [
      { id: 1, modelo: 'Fusca' },
      { id: 2, modelo: 'Gol' }
    ];

    Veiculo.findAll.mockResolvedValue(listaMock);

    const resultado = await VeiculoService.getAll();

    expect(resultado).toHaveLength(2);
    expect(Veiculo.findAll).toHaveBeenCalled();
  });

  // Teste 3: Exclusão falha se veículo não existe
  test('Deve retornar null ao tentar deletar veículo inexistente', async () => {
    Veiculo.findByPk.mockResolvedValue(null); // Simula que não achou

    const resultado = await VeiculoService.delete(999);

    expect(resultado).toBeNull();
    expect(Veiculo.destroy).not.toHaveBeenCalled(); // Garante que não tentou apagar
  });

});