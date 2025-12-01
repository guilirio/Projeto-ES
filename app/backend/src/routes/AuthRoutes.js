const { Router } = require('express');
const AuthController = require('../controllers/AuthController');

const router = Router();

/**
 * Rota para login do usuario na plataforma
 */
router.post('/login', AuthController.login);

module.exports = router;