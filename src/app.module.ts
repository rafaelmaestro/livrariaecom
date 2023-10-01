import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Modules } from '.'
import { setEnv } from '../config'
import { OrmModuleOptions } from '../ormconfig'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'
import { UsuarioModule } from './usuario/usuario.module'

setEnv()

@Module({
    imports: [...Modules, TypeOrmModule?.forRoot({ ...OrmModuleOptions }), UsuarioModule, AuthModule],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule {}
