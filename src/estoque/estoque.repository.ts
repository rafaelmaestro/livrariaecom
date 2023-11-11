import { Injectable } from '@nestjs/common'
import { DataSource, Like } from 'typeorm'
import { CreateLivroDto } from './dto/create-livro.dto'
import { AutorModel } from './models/autor.model'
import { EditoraModel } from './models/editora.model'
import { EstoqueModel } from './models/estoque.model'
import { LivroModel } from './models/livro.model'
import { default_image } from './utils/default_image'

@Injectable()
export class EstoqueRepository {
    constructor(private readonly dataSource: DataSource) {}

    async save(estoque: CreateLivroDto) {
        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {
            const autorCriado = await queryRunner.manager.save(AutorModel, estoque.autor)
            const editoraCriada = await queryRunner.manager.save(EditoraModel, estoque.editora)
            const livroCriado = await queryRunner.manager.save(LivroModel, estoque)
            const estoqueCriado = await queryRunner.manager.save(EstoqueModel, estoque.estoque)

            const livro = {
                isbn: livroCriado.isbn,
                nome: livroCriado.nome,
                valor: livroCriado.valor,
                imagem: livroCriado.imagem || default_image,
                editora: {
                    cnpj: editoraCriada.cnpj,
                    nome: editoraCriada.nome,
                    telefone: editoraCriada.telefone,
                    email: editoraCriada.email,
                },
                autor: {
                    email: autorCriado.email,
                    nome: autorCriado.nome,
                },
                estoque: {
                    sku: estoqueCriado.sku,
                    quantidade: estoqueCriado.quantidade,
                },
            }

            await queryRunner.commitTransaction()
            return livro
        } catch (error) {
            await queryRunner.rollbackTransaction()
            throw error
        } finally {
            await queryRunner.release()
        }
    }

    findAll(pagina: number, limite: number, like?: string) {
        let whereClause = {}

        if (like) {
            whereClause = {
                nome: Like(`%${like}%`),
            }
        }

        return LivroModel.find({
            relations: ['autor', 'editora', 'estoque'],
            skip: pagina,
            take: limite,
            where: whereClause,
        })
    }

    findAllEditoras(pagina: number, limite: number) {
        return EditoraModel.find({
            skip: pagina,
            take: limite,
        })
    }
    findAllAutores(pagina: number, limite: number) {
        return AutorModel.find({
            skip: pagina,
            take: limite,
        })
    }

    async alterarPreco(isbn: string, valor: number) {
        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            await queryRunner.manager.query(`
                UPDATE livro SET valor = ${valor} WHERE isbn = '${isbn}';
            `)
            await queryRunner.commitTransaction()
        } catch (error) {
            await queryRunner.rollbackTransaction()
            throw error
        } finally {
            await queryRunner.release()
        }
    }

    async alertaEstoque() {
        return LivroModel.query(`select * from public.prioridade_estoque pe;`)
    }

    getRelatorioEstoque() {
        return LivroModel.query(`
            select livro.nome, livro.isbn, t.quantidade_vendas, estoque.quantidade quantidade_em_estoque
            from livro
            inner join (select isbn, count(isbn) quantidade_vendas 
                from itens_carrinho group by isbn) t on t.isbn = livro.isbn
            inner join estoque on estoque.isbn = livro.isbn
            order by t.quantidade_vendas desc;
        `)
    }
}
