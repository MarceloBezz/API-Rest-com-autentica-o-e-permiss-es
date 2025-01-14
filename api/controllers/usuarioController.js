const UsuarioService = require('../services/usuarioService.js');
const usuarioService = new UsuarioService();

class UsuarioController {
    static async cadastrar(req, res) {
        try {
            const { nome, email, senha } = req.body;
    
            const usuario = await usuarioService.cadastrar({ nome, email, senha });
            
            res.status(201).send(usuario);
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async pegaTodos(req, res) {
        try {
            const usuarios = await usuarioService.pegaTodos()

            res.status(200).send(usuarios)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async pegaPorId(req, res) {
        try {
            const id = req.params.id;
            const usuario = await usuarioService.pegaPorId(id)

            res.status(200).send(usuario)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async editarPorId(req, res) {
        const { id } = req.params;
        const { nome, email } = req.body;
        try {
            const usuario = await usuarioService.editarPorId({ id, nome, email });
            res.status(200).json(usuario)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async deletarPorId(req, res) {
        const { id } = req.params;
        try {
            await usuarioService.deletarPorId(id)
            res.status(200).send("Usuário deletado com  sucesso!")
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = UsuarioController