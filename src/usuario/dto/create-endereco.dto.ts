import { IsPostalCode, IsString } from 'class-validator'
import { EnderecoUsuario } from '../entities/endereco.entity'

export class CreateEnderecoDto extends EnderecoUsuario {
    @IsString()
    rua: string

    @IsString()
    @IsPostalCode('BR')
    cep: string

    @IsString()
    estado: string

    @IsString()
    cidade: string
}
