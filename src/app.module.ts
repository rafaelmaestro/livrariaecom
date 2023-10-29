import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Modules } from '.'
import { setEnv } from '../config'
import { OrmModuleOptions } from '../ormconfig'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'
import { EstoqueModule } from './estoque/estoque.module'
import { EMailerModule } from './mailer/mailer.module'
import { UsuarioModule } from './usuario/usuario.module'
import { CarrinhoPagoFilter } from './venda/filters/carrinho-pago.filter'
import { EstoqueInsuficienteFilter } from './venda/filters/estoque-insuficiente.filter'
import { VendaModule } from './venda/venda.module'

setEnv()

@Module({
    imports: [
        ...Modules,
        TypeOrmModule?.forRoot({ ...OrmModuleOptions }),
        ScheduleModule.forRoot(),
        UsuarioModule,
        AuthModule,
        EstoqueModule,
        VendaModule,
        EMailerModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: 'APP_FILTER',
            useValue: EstoqueInsuficienteFilter,
        },
        {
            provide: 'APP_FILTER',
            useValue: CarrinhoPagoFilter,
        },
    ],
})
export class AppModule {}
