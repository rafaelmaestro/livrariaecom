import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UsuarioModel } from '../../usuario/models/usuario.model'
import { ItemCarrinhoModel } from './itemCarrinho.model'
import { PagamentoModel } from './pagamento.model'

@Entity('carrinho')
export class CarrinhoModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    codigo: number

    @Column({ length: 20, default: 'aguardando_pagamento' })
    situacao: string

    @Column()
    cpf: string

    @ManyToOne(() => UsuarioModel, (usuario) => usuario.carrinhos)
    @JoinColumn({ name: 'cpf', referencedColumnName: 'cpf' })
    usuario: UsuarioModel

    @OneToMany(() => ItemCarrinhoModel, (itemCarrinho) => itemCarrinho.carrinho, { eager: true })
    itensCarrinho: ItemCarrinhoModel[]

    @OneToOne(() => PagamentoModel, (pagamento) => pagamento.carrinho, { eager: true })
    pagamento: PagamentoModel
}
