const { Router } = require('express');
const UsuarioController = require('../controllers/UsuarioController');

const router = Router();

/**
 * Rotas para o CRUD completo de usuarios 
 */
router.post('/usuarios', UsuarioController.create);
router.get('/usuarios', UsuarioController.getAll);
router.get('/usuarios/:id', UsuarioController.getById);
router.put('/usuarios/:id', UsuarioController.update);
router.delete('/usuarios/:id', UsuarioController.delete);

module.exports = router;