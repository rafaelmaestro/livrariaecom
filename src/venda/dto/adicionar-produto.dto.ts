import { IsNumber, IsString } from 'class-validator'

export class AdicionarProdutoDto {
    @IsNumber()
    codigo_carrinho: number

    @IsNumber()
    quantidade: number

    @IsString()
    isbn: string
}
