const { DataTypes } = require('sequelize');

/**
 * Tabela 'Usuario' do banco de dados
 */

module.exports = (sequelize) => {
  sequelize.define('Usuario', {
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    perfil: {
      type: DataTypes.ENUM('CLIENTE', 'ADMIN', 'FUNCIONARIO'),
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true
    },
    cnh: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
    },
    telefone: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  });
};