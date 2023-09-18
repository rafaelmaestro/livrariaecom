import { Module } from '@nestjs/common'
import { AppParameterMapper } from './infra/mapper/AppParameter.mapper'
import { AppParameterRepositoryImpl } from './infra/repositories/AppParameterImpl.repository'
import { AppParameterServiceImpl } from './infra/service/AppParameterImpl.service'
import { SharedController } from './shared.controller'

@Module({
    controllers: [SharedController],
    providers: [
        {
            provide: 'AppParameterRepository',
            useClass: AppParameterRepositoryImpl,
        },
        {
            provide: 'AppParameterMapper',
            useClass: AppParameterMapper,
        },
        {
            provide: 'AppParameterService',
            useClass: AppParameterServiceImpl,
        },
    ],
    exports: ['AppParameterService', 'AppParameterRepository', 'AppParameterMapper'],
})
export class SharedModule {}
