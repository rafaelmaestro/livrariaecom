import { Body, Controller, Post } from '@nestjs/common'
import { CreateLivroDto } from './dto/create-livro.dto'
import { EstoqueService } from './estoque.service'

@Controller('estoque')
export class EstoqueController {
    constructor(private readonly estoqueService: EstoqueService) {}

    @Post()
    create(@Body() createLivroDto: CreateLivroDto) {
        return this.estoqueService.create(createLivroDto)
    }
}
