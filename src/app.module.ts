import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Modules } from '.'
import { setEnv } from '../config'
import { OrmModuleOptions } from '../ormconfig'
import { UsuarioModule } from './usuario/usuario.module'

setEnv()

@Module({
    imports: [...Modules, TypeOrmModule?.forRoot({ ...OrmModuleOptions }), UsuarioModule],
})
export class AppModule {}
