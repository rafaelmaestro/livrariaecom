import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { setEnv } from './config'

setEnv()

const entities = [
    'dist/src/modules/**/infra/models/*.model{.ts,.js}',
    'dist/src/shared/infra/models/*.model{.ts,.js}',
    'dist/src/**/models/*.model{.ts,.js}',
]

const DataSourceConfig = {
    name: 'default',
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dropSchema: false,
    cache: false,
    synchronize: false,
    logging: true,
    migrations: ['dist/src/shared/infra/migrations/*{.ts,.js}'],
    entities,
    autoLoadEntities: true,
}

export const AppDataSource = new DataSource({
    ...DataSourceConfig,
    logger: 'advanced-console',
    type: 'mysql',
})

export const OrmModuleOptions: TypeOrmModuleOptions = {
    ...DataSourceConfig,
    logger: 'advanced-console',
    type: 'mysql',
}
