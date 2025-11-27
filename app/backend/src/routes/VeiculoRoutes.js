const { Router } = require('express');
const VeiculoController = require('../controllers/VeiculoController');

const router = Router();

/**
 * Rotas para o CRUD completo de Veículos
 */
router.post('/veiculos', VeiculoController.create);
router.get('/veiculos', VeiculoController.getAll);
router.get('/veiculos/:id', VeiculoController.getById);
router.put('/veiculos/:id', VeiculoController.update);
router.delete('/veiculos/:id', VeiculoController.delete);

module.exports = router;