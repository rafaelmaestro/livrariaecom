import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { CreateEstoqueDto } from './dto/create-livro.dto'
import { UpdateEstoqueDto } from './dto/update-estoque.dto'
import { EstoqueService } from './estoque.service'

@Controller('estoque')
export class EstoqueController {
    constructor(private readonly estoqueService: EstoqueService) {}

    @Post()
    create(@Body() createEstoqueDto: CreateEstoqueDto) {
        return this.estoqueService.create(createEstoqueDto)
    }

    @Get()
    findAll() {
        return this.estoqueService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.estoqueService.findOne(+id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEstoqueDto: UpdateEstoqueDto) {
        return this.estoqueService.update(+id, updateEstoqueDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.estoqueService.remove(+id)
    }
}
