import { Module, forwardRef } from '@nestjs/common'
import { EMailerModule } from '../mailer/mailer.module'
import { UsuarioModule } from '../usuario/usuario.module'
import { VendaModule } from '../venda/venda.module'
import { EstoqueController } from './estoque.controller'
import { EstoqueRepository } from './estoque.repository'
import { EstoqueService } from './estoque.service'
import { LivroModel } from './models/livro.model'

@Module({
    controllers: [EstoqueController],
    providers: [EstoqueService, EstoqueRepository, LivroModel],
    imports: [forwardRef(() => VendaModule), EMailerModule, forwardRef(() => UsuarioModule)],
    exports: [LivroModel],
})
export class EstoqueModule {}
