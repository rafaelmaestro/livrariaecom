import { Injectable } from '@nestjs/common'
import { CreateLivroDto } from './dto/create-livro.dto'
import { EstoqueRepository } from './estoque.repository'

@Injectable()
export class EstoqueService {
    constructor(private readonly estoqueRepository: EstoqueRepository) {}
    async create(createLivroDto: CreateLivroDto) {
        await this.estoqueRepository.save(createLivroDto)
        return 'This action adds a new estoque'
    }
}
