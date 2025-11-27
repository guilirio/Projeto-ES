const { Router } = require('express');
const LocacaoController = require('../controllers/LocacaoController');

const router = Router();

/**
 * Rotas para o CRUD completo de locações
 */
router.post('/locacoes', LocacaoController.create);
router.get('/locacoes', LocacaoController.getAll);
router.get('/locacoes/:id', LocacaoController.getById);
router.put('/locacoes/:id', LocacaoController.update);
router.delete('/locacoes/:id', LocacaoController.delete);

module.exports = router;