import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { setEnv } from './config'

setEnv()

const entities = ['dist/src/modules/**/infra/models/*.model{.ts,.js}', 'dist/src/shared/infra/models/*.model{.ts,.js}']

const DataSourceConfig: TypeOrmModuleOptions = {
    name: 'default',
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    dropSchema: false,
    cache: false,
    synchronize: false,
    logging: true,
    extra: {
        poolSize: 10,
        connectionTimeoutMillis: 2000,
        QUERY_TIMEOUT: 1000,
        statement_timeout: 1000,
        poolTimeout: 1000,
    },
    migrations: ['dist/src/shared/infra/migrations/*{.ts,.js}'],
    entities,
    autoLoadEntities: true,
}

export const AppDataSource: TypeOrmModuleOptions = {
    ...DataSourceConfig,
    logger: 'advanced-console',
}

export const OrmModuleOptions: TypeOrmModuleOptions = {
    ...DataSourceConfig,
    logger: 'advanced-console',
}
