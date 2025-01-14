const database = require('../models')
const uuid = require('uuid')

class PermissaoService{
    async cadastrar(dto) {
        const permissao = await database.permissoes.findOne({
            where: {
                nome: dto.nome
            }
        })

        if(permissao) {
            throw new Error("Permisão já cadastrada!")
        }

        try {
            const novaPermissao = await database.permissoes.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            })

            return novaPermissao;
        } catch (error) {
            throw new Error("Erro ao cadastrar permissão")
        }
    }

    async pegaTodos() {
        try {
            const permissoes = await database.permissoes.findAll()
            return permissoes;
        } catch (error) {
            throw new Error("Erro ao buscar Permissões")
        }
    }

    async pegaPorId(id) {
        const permissao = await database.permissoes.findOne({
            where: {
                id: id
            }
        })

        if(!permissao) {
            throw new Error("Permissão não cadastrada")
        }

        return permissao
    }

    async editarPorId(dto) {
        const permissao = await this.pegaPorId(dto.id)

        try {
            permissao.nome = dto.nome;
            permissao.descricao = dto.descricao;
            await permissao.save();

            return permissao
        } catch (error) {
            throw new Error("Erro ao atualizar permissão")
        }
    }

    async deletar(id) {
        const permissao = await this.pegaPorId(id)
        
        try {
            await database.permissoes.destroy({
                where: {
                    id: id
                }
            })    
        } catch (error) {
            throw new Error("Erro ao deletar permissão")
        }
    }
}

module.exports = PermissaoService