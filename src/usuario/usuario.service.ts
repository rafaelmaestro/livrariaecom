import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { UsuarioRepository } from './usuario.repository'

@Injectable()
export class UsuarioService {
    constructor(private readonly usuarioRepository: UsuarioRepository) {}
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
}
