const { Router } = require('express')
const router = Router()

const RoleController = require('../controllers/roleController')

router
    .post('/roles', RoleController.cadastrar)
    .get('/role', RoleController.pegarTodos)
    .get('/role/:id', RoleController.pegarPorId)
    .put('/role/:id', RoleController.atualizar)
    .delete('/role/:id', RoleController.deletar)

module.exports = router