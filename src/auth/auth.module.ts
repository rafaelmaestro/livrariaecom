import { Module } from '@nestjs/common'
import { UsuarioModule } from '../usuario/usuario.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
    imports: [UsuarioModule],
})
export class AuthModule {}
