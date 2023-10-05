import { Injectable } from '@nestjs/common'
import { CreateLivroDto } from './dto/create-livro.dto'
import { Livro } from './entities/livro.entity'
import { EstoqueRepository } from './estoque.repository'
import { FindAllLivros } from './interfaces/FindAllLivros'

@Injectable()
export class EstoqueService {
    constructor(private readonly estoqueRepository: EstoqueRepository) {}
    async create(createLivroDto: CreateLivroDto): Promise<Livro> {
        createLivroDto.estoque.isbn = createLivroDto.isbn
        const livroCriado = await this.estoqueRepository.save(createLivroDto)
        return livroCriado as Livro
    }

    async findAll(pagina: number, limite: number): Promise<FindAllLivros> {
        const estoque = await this.estoqueRepository.findAll(pagina, limite)
        return {
            data: estoque,
            paginacao: {
                pagina,
                limite,
                total: estoque.length,
            },
        }
    }
}
