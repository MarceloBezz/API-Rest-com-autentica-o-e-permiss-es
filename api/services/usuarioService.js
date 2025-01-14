const database = require('../models')
const { hash } = require('bcryptjs')
const uuid = require('uuid')

class UsuarioService {
    async cadastrar(dto) {
        const usuario = await database.usuarios.findOne({
            where: {
                email: dto.email
            }
        })

        if(usuario) {
            throw new Error('Usuário já cadastrado')
        }

        try {
            const senhaHash = await hash(dto.senha, 8);
            const novoUsuario = await database.usuarios.create({
                id: uuid.v4(),
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash
            });
            return novoUsuario;

        } catch (error) {
            throw new Error('Erro ao cadastrar usuário')
        }
    }

    async pegaTodos(){
        try {
            const usuarios = await database.usuarios.findAll({
                include:[{
                    model: database.roles,
                    as: 'usuario_roles',
                    attributes: ['nome', 'descricao']
                },
            {
                model: database.permissoes,
                as: 'usuario_permissoes',
                attributes: ["nome", "descricao"]
            }]
            });
            return usuarios;
        } catch (error) {
            throw new Error('Erro ao buscar os usuários')
        }
    }

    async pegaPorId(id) {
        try {
            const usuario = await database.usuarios.findByPk(id);
            return usuario;
        } catch (error) {
            throw new Error('Erro ao buscar usuário')
        }
    }

    async editarPorId(dto) {
        const usuario = await this.pegaPorId(dto.id)
        try {
            usuario.nome = dto.nome;
            usuario.email = dto.email;
            await usuario.save();
            return usuario;
        } catch (error) {
            throw new Error('Erro ao editar usuário')
        }
    }

    async deletarPorId(id) {
        await this.pegaPorId(id)
        try {
            await database.usuarios.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao deletar usuário')
        }
    }
}

module.exports = UsuarioService