import { IsNumber, IsOptional, IsString } from 'class-validator'
import { Estoque } from '../entities/estoque.entity'

export class CreateEstoqueDto extends Estoque {
    @IsString()
    sku: string

    @IsNumber()
    quantidade: number

    @IsString()
    @IsOptional()
    isbn: string
}
