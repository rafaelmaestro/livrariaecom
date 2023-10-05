import { Autor } from './autor.entity'
import { Editora } from './editora.entity'
import { Estoque } from './estoque.entity'

export class Livro {
    isbn: string
    nome: string
    valor: number
    imagem?: string
    editora: Editora
    autor: Autor
    estoque: Estoque
}
