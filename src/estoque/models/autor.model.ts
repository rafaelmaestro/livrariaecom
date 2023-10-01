import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm'
import { LivroModel } from './livro.model'

@Entity('autor')
@Index('idx_nome', ['nome'])
export class AutorModel extends BaseEntity {
    @PrimaryColumn({ length: 155 })
    email: string

    @Column({ length: 255, nullable: false })
    nome: string

    @OneToMany(() => LivroModel, (livro) => livro.autor)
    livros: LivroModel[]
}
