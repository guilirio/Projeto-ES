const { DataTypes } = require('sequelize');

/**
 * Tabela 'Categora' do banco de dados
 */

module.exports = (sequelize) => { 
  sequelize.define('Categoria', {
    nome: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    valor_diaria: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });
};