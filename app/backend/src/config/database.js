require('dotenv').config();

/**
 * Estabelece a conexão com o banco de dados a partir das
 * variáveis de ambiente definidas no arquivo '.env'
 */

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || 'mysql',
  define: {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  },
}; 