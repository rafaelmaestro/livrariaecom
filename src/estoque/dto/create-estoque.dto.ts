import { IsNumber, IsString } from 'class-validator'
import { Estoque } from '../entities/estoque.entity'

export class CreateEstoqueDto extends Estoque {
    @IsString()
    sku: string

    @IsNumber()
    quantidade: number

    @IsString()
    isbn: string
}
