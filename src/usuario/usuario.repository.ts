import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { CreateEnderecoDto } from './dto/create-endereco.dto'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { UsuarioExistenteError } from './errors/usuario-existente.error'
import { EnderecoUsuarioModel } from './models/endereco.model'
import { UsuarioModel } from './models/usuario.model'

@Injectable()
export class UsuarioRepository {
    constructor(private readonly dataSource: DataSource) {}

    async save(usuario: CreateUsuarioDto) {
        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {
            const usuarioExistente = await this.findOneByCpf(usuario.cpf)

            if (usuarioExistente) {
                throw new UsuarioExistenteError()
            }
            const usuarioCriado = await queryRunner.manager.save(UsuarioModel, usuario)
            const enderecoCriado = await queryRunner.manager.save(EnderecoUsuarioModel, usuario)

            await queryRunner.commitTransaction()
            return {
                usuario: {
                    cpf: usuarioCriado.cpf,
                    nome: usuarioCriado.nome,
                    email: usuarioCriado.email,
                    telefone: usuarioCriado.telefone,
                },
                endereco: {
                    rua: usuarioCriado.rua,
                    cep: usuarioCriado.cep,
                    estado: usuarioCriado.estado,
                    cidade: usuarioCriado.cidade,
                    id: enderecoCriado.id,
                },
            }
        } catch (error) {
            await queryRunner.rollbackTransaction()
            throw error
        } finally {
            await queryRunner.release()
        }
    }

    async findOneByEmail(email: string) {
        const usuario = await UsuarioModel.findOne({ where: { email } })
        return usuario
    }

    async findOneByCpf(cpf: string) {
        const usuario = await UsuarioModel.findOne({ where: { cpf } })

        return usuario
    }

    async getAdmins() {
        const admins = await UsuarioModel.createQueryBuilder('usuario')
            .innerJoinAndSelect('usuario.admin', 'admin')
            .getMany()

        if (admins.length === 0) {
            return []
        }

        const result = admins.map((admin) => {
            return {
                ...admin,
                senha: undefined,
            }
        })

        return result
    }

    async getRelatorioUsuario() {
        return UsuarioModel.query(`select * from top_usuarios tu;`)
    }

    async addEndereco(cpf: string, endereco: CreateEnderecoDto) {
        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {
            await UsuarioModel.query(`
                INSERT INTO endereco_usuario (cpf, rua, cep, estado, cidade)
                VALUES (
                    '${cpf}',
                    '${endereco.rua}',
                    '${endereco.cep}',
                    '${endereco.estado}',
                    '${endereco.cidade}'
                )
            `)

            await queryRunner.commitTransaction()
        } catch (error) {
            await queryRunner.rollbackTransaction()
            throw error
        } finally {
            await queryRunner.release()
        }
    }
}
