import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { LivroModel } from './livro.model'

@Entity('editora')
export class EditoraModel extends BaseEntity {
    @PrimaryColumn({ length: 55 })
    cnpj: string

    @Column({ length: 255, nullable: false })
    nome: string

    @Column({ length: 20, nullable: false })
    telefone: string

    @Column({ length: 155, nullable: false })
    email: string

    @OneToMany(() => LivroModel, (livro) => livro.editora)
    livros: LivroModel[]
}
