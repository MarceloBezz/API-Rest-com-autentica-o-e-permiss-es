const PermissaoService = require('../services/permissaoService')
const permissaoService = new PermissaoService()

class PermissaoController{
    static async cadastrar(req, res) {
        const { nome, descricao } = req.body;
        try {
            const permissao = await permissaoService.cadastrar({ nome, descricao })

            res.status(201).send(permissao)
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    static async pegaTodos(req, res) {
        try {
            const permissoes = await permissaoService.pegaTodos()

            res.status(200).send(permissoes)
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    static async pegaPorId(req, res) {
        const { id } = req.params;
        try {
            const permissao = await permissaoService.pegaPorId(id)

            res.status(200).send(permissao)
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    static async editarPorId(req, res) {
        const { id } = req.params;
        const { nome, descricao } = req.body;
        try {
            const permissaoAtualizada = await permissaoService.editarPorId({ id, nome, descricao })

            res.status(200).send(permissaoAtualizada)
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    static async deletar(req, res) {
        const { id } = req.params;
        try {
            await permissaoService.deletar(id)

            res.status(200).send("Permissão deletada com sucesso!")
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }
}

module.exports = PermissaoController;