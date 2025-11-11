const { Sequelize } = require('sequelize');
const dbConfig = require('../config/database');
const CategoriaModel = require('./Categoria');
const UsuarioModel = require('./Usuario');
const VeiculoModel = require('./Veiculo');
const LocacaoModel = require('./Locacao');

const sequelize = new Sequelize(dbConfig);

CategoriaModel(sequelize);
UsuarioModel(sequelize);
VeiculoModel(sequelize);
LocacaoModel(sequelize);

const { Categoria, Usuario, Veiculo, Locacao } = sequelize.models;

// ------------------------------------
// ASSOCIAÇÕES DAS TABELAS
// ------------------------------------

// Relação 1:N - Categoria tem muitos Veiculos
Categoria.hasMany(Veiculo, { foreignKey: 'Categoria_id' });
Veiculo.belongsTo(Categoria, { foreignKey: 'Categoria_id' });

// Relação 1:N - Usuario tem muitas Locacoes
Usuario.hasMany(Locacao, { foreignKey: 'Usuario_id' });
Locacao.belongsTo(Usuario, { foreignKey: 'Usuario_id' });

// Relação 1:N - Veiculo tem muitas Locacoes
Veiculo.hasMany(Locacao, { foreignKey: 'Veiculo_id' });
Locacao.belongsTo(Veiculo, { foreignKey: 'Veiculo_id' });

module.exports = {
  sequelize,
  Categoria,
  Usuario,
  Veiculo,
  Locacao,
};