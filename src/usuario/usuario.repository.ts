import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
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
            const [usuarioCriado, enderecoCriado] = await Promise.all([
                queryRunner.manager.save(UsuarioModel, usuario),
                queryRunner.manager.save(EnderecoUsuarioModel, usuario),
            ])

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
}
