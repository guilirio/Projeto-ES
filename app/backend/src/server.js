require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models/index');
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
  res.send("Servidor rodando!");
});

async function startServer() {
  try {
    await sequelize.authenticate();

    console.log('[ OK ] Conexão estabelecida com o banco de dados.');

    app.listen(PORT, () => {
      console.log(`[ OK ] Servidor rodando: http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('[ FALHA ] Não foi possível conectar ao banco de dados:', error);
  }
}

startServer();