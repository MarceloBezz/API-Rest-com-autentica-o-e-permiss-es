const database = require('../models')
const { Op } = require('sequelize')

const permissaoRole = (listaPermissoes) => {
    return async (req, res, next) => {
        const { usuarioId } = req;

        const usuario = await database.usuarios.findOne({
            include: [{
                model: database.roles,
                as: 'usuario_roles',
                attributes: ['id', 'nome']
            }],
            where: {
                id: usuarioId
            }
        })

        if(!usuario) {
            return res.status(400).send("Usuário não cadastrado")
        }

        let listaRolesId = []

        Object.values(usuario.usuario_roles).map((role) => {
            listaRolesId.push(role.id)
        })

        if(listaRolesId.length == 0) {
            return res.status(401).send("Usuário não tem acesso a essa rota")
        }

        const roles = await database.roles.findAll({
            include: [{
                model: database.permissoes,
                as: 'roles_das_permissoes',
                attributes: ["id", "nome"]
            }],
            where: {
                id: {
                    [Op.in]: listaRolesId
                }
            }
        })

        let possuiPermissao = false

        roles.map((role) => {
            possuiPermissao = role.roles_das_permissoes
                .map((permissao) => permissao.nome)
                .some((permissao) => listaPermissoes.includes(permissao))
        })

        if (!possuiPermissao) {
            return res.status(401).send("Usuário não tem acesso a essa rota")
        }

        next()
    }
}

module.exports = permissaoRole;