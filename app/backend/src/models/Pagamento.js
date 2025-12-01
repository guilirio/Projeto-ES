const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Pagamento', {
    valor_pago: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    metodo_pagamento: {
      type: DataTypes.STRING(50), // 'PIX', 'CREDITO', etc.
      allowNull: false,
    },
  });
};