const RoleService = require('../services/roleService');
const roleService = new RoleService()

class roleController{
    static async cadastrar(req, res) {
        const { nome, descricao } = req.body

        try {
            const role = await roleService.cadastrar({ nome, descricao })
            
            res.status(201).send(role)
        } catch (error) {
            res.status(400).send({ error: error.message})
        }
    }

    static async pegarTodos(req, res) {
        try {
            const roles = await roleService.pegarTodos()

            res.status(200).send(roles)
        } catch (error) {
            res.status(401).send({ error: error.message })
        }
    }

    static async pegarPorId(req, res) {
        const { id } = req.params;
        try {
           const role = await roleService.pegarPorId(id)
           
           res.status(200).send(role)
        } catch (error) {
            res.status(401).send({ error: error.message })
        }
    }

    static async atualizar(req, res) {
        const { id } = req.params;
        const { nome, descricao } = req.body;
        try {
            const role = await roleService.atualizar({ id, nome, descricao });

            res.status(200).send(role)
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    static async deletar(req, res) {
        const { id } = req.params;
        try {
            await roleService.deletar(id)

            res.status(200).send("Role deletada com sucesso!")
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }
}

module.exports = roleController;