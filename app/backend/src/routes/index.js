const { Router } = require('express');
const usuarioRoutes = require('./UsuarioRoutes');

/**
 * Arquivo responsável por agrupar todas as rotas
 */

const router = Router();

router.use(usuarioRoutes);
// router.use(veiculoRoutes);
// router.use(categoriaRoutes);
// router.use(locacaoRoutes);

module.exports = router;