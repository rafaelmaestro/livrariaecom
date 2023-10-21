import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { PagamentoModel } from './pagamento.model'

@Entity('nfe_pagamento')
export class NfePagamentoModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    codigo: number

    @Column({ length: 255, nullable: false })
    xml: string

    @Column({ unique: true, nullable: false })
    nsu: number

    @OneToOne(() => PagamentoModel, (pagamento) => pagamento.nfePagamento)
    pagamento: PagamentoModel
}
