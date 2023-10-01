import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { LivroModel } from './livro.model'

@Entity('estoque')
export class EstoqueModel extends BaseEntity {
    @PrimaryColumn({ length: 25 })
    sku: string

    @Column('integer', { nullable: false })
    quantidade: number

    @PrimaryColumn({ length: 100, unique: true })
    isbn: string

    @OneToOne(() => LivroModel, (livro) => livro.estoque)
    @JoinColumn({ name: 'isbn', referencedColumnName: 'isbn' })
    livro: LivroModel
}
