import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CreateLivroDto } from './dto/create-livro.dto'
import { EstoqueService } from './estoque.service'

@Controller('estoque')
export class EstoqueController {
    constructor(private readonly estoqueService: EstoqueService) {}

    @Post()
    create(@Body() createLivroDto: CreateLivroDto) {
        return this.estoqueService.create(createLivroDto)
    }

    @Get()
    findAll(@Query('pagina') pagina: number, @Query('limite') limite: number) {
        return this.estoqueService.findAll(pagina, limite)
    }

    @Get('/autores')
    findAllAutores(@Query('pagina') pagina: number, @Query('limite') limite: number) {
        return this.estoqueService.findAllAutores(pagina, limite)
    }

    @Get('/editoras')
    findAllEditoras(@Query('pagina') pagina: number, @Query('limite') limite: number) {
        return this.estoqueService.findAllEditoras(pagina, limite)
    }
}
