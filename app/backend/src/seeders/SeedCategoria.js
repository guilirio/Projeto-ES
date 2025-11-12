const { sequelize, Categoria } = require('../models/index');

/**
 * Arquivo que tem o objetivo de popular a tabela "Categoria" do banco de dados"
 */

const categorias = [
  { nome: 'Econômico',  descricao: 'Carros 1.0 com ar-condicionado',                 valor_diaria: 99.9  },
  { nome: 'SUV',        descricao: 'Veículos utilitários esportivos',                valor_diaria: 179.9 },
  { nome: 'Luxo',       descricao: 'Carros executivos ou esportivos de alto padrão', valor_diaria: 349.9 },
  { nome: 'Utilitário', descricao: 'Veículos para transporte de carga (ex: pickup)', valor_diaria: 219.9 }
];

async function runSeed() {
  try {
    await sequelize.authenticate();
    console.log('[ OK ] Conexão estabelecida com o banco.');

    // Verifica se a tabela já tem dados
    const count = await Categoria.count();
    if (count > 0) {
      console.log('[ OBS ] A tabela "Categoria" já está populada. Script ignorado.');
      await sequelize.close();
      return;
    }

    // Insere os dados com o 'bulkCreatte'
    await Categoria.bulkCreate(categorias);
    console.log('[ OK ] Categorias inseridas com sucesso!');

  } catch (error) {
    console.error('[ FALHA ] Erro ao popular o banco:', error);
  } finally {
    await sequelize.close();
    console.log('[ - ] Conexão com o banco fechada.');
  }
}

runSeed();