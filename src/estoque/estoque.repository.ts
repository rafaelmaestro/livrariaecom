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
            const [livroCriado, autorCriado, editoraCriada, estoqueCriado] = await Promise.all([
                queryRunner.manager.save(AutorModel, estoque),
                queryRunner.manager.save(EditoraModel, estoque),
                queryRunner.manager.save(LivroModel, estoque),
                queryRunner.manager.save(EstoqueModel, estoque),
            ])

            console.log(`Livro criado: ${JSON.stringify(livroCriado)}`)
            console.log(`Autor criado: ${JSON.stringify(autorCriado)}`)
            console.log(`Editora criada: ${JSON.stringify(editoraCriada)}`)
            console.log(`Estoque criado: ${JSON.stringify(estoqueCriado)}`)

            await queryRunner.commitTransaction()
            return 'not implemented'
        } catch (error) {
            await queryRunner.rollbackTransaction()
            throw error
        } finally {
            await queryRunner.release()
        }
    }
}
