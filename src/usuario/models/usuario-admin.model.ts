import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { UsuarioModel } from './usuario.model'

@Entity('usuario_admin')
export class UsuarioAdminModel extends BaseEntity {
    @PrimaryColumn()
    cpf: string

    @Column()
    setor: string

    @OneToOne(() => UsuarioModel, (usuario) => usuario.admin, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cpf', referencedColumnName: 'cpf' })
    usuario: UsuarioModel
}
