import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { LivroModel } from '../../estoque/models/livro.model'
import { CarrinhoModel } from './carrinho.model'

@Entity('itens_carrinho')
export class ItemCarrinhoModel extends BaseEntity {
    @PrimaryColumn()
    codigo_carrinho: number

    @PrimaryColumn({ length: 100 })
    isbn: string

    @ManyToOne(() => CarrinhoModel, (carrinho) => carrinho.itensCarrinho)
    carrinho: CarrinhoModel

    @ManyToOne(() => LivroModel, (livro) => livro.itensCarrinho, { eager: true })
    livro: LivroModel

    quantidade: number
}
