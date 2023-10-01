import { IsBase64, IsNumber, IsString } from 'class-validator'
import { Livro } from '../entities/livro.entity'
import { CreateAutorDto } from './create-autor.dto'
import { CreateEditoraDto } from './create-editora.dto'
import { CreateEstoqueDto } from './create-estoque.dto'

export class CreateLivroDto extends Livro {
    @IsString()
    isbn: string

    @IsString()
    nome: string

    @IsNumber()
    valor: number

    @IsBase64()
    imagem: string

    autor: CreateAutorDto

    editora: CreateEditoraDto

    estoque: CreateEstoqueDto
}
