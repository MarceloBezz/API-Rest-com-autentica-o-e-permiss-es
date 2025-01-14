const database = require('../models')
const uuid = require('uuid')

class roleService {
    async cadastrar(dto) {
        const role = await database.roles.findOne({
            where: {
                nome: dto.nome
            }
        })

        if(role) {
            throw new Error("Role já cadastrada!")
        }

        try {
            const newRole = await database.roles.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            });

            return newRole;
        } catch (error) {
            throw new Error("Erro ao cadastrar Role")
        }
     }

     async pegarTodos() {
        try {
            const roles = await database.roles.findAll()
            return roles
        } catch (error) {
            throw new Error("Erro ao buscar as Roles")
        }
     }

     async pegarPorId(id) {
        try {
        const roleId = await database.roles.findOne({
            where: {
                id: id
            }
        })

        if(!roleId) {
            throw new Error("Role não cadastrada")
        }
        
        return roleId    
        } catch (error) {
            throw new Error(error.message)
        }
     }

     async atualizar(dto) {
        const role = await this.pegarPorId(dto.id)
        try {
        role.nome = dto.nome;
        role.descricao = dto.descricao;
        await role.save();

        return role;
        } catch (error) {
            throw new Error("Erro ao atualizar Role")
        }
     }

     async deletar(id) {
        const role = await this.pegarPorId(id)

        try {
            await database.roles.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error("Erro ao deletar Role")
        }
     }
}

module.exports = roleService;