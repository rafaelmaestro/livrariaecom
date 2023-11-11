import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { IsPublic } from '../auth/decorators/is-public.decorator'
import { Usuario } from '../usuario/entities/usuario.entity'
import { CreateLivroDto } from './dto/create-livro.dto'
import { EstoqueService } from './estoque.service'

@Controller('estoque')
export class EstoqueController {
    constructor(private readonly estoqueService: EstoqueService) {}

    @Post()
    create(@Body() createLivroDto: CreateLivroDto) {
        return this.estoqueService.create(createLivroDto)
    }

    @IsPublic()
    @Get()
    findAll(@Query('pagina') pagina: number, @Query('limite') limite: number, @Query('like') like?: string) {
        return this.estoqueService.findAll(pagina, limite, like)
    }

    @Get('/autores')
    findAllAutores(@Query('pagina') pagina: number, @Query('limite') limite: number) {
        return this.estoqueService.findAllAutores(pagina, limite)
    }

    @Get('/editoras')
    findAllEditoras(@Query('pagina') pagina: number, @Query('limite') limite: number) {
        return this.estoqueService.findAllEditoras(pagina, limite)
    }

    @Post('/:isbn/alterar-preco')
    alterarPreco(@Body('valor') valor: number, @Param('isbn') isbn: string) {
        return this.estoqueService.alterarPreco(isbn, valor)
    }

    // @IsPublic()
    @Cron(CronExpression.EVERY_10_MINUTES)
    async alertaEstoque() {
        return await this.estoqueService.alertaEstoque()
    }

    @Get('/relatorio')
    async getRelatorioEstoque(@CurrentUser() user: Usuario) {
        return await this.estoqueService.getRelatorioEstoque(user.cpf)
    }
}
