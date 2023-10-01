import { IsEmail, IsPhoneNumber, IsString } from 'class-validator'
import { Editora } from '../entities/editora.entity'

export class CreateEditoraDto extends Editora {
    @IsString()
    cnpj: string

    @IsString()
    nome: string

    @IsEmail()
    email: string

    @IsPhoneNumber('BR')
    telefone: string
}
