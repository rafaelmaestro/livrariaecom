import { EnderecoUsuario } from './endereco.entity'

export class Usuario {
    cpf: string
    nome: string
    email: string
    telefone: string
    senha: string
    endereco: EnderecoUsuario
}
