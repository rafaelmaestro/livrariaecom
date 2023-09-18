import { BaseEntity, Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm'

export interface AppParameterModelProps {
    key: string
    value: string
    createdAt?: Date
    updatedAt?: Date
}

@Entity({ name: 'app_parameter' })
export class AppParameterModel extends BaseEntity {
    @Column({ name: 'key', type: 'varchar', primary: true })
    key: string

    @Column({ name: 'value', type: 'varchar' })
    value: string

    @CreateDateColumn({ name: 'created_at', type: 'date' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at', type: 'date' })
    updatedAt: Date

    public setProps(props: AppParameterModelProps) {
        Object.assign(this, props)
    }
}
