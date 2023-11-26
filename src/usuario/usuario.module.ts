import { Module, forwardRef } from '@nestjs/common'
import { EMailerModule } from '../mailer/mailer.module'
import { VendaModule } from '../venda/venda.module'
import { UsuarioModel } from './models/usuario.model'
import { UsuarioController } from './usuario.controller'
import { UsuarioRepository } from './usuario.repository'
import { UsuarioService } from './usuario.service'

@Module({
    controllers: [UsuarioController],
    providers: [UsuarioService, UsuarioRepository, UsuarioModel],
    imports: [forwardRef(() => VendaModule), EMailerModule],
    exports: [UsuarioService, UsuarioModel],
})
export class UsuarioModule {}
