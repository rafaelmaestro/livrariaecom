import { IsString } from 'class-validator'

export class CreateCarrinhoDto {
    @IsString()
    cpf: string
}
