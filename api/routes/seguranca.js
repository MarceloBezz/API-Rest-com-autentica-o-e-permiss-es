const { Router } = require('express')
const router = Router()

const SegurancaController = require('../controllers/segurancaController')

router
    .post('/seguranca/acl', SegurancaController.cadastrarAcl)
    .post('/seguranca/permissoes-roles', SegurancaController.cadastrarPermissoesRoles)

module.exports = router