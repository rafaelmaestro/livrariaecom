import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { CarrinhoModel } from './carrinho.model'
import { NfePagamentoModel } from './nfePagamento.model'

@Entity('pagamento')
export class PagamentoModel extends BaseEntity {
    @PrimaryColumn()
    nsu: number

    @Column('float', { nullable: false })
    valor_total: number

    @Column('date', { nullable: false })
    data_pagamento: Date

    @Column({ length: 10, nullable: false })
    forma_pagamento: string

    @Column()
    codigo_carrinho: number

    @OneToOne(() => CarrinhoModel, (carrinho) => carrinho.pagamento)
    @JoinColumn({ name: 'codigo_carrinho', referencedColumnName: 'codigo' })
    carrinho: CarrinhoModel

    @OneToOne(() => NfePagamentoModel, (nfePagamento) => nfePagamento.pagamento)
    nfePagamento: NfePagamentoModel
}
