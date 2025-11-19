const { sequelize, Categoria, Usuario } = require('../models/index');

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
    }

  } catch (error) {
    console.error('[ FALHA ] Erro ao popular o banco:', error);
  } finally {
    await sequelize.close();
    console.log('[ - ] Conexão com o banco fechada.');
  }
}

runSeed();