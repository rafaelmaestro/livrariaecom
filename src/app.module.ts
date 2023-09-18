import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Modules } from '.'
import { setEnv } from '../config'
import { OrmModuleOptions } from '../ormconfig'

setEnv()

@Module({
    imports: [...Modules, TypeOrmModule?.forRoot({ ...OrmModuleOptions })],
})
export class AppModule {}
