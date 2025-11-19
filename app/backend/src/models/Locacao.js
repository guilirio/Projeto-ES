const { DataTypes } = require('sequelize');

/**
 * Tabela 'Locacao' do banco de dados
 */

module.exports = (sequelize) => {
  sequelize.define('Locacao', {
    data_retirada: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_devolucao: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    valor_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('ATIVA', 'CONCLUIDA', 'CANCELADA'),
      allowNull: false,
      defaultValue: 'ATIVA',
    },
  });
};