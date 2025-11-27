const { Router } = require('express');
const usuarioRoutes = require('./UsuarioRoutes');
const authRoutes = require('./AuthRoutes');
const veiculoRoutes = require('./VeiculoRoutes');
const locacaoRoutes = require('./LocacaoRoutes');

/**
 * Arquivo responsável por agrupar todas as rotas
 */

const router = Router();

router.use(usuarioRoutes);
router.use(authRoutes);
router.use(veiculoRoutes);
router.use(locacaoRoutes);

module.exports = router;