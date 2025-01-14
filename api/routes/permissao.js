const { Router } = require('express')
const router = Router()

const PermissaoController = require('../controllers/permissaoController')

router
    .post("/permissao", PermissaoController.cadastrar)
    .get("/permissao", PermissaoController.pegaTodos)
    .get("/permissao/:id", PermissaoController.pegaPorId)
    .put("/permissao/:id", PermissaoController.editarPorId)
    .delete("/permissao/:id", PermissaoController.deletar)

module.exports = router;