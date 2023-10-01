import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'cpf', passwordField: 'senha' })
    }

    validate(cpf: string, senha: string) {
        return this.authService.validateUser(cpf, senha)
    }
}
