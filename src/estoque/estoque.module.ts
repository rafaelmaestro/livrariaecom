import { Module } from '@nestjs/common'
import { EstoqueController } from './estoque.controller'
import { EstoqueRepository } from './estoque.repository'
import { EstoqueService } from './estoque.service'

@Module({
    controllers: [EstoqueController],
    providers: [EstoqueService, EstoqueRepository],
})
export class EstoqueModule {}
