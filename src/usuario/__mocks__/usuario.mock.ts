import { CreateUsuarioDto } from '../dto/create-usuario.dto'

export const mockUsuario = {
    criarUsuario1: () => {
        return {
            cpf: '12345678901',
            nome: 'Usuario 1',
            senha: '123456',
            telefone: '123456789',
            email: 'teste@gmail.com',
            cep: '123456',
            cidade: 'Cidade',
            endereco: 'Endereco',
            estado: 'Estado',
            rua: 'Rua',
        } as unknown as CreateUsuarioDto
    },
}
