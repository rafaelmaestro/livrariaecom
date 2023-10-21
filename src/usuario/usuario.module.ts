import { Module, forwardRef } from '@nestjs/common'
import { VendaModule } from '../venda/venda.module'
import { UsuarioModel } from './models/usuario.model'
import { UsuarioController } from './usuario.controller'
import { UsuarioRepository } from './usuario.repository'
import { UsuarioService } from './usuario.service'

@Module({
    controllers: [UsuarioController],
    providers: [UsuarioService, UsuarioRepository, UsuarioModel],
    imports: [forwardRef(() => VendaModule)],
    exports: [UsuarioService, UsuarioModel],
})
export class UsuarioModule {}
