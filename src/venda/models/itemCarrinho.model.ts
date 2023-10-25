import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { LivroModel } from '../../estoque/models/livro.model'
import { CarrinhoModel } from './carrinho.model'

@Entity('itens_carrinho')
export class ItemCarrinhoModel extends BaseEntity {
    @PrimaryColumn()
    codigo_carrinho: number

    @PrimaryColumn({ length: 100 })
    isbn: string

    @ManyToOne(() => CarrinhoModel, (carrinho) => carrinho.itens_carrinho)
    @JoinColumn({ name: 'codigo_carrinho', referencedColumnName: 'codigo' })
    carrinho: CarrinhoModel

    @ManyToOne(() => LivroModel, (livro) => livro.itensCarrinho, { eager: true })
    @JoinColumn({ name: 'isbn', referencedColumnName: 'isbn' })
    livro: LivroModel

    @Column()
    quantidade: number
}
