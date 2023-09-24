import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { SharedModule } from '../../shared/shared.module'
import { EstoqueController } from './estoque.controller'

@Module({
    imports: [CqrsModule, SharedModule],
    controllers: [EstoqueController],
    providers: [],
})
export class EstoqueModule {}
