import { Module, forwardRef } from '@nestjs/common'
import { EstoqueModule } from '../estoque/estoque.module'
import { UsuarioModule } from '../usuario/usuario.module'
import { CarrinhoModel } from './models/carrinho.model'
import { ItemCarrinhoModel } from './models/itemCarrinho.model'
import { VendaController } from './venda.controller'
import { VendaRepository } from './venda.repository'
import { VendaService } from './venda.service'

@Module({
    controllers: [VendaController],
    providers: [VendaService, VendaRepository, CarrinhoModel, ItemCarrinhoModel],
    exports: [ItemCarrinhoModel, CarrinhoModel],
    imports: [forwardRef(() => UsuarioModule), forwardRef(() => EstoqueModule)],
})
export class VendaModule {}
