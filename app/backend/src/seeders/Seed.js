const { sequelize, Categoria, Usuario, Veiculo, Locacao } = require('../models/index');

/**
 * Arquivo que tem o objetivo de popular algumas tabelas do banco de dados"
 */

const categorias = [
  { nome: 'Econômico',  descricao: 'Carros 1.0 com ar-condicionado',                 valor_diaria: 99.9  },
  { nome: 'SUV',        descricao: 'Veículos utilitários esportivos',                valor_diaria: 179.9 },
  { nome: 'Luxo',       descricao: 'Carros executivos ou esportivos de alto padrão', valor_diaria: 349.9 },
  { nome: 'Utilitário', descricao: 'Veículos para transporte de carga (ex: pickup)', valor_diaria: 219.9 }
];

const admins = [
  { nome:'Fábio Damas Valim',       email:'emailteste1@gmail.com', perfil:'ADMIN', cpf:'14613184673', cnh:'574865856', telefone:'35991434519', senha:'10203040'},
  { nome:'Guilherme Lirio Miranda', email:'emailteste2@gmail.com', perfil:'ADMIN', cpf:'15875978655', cnh:'468475254', telefone:'35999655686', senha:'10203040'},
  { nome:'Caio Finnochio Martins',  email:'emailteste3@gmail.com', perfil:'ADMIN', cpf:'54758696321', cnh:'143586495', telefone:'35935241212', senha:'10203040'}
];

const funcs = [
  { nome:'Rogério Pereira Silva',   email:'emailteste4@gmail.com', perfil:'FUNCIONARIO', cpf:'58648754875', cnh:'586822545', telefone:'35998655625', senha:'10203040'},
  { nome:'Milena Souza Santos',     email:'emailteste5@gmail.com', perfil:'FUNCIONARIO', cpf:'45786545725', cnh:'145253458', telefone:'35445758656', senha:'10203040'},
  { nome:'Julia Guimaraes Silva',   email:'emailteste6@gmail.com', perfil:'FUNCIONARIO', cpf:'47585212355', cnh:'547586532', telefone:'31945768595', senha:'10203040'},
];

const clientes = [
  { nome:'Lucas Alberto Diniz',   email:'emailteste7@gmail.com', perfil:'CLIENTE', cpf:'54568652534', cnh:'586452451', telefone:'35948655625', senha:'10203040'},
  { nome:'Clarisse Maia Santos',  email:'emailteste8@gmail.com', perfil:'CLIENTE', cpf:'45796545725', cnh:'142535478', telefone:'35945758656', senha:'10203040'},
  { nome:'Alberto Paes Mesquita', email:'emailteste9@gmail.com', perfil:'CLIENTE', cpf:'97585212355', cnh:'245687954', telefone:'31845768595', senha:'10203040'},
];

const veiculos = [
  { placa:'ABC1A23', chassi:'9BWZZZ377VT004251', modelo:'Onix LT 1.0',          marca:'Chevrolet', quilometragem:45200, situacao:'DISPONIVEL', Categoria_id:1 },
  { placa:'XYZ2B34', chassi:'8APZZZ123KT998745', modelo:'HB20 Comfort 1.6',     marca:'Hyundai',   quilometragem:38500, situacao:'MANUTENCAO', Categoria_id:2 },
  { placa:'KLM3C45', chassi:'9BDZZZ439RT112587', modelo:'Corolla GLi 2.0',      marca:'Toyota',    quilometragem:71200, situacao:'DISPONIVEL', Categoria_id:3 },
  { placa:'QWE4D56', chassi:'93HZZZ847LT553901', modelo:'Gol 1.6 MSI',          marca:'Volkswagen',quilometragem:59800, situacao:'ALUGADO',    Categoria_id:1 },
  { placa:'RTY5E67', chassi:'9FZYYY556GT774312', modelo:'Compass Longitude 2.0',marca:'Jeep',      quilometragem:28900, situacao:'DISPONIVEL', Categoria_id:4 },
];

const locacoes = [
  { data_retirada:'2025-01-12', data_devolucao:'2025-01-15', valor_total:450.00, status:'ATIVA',     Veiculo_id:1, Usuario_id:7 },
  { data_retirada:'2025-02-03', data_devolucao:'2025-02-10', valor_total:980.00, status:'CONCLUIDA', Veiculo_id:3, Usuario_id:8 },
  { data_retirada:'2025-03-20', data_devolucao:'2025-03-22', valor_total:320.00, status:'CANCELADA', Veiculo_id:2, Usuario_id:9 },
  { data_retirada:'2025-04-01', data_devolucao:'2025-04-05', valor_total:610.00, status:'ATIVA',     Veiculo_id:5, Usuario_id:7 }
];

async function runSeed() {
  try {
    await sequelize.authenticate();
    console.log('[ OK ] Conexão estabelecida com o banco.');

    /**
     * Caso a tabela já tenha dados, os registros não são inseridos
     */

    let count = await Categoria.count();
    if (count == 0) {
      await Categoria.bulkCreate(categorias);
      console.log('[ OK ] Categorias inseridas com sucesso!');
    }

    count = await Usuario.count();
    if (count == 0) {
      await Usuario.bulkCreate(admins);
      console.log('[ OK ] Admins inseridos com sucesso!');
      await Usuario.bulkCreate(funcs);
      console.log('[ OK ] Funcionarios inseridos com sucesso!');
      await Usuario.bulkCreate(clientes);
      console.log('[ OK ] Clientes inseridos com sucesso!');
    }

    count = await Veiculo.count();
    if(count == 0) {
      await Veiculo.bulkCreate(veiculos);
      console.log('[ OK ] Veiculos inseridos com sucesso!');
    }

    count = await Locacao.count();
    if(count == 0) {
      await Locacao.bulkCreate(locacoes);
      console.log('[ OK ] Locacoes inseridos com sucesso!');
    }

  } catch (error) {
    console.error('[ FALHA ] Erro ao popular o banco:', error);
  } finally {
    await sequelize.close();
    console.log('[ - ] Conexão com o banco fechada.');
  }
}

runSeed();