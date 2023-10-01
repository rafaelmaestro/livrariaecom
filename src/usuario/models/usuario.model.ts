import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { EnderecoUsuarioModel } from './endereco.model'

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

    @OneToMany(() => EnderecoUsuarioModel, (endereco) => endereco.usuario, { eager: true })
    enderecos: EnderecoUsuarioModel[]
}
