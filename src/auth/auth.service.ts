import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { UsuarioService } from '../usuario/usuario.service'

@Injectable()
export class AuthService {
    constructor(private readonly usuarioService: UsuarioService) {}
    async validateUser(cpf: string, senha: string) {
        // throw new Error('Not implemented yet!')
        const usuario = await this.usuarioService.findByCpf(cpf)

        console.log(`USUARIO: ${JSON.stringify(usuario)}`)

        if (usuario) {
            const isSenhaValida = await bcrypt.compare(senha, usuario.senha)

            if (isSenhaValida) {
                return {
                    ...usuario,
                    senha: undefined,
                }
            }
        }

        throw new Error('Cpf ou senha fornecidos são inválidos!')
    }
}
