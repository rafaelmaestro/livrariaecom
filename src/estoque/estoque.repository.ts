import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { CreateLivroDto } from './dto/create-livro.dto'
import { AutorModel } from './models/autor.model'
import { EditoraModel } from './models/editora.model'
import { EstoqueModel } from './models/estoque.model'
import { LivroModel } from './models/livro.model'

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
                imagem: null,
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

    findAll(pagina: number, limite: number) {
        return LivroModel.find({
            relations: ['autor', 'editora', 'estoque'],
            skip: pagina,
            take: limite,
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
}
