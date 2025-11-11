const { DataTypes } = require('sequelize');

/**
 * Tabela 'Veiculo' do banco de dados
 */

module.exports = (sequelize) => {
  sequelize.define('Veiculo', {
    placa: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    chassi: {
      type: DataTypes.STRING(17),
      allowNull: false,
      unique: true,
    },
    modelo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    quilometragem: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    situacao: {
      type: DataTypes.ENUM('DISPONIVEL', 'ALUGADO', 'MANUTENCAO'),
      allowNull: false,
    },
  });
};