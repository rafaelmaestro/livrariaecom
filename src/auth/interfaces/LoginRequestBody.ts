import { IsString } from 'class-validator'

export class LoginRequestBody {
    @IsString()
    cpf: string

    @IsString()
    senha: string
}
