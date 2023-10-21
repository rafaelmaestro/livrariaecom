import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm'
import { CarrinhoModel } from '../../venda/models/carrinho.model'
import { EnderecoUsuarioModel } from './endereco.model'
import { UsuarioAdminModel } from './usuario-admin.model'

@Entity('usuario')
export class UsuarioModel extends BaseEntity {
    @PrimaryColumn()
    cpf: string

    @Column()
    nome: string

    @Column()
    email: string

    @Column()
    telefone: string

    @Column()
    senha: string

    @OneToMany(() => CarrinhoModel, (carrinho) => carrinho.usuario)
    carrinhos: CarrinhoModel[]

    @OneToMany(() => EnderecoUsuarioModel, (endereco) => endereco.usuario, { eager: true })
    enderecos: EnderecoUsuarioModel[]

    @OneToOne(() => UsuarioAdminModel, (admin) => admin.usuario, { eager: true })
    admin: UsuarioAdminModel
}
