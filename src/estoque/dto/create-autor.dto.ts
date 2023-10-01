import { IsEmail, IsString } from 'class-validator'
import { Autor } from '../entities/autor.entity'

export class CreateAutorDto extends Autor {
    @IsEmail()
    email: string

    @IsString()
    nome: string
}
