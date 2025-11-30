const { Router } = require('express');
const PagamentoController = require('../controllers/PagamentoController');

const router = Router();

/**
 * Rotas para o CRUD completo de Pagamento
 */
router.post('/pagamentos', PagamentoController.create);
router.get('/pagamentos', PagamentoController.getAll);
router.get('/pagamentos/:id', PagamentoController.getById);
router.put('/pagamentos/:id', PagamentoController.update);
router.delete('/pagamentos/:id', PagamentoController.delete);

module.exports = router;