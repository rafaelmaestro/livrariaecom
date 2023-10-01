import { Injectable } from '@nestjs/common'
import { CreateEstoqueDto } from './dto/create-livro.dto'
import { UpdateEstoqueDto } from './dto/update-estoque.dto'

@Injectable()
export class EstoqueService {
    create(createEstoqueDto: CreateEstoqueDto) {
        return 'This action adds a new estoque'
    }

    findAll() {
        return `This action returns all estoque`
    }

    findOne(id: number) {
        return `This action returns a #${id} estoque`
    }

    update(id: number, updateEstoqueDto: UpdateEstoqueDto) {
        return `This action updates a #${id} estoque`
    }

    remove(id: number) {
        return `This action removes a #${id} estoque`
    }
}
