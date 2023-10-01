import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UsuarioModel } from './usuario.model'

@Entity('endereco_usuario')
export class EnderecoUsuarioModel {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    rua: string

    @Column()
    cep: string

    @Column()
    estado: string

    @Column()
    cidade: string

    @Column()
    cpf: string

    @ManyToOne(() => UsuarioModel, (usuario) => usuario.enderecos) // Relação ManyToOne com a entidade de usuário
    @JoinColumn({ name: 'cpf', referencedColumnName: 'cpf' }) // Chave estrangeira
    usuario: UsuarioModel
}
