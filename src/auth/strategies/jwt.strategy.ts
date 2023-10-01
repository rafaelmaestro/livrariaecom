import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserFromJwt } from '../interfaces/UserFromJwt'
import { UserPayload } from '../interfaces/UserPayload'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    async validate(payload: UserPayload): Promise<UserFromJwt> {
        return {
            cpf: payload.cpf,
            email: payload.email,
            nome: payload.nome,
        }
    }
}
