import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { UnauthorizedError } from '../auth/errors/unauthorized.error'
import { EMailerService } from '../mailer/mailer.service'
import { CreateEnderecoDto } from './dto/create-endereco.dto'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { UsuarioRepository } from './usuario.repository'

@Injectable()
export class UsuarioService {
    constructor(
        private readonly usuarioRepository: UsuarioRepository,
        private readonly emailerService: EMailerService
    ) {}
    async create(createUsuarioDto: CreateUsuarioDto) {
        const usuario: CreateUsuarioDto = {
            ...createUsuarioDto,
            senha: await bcrypt.hash(createUsuarioDto.senha, 10),
        }

        const usuarioCriado = await this.usuarioRepository.save(usuario)

        return usuarioCriado
    }

    findByEmail(email: string) {
        return this.usuarioRepository.findOneByEmail(email)
    }

    findByCpf(cpf: string) {
        return this.usuarioRepository.findOneByCpf(cpf)
    }

    async getAdmins() {
        const admins = await this.usuarioRepository.getAdmins()
        return admins
    }

    async getRelatorioUsuarios(cpf: string) {
        const usuario = await this.usuarioRepository.findOneByCpf(cpf)

        if (!usuario) {
            throw new Error('Usuário não encontrado')
        }

        if (usuario.admin != null) {
            const relatorio = await this.usuarioRepository.getRelatorioUsuario()
            const relatorioMap = relatorio.map((item) => {
                return {
                    nome: item.nome,
                    email: item.email,
                    valor_total_gasto: item.valor_total_gasto,
                }
            })

            this.emailerService.sendMailRelatorioUsuarios({
                destinatario: usuario.email,
                nome_destinatario: usuario.nome,
                relatorio: relatorioMap,
            })

            return relatorioMap
        }

        throw new UnauthorizedError('Usuário não autorizado a acessar esse recurso')
    }

    async addEndereco(cpf: string, endereco: CreateEnderecoDto) {
        return await this.usuarioRepository.addEndereco(cpf, endereco)
    }
}
