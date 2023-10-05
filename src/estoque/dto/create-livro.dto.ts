import { Type } from 'class-transformer'
import { IsBase64, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
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
    @IsOptional()
    imagem?: string

    @ValidateNested({
        each: true,
    })
    @Type(() => CreateAutorDto)
    autor: CreateAutorDto

    @ValidateNested({
        each: true,
    })
    @Type(() => CreateEditoraDto)
    editora: CreateEditoraDto

    @ValidateNested({
        each: true,
    })
    @Type(() => CreateEstoqueDto)
    estoque: CreateEstoqueDto
}
