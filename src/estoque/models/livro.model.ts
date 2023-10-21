import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm'
import { ItemCarrinhoModel } from '../../venda/models/itemCarrinho.model'
import { AutorModel } from './autor.model'
import { EditoraModel } from './editora.model'
import { EstoqueModel } from './estoque.model'

@Entity('livro')
export class LivroModel extends BaseEntity {
    @PrimaryColumn({ length: 100 })
    isbn: string

    @Column({ length: 255, nullable: false })
    nome: string

    @Column({ type: 'float', nullable: false })
    valor: number

    @Column('text', { nullable: true })
    imagem: string

    @Column({ length: 255, nullable: false })
    nome_autor: string

    @Column({ length: 55, nullable: false })
    cnpj_editora: string

    @ManyToOne(() => AutorModel, (autor) => autor.livros, { eager: true })
    @JoinColumn({ name: 'nome_autor', referencedColumnName: 'nome' })
    autor: AutorModel

    @ManyToOne(() => EditoraModel, (editora) => editora.livros, { eager: true })
    @JoinColumn({ name: 'cnpj_editora', referencedColumnName: 'cnpj' })
    editora: EditoraModel

    @OneToOne(() => EstoqueModel, (estoque) => estoque.livro, { eager: true })
    @JoinColumn({ name: 'isbn', referencedColumnName: 'isbn' })
    estoque: EstoqueModel

    @OneToMany(() => ItemCarrinhoModel, (itemCarrinho) => itemCarrinho.livro)
    itensCarrinho: ItemCarrinhoModel[]
}
