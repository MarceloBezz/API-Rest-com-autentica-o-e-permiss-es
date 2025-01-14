const { Router } = require('express')

const router = Router();

const UsuarioController = require('../controllers/usuarioController');
const autenticado = require('../middleware/autenticado')

router.use(autenticado)

router
    .post('/usuarios', UsuarioController.cadastrar)
    .get('/usuarios', UsuarioController.pegaTodos)
    .get('/usuarios/id/:id', UsuarioController.pegaPorId)
    .put('/usuarios/id/:id', UsuarioController.editarPorId)
    .delete('/usuarios/id/:id', UsuarioController.deletarPorId)

module.exports = router;