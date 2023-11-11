import { Injectable } from '@nestjs/common'
import { UnauthorizedError } from '../auth/errors/unauthorized.error'
import { EMailerService } from '../mailer/mailer.service'
import { UsuarioService } from '../usuario/usuario.service'
import { CreateLivroDto } from './dto/create-livro.dto'
import { Livro } from './entities/livro.entity'
import { EstoqueRepository } from './estoque.repository'
import { FindAllLivros } from './interfaces/FindAllLivros'

@Injectable()
export class EstoqueService {
    constructor(
        private readonly estoqueRepository: EstoqueRepository,
        private readonly emailerService: EMailerService,
        private readonly usuarioService: UsuarioService
    ) {}
    async create(createLivroDto: CreateLivroDto): Promise<Livro> {
        createLivroDto.estoque.isbn = createLivroDto.isbn
        const livroCriado = await this.estoqueRepository.save(createLivroDto)
        return livroCriado as Livro
    }

    async findAll(pagina: number, limite: number, like?: string): Promise<FindAllLivros> {
        const estoque = await this.estoqueRepository.findAll(pagina, limite, like)
        return {
            data: estoque,
            paginacao: {
                pagina,
                limite,
                total: estoque.length,
            },
        }
    }

    async findAllAutores(pagina: number, limite: number) {
        const autores = await this.estoqueRepository.findAllAutores(pagina, limite)
        return {
            data: autores,
            paginacao: {
                pagina,
                limite,
                total: autores.length,
            },
        }
    }

    async findAllEditoras(pagina: number, limite: number) {
        const editoras = await this.estoqueRepository.findAllEditoras(pagina, limite)
        return {
            data: editoras,
            paginacao: {
                pagina,
                limite,
                total: editoras.length,
            },
        }
    }

    async alterarPreco(isbn: string, valor: number) {
        await this.estoqueRepository.alterarPreco(isbn, valor)
    }

    async alertaEstoque() {
        const estoquesBaixos = await this.estoqueRepository.alertaEstoque()

        if (estoquesBaixos.length >= 1) {
            const admins = await this.usuarioService.getAdmins()
            this.emailerService.sendMailEstoqueBaixo({
                destinatarios: admins.map((admin) => admin.email),
                produtos: estoquesBaixos,
            })
        }
    }

    async getRelatorioEstoque(cpf: string) {
        const usuario = await this.usuarioService.findByCpf(cpf)

        if (!usuario) {
            throw new Error('Usuário não encontrado')
        }

        if (usuario.admin != null) {
            const relatorio = await this.estoqueRepository.getRelatorioEstoque()
            return relatorio.map((item) => {
                return {
                    nome: item.nome,
                    isbn: item.isbn,
                    quantidade_vendida: Number(item.quantidade_vendas),
                    quantidade_em_estoque: Number(item.quantidade_em_estoque),
                }
            })
        }

        throw new UnauthorizedError('Usuário não autorizado a acessar esse recurso')
    }
}
