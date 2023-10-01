import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UsuarioModule } from '../usuario/usuario.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
    imports: [
        UsuarioModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '30d' },
        }),
    ],
})
export class AuthModule {}
