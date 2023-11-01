import { setEnv } from '../../config'
import { mockUsuario } from './__mocks__/usuario.mock'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { UsuarioRepository } from './usuario.repository'
import { UsuarioService } from './usuario.service'

setEnv()

const UsuarioRepositoryMock = UsuarioRepository as unknown as jest.Mock<UsuarioRepository>

const sutFactory = () => {
    const usuarioRepositoryMock = new UsuarioRepositoryMock() as jest.Mocked<UsuarioRepository>
    const sut = new UsuarioService(usuarioRepositoryMock)
    return { sut, usuarioRepositoryMock }
}

describe(`${UsuarioService.name} suite`, () => {
    it(`deve estar definido`, () => {
        const { sut } = sutFactory()
        expect(sut).toBeDefined()
    })

    describe(`${UsuarioService.prototype.create.name}()`, () => {
        it(`deve estar definido`, () => {
            const { sut } = sutFactory()
            expect(sut.create).toBeDefined()
        })

        it(`deve retornar o usuario criado`, async () => {
            const { sut, usuarioRepositoryMock } = sutFactory()

            const usuario = mockUsuario.criarUsuario1() as CreateUsuarioDto

            jest.spyOn(usuarioRepositoryMock, 'save').mockResolvedValueOnce({
                usuario: {
                    cpf: usuario.cpf,
                    email: usuario.email,
                    nome: usuario.nome,
                    telefone: usuario.telefone,
                },
                endereco: {
                    cep: usuario.cep,
                    cidade: usuario.cidade,
                    estado: usuario.estado,
                    rua: usuario.rua,
                    id: 1,
                },
            })
            const result = await sut.create(usuario)
            expect(result.usuario).toBeDefined()
            expect(result.endereco).toBeDefined()
        })
    })

    describe(`${UsuarioService.prototype.findByEmail.name}()`, () => {
        it(`deve estar definido`, () => {
            const { sut } = sutFactory()
            expect(sut.findByEmail).toBeDefined()
        })

        it(`deve retornar o usuario encontrado`, async () => {
            const { sut, usuarioRepositoryMock } = sutFactory()

            const usuario = mockUsuario.criarUsuario1() as CreateUsuarioDto

            jest.spyOn(usuarioRepositoryMock, 'findOneByEmail').mockResolvedValueOnce(true as any)
            const result = await sut.findByEmail(usuario.email)
            expect(result).toBeDefined()
        })
    })

    describe(`${UsuarioService.prototype.findByCpf.name}()`, () => {
        it(`deve estar definido`, () => {
            const { sut } = sutFactory()
            expect(sut.findByCpf).toBeDefined()
        })

        it(`deve retornar o usuario encontrado`, async () => {
            const { sut, usuarioRepositoryMock } = sutFactory()

            const usuario = mockUsuario.criarUsuario1() as CreateUsuarioDto

            jest.spyOn(usuarioRepositoryMock, 'findOneByCpf').mockResolvedValueOnce(true as any)
            const result = await sut.findByCpf(usuario.cpf)
            expect(result).toBeDefined()
        })
    })

    describe(`${UsuarioService.prototype.getAdmins.name}()`, () => {
        it(`deve estar definido`, () => {
            const { sut } = sutFactory()
            expect(sut.getAdmins).toBeDefined()
        })

        it(`deve retornar os admins encontrados`, async () => {
            const { sut, usuarioRepositoryMock } = sutFactory()

            jest.spyOn(usuarioRepositoryMock, 'getAdmins').mockResolvedValueOnce(true as any)
            const result = await sut.getAdmins()
            expect(result).toBeDefined()
        })
    })

    describe(`${UsuarioService.prototype.getRelatorioUsuarios.name}()`, () => {
        it(`deve estar definido`, () => {
            const { sut } = sutFactory()
            expect(sut.getRelatorioUsuarios).toBeDefined()
        })

        it(`deve retornar erro caso o usuario nao seja encontrado`, async () => {
            const { sut, usuarioRepositoryMock } = sutFactory()

            jest.spyOn(usuarioRepositoryMock, 'findOneByCpf').mockResolvedValueOnce(false as any)
            await expect(sut.getRelatorioUsuarios('123')).rejects.toThrowError('Usuário não encontrado')
        })

        it(`deve retornar erro caso o usuario nao seja admin`, async () => {
            const { sut, usuarioRepositoryMock } = sutFactory()

            jest.spyOn(usuarioRepositoryMock, 'findOneByCpf').mockResolvedValueOnce({
                admin: null,
            } as any)
            await expect(sut.getRelatorioUsuarios('123')).rejects.toThrowError(
                'Usuário não autorizado a acessar esse recurso'
            )
        })

        it(`deve retornar o relatorio de usuarios`, async () => {
            const { sut, usuarioRepositoryMock } = sutFactory()

            jest.spyOn(usuarioRepositoryMock, 'findOneByCpf').mockResolvedValueOnce({
                admin: true,
            } as any)

            jest.spyOn(usuarioRepositoryMock, 'getRelatorioUsuario').mockResolvedValueOnce([
                {
                    nome: 'nome',
                    email: 'email',
                    valor_total_gasto: 10,
                },
            ])

            const result = await sut.getRelatorioUsuarios('123')
            expect(result).toBeDefined()
            expect(result).toEqual([
                {
                    nome: 'nome',
                    email: 'email',
                    valor_total_gasto: 10,
                },
            ])
        })
    })

    describe(`${UsuarioService.prototype.addEndereco.name}()`, () => {
        it(`deve estar definido`, () => {
            const { sut } = sutFactory()
            expect(sut.addEndereco).toBeDefined()
        })

        it(`deve retornar sucesso ao adicionar endereco`, async () => {
            const { sut, usuarioRepositoryMock } = sutFactory()

            jest.spyOn(usuarioRepositoryMock, 'addEndereco').mockResolvedValueOnce(true as any)
            const result = await sut.addEndereco('123', {} as any)
            expect(result).toBeDefined()
        })
    })
})
