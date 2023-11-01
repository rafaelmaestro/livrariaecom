import { setEnv } from '../../config'
import { EMailerService } from '../mailer/mailer.service'
import { UsuarioService } from '../usuario/usuario.service'
import { CreateAutorDto } from './dto/create-autor.dto'
import { CreateEditoraDto } from './dto/create-editora.dto'
import { CreateEstoqueDto } from './dto/create-estoque.dto'
import { CreateLivroDto } from './dto/create-livro.dto'
import { EstoqueRepository } from './estoque.repository'
import { EstoqueService } from './estoque.service'

setEnv()

const EstoqueRepositoryMock = EstoqueRepository as unknown as jest.Mock<EstoqueRepository>
const EMailerServiceMock = EMailerService as unknown as jest.Mock<EMailerService>
const UsuarioServiceMock = UsuarioService as unknown as jest.Mock<UsuarioService>

const sutFactory = () => {
    const estoqueRepositoryMock = new EstoqueRepositoryMock() as jest.Mocked<EstoqueRepository>
    const emailerServiceMock = new EMailerServiceMock() as jest.Mocked<EMailerService>
    const usuarioServiceMock = new UsuarioServiceMock() as jest.Mocked<UsuarioService>
    const sut = new EstoqueService(estoqueRepositoryMock, emailerServiceMock, usuarioServiceMock)
    return { sut, estoqueRepositoryMock, emailerServiceMock, usuarioServiceMock }
}

describe(`${EstoqueService.name} suite`, () => {
    it(`deve estar definido`, () => {
        const { sut } = sutFactory()
        expect(sut).toBeDefined()
    })

    describe(`${EstoqueService.prototype.create.name}()`, () => {
        it(`deve estar definido`, () => {
            const { sut } = sutFactory()
            expect(sut.create).toBeDefined()
        })

        it(`deve retornar o livro criado`, async () => {
            const { sut, estoqueRepositoryMock } = sutFactory()

            const livro = {
                isbn: '1234567890123',
                titulo: 'Livro 1',
                valor: 10,
                estoque: {
                    quantidade: 10,
                    isbn: '1234567890123',
                    sku: '1234567890123',
                } as CreateEstoqueDto,
                autor: {
                    email: 'email@gmail.com',
                    nome: 'Autor 1',
                } as CreateAutorDto,
                editora: {
                    cnpj: '12345678901234',
                    email: 'email2@gmail.com',
                    nome: 'Editora 1',
                    telefone: '123456789',
                } as CreateEditoraDto,
            } as unknown as CreateLivroDto

            jest.spyOn(estoqueRepositoryMock, 'save').mockResolvedValueOnce(livro as any)
            const result = await sut.create(livro)
            expect(result).toBeDefined()
        })
    })

    describe(`${EstoqueService.prototype.findAll.name}()`, () => {
        it(`deve estar definido`, () => {
            const { sut } = sutFactory()
            expect(sut.findAll).toBeDefined()
        })

        it(`deve retornar os livros encontrados`, async () => {
            const { sut, estoqueRepositoryMock } = sutFactory()

            jest.spyOn(estoqueRepositoryMock, 'findAll').mockResolvedValueOnce([])
            const result = await sut.findAll(1, 10)
            expect(result).toStrictEqual({
                data: [],
                paginacao: {
                    pagina: 1,
                    limite: 10,
                    total: 0,
                },
            })
        })
    })

    describe(`${EstoqueService.prototype.findAllAutores.name}()`, () => {
        it(`deve estar definido`, () => {
            const { sut } = sutFactory()
            expect(sut.findAllAutores).toBeDefined()
        })

        it(`deve retornar os autores encontrados`, async () => {
            const { sut, estoqueRepositoryMock } = sutFactory()

            jest.spyOn(estoqueRepositoryMock, 'findAllAutores').mockResolvedValueOnce([])
            const result = await sut.findAllAutores(1, 10)
            expect(result).toStrictEqual({
                data: [],
                paginacao: {
                    pagina: 1,
                    limite: 10,
                    total: 0,
                },
            })
        })
    })

    describe(`${EstoqueService.prototype.findAllEditoras.name}()`, () => {
        it(`deve estar definido`, () => {
            const { sut } = sutFactory()
            expect(sut.findAllEditoras).toBeDefined()
        })

        it(`deve retornar as editoras encontradas`, async () => {
            const { sut, estoqueRepositoryMock } = sutFactory()

            jest.spyOn(estoqueRepositoryMock, 'findAllEditoras').mockResolvedValueOnce([])
            const result = await sut.findAllEditoras(1, 10)
            expect(result).toStrictEqual({
                data: [],
                paginacao: {
                    pagina: 1,
                    limite: 10,
                    total: 0,
                },
            })
        })
    })

    describe(`${EstoqueService.prototype.alterarPreco.name}()`, () => {
        it(`deve estar definido`, () => {
            const { sut } = sutFactory()
            expect(sut.alterarPreco).toBeDefined()
        })

        it(`deve alterar o preço do livro`, async () => {
            const { sut, estoqueRepositoryMock } = sutFactory()

            jest.spyOn(estoqueRepositoryMock, 'alterarPreco').mockResolvedValueOnce()
            await sut.alterarPreco('1234567890123', 10)
        })
    })

    describe(`${EstoqueService.prototype.alertaEstoque.name}()`, () => {
        it(`deve estar definido`, () => {
            const { sut } = sutFactory()
            expect(sut.alertaEstoque).toBeDefined()
        })

        it(`deve enviar email de alerta de estoque baixo`, async () => {
            const { sut, estoqueRepositoryMock, emailerServiceMock, usuarioServiceMock } = sutFactory()

            jest.spyOn(estoqueRepositoryMock, 'alertaEstoque').mockResolvedValueOnce([
                {
                    titulo: 'Livro 1',
                    quantidade: 10,
                },
            ] as any)

            jest.spyOn(usuarioServiceMock, 'getAdmins').mockResolvedValueOnce([
                {
                    email: 'teste@gmail.com',
                },
            ] as any)

            jest.spyOn(emailerServiceMock, 'sendMailEstoqueBaixo').mockResolvedValueOnce()
            await sut.alertaEstoque()
        })
    })

    describe(`${EstoqueService.prototype.getRelatorioEstoque.name}()`, () => {
        it(`deve estar definido`, () => {
            const { sut } = sutFactory()
            expect(sut.getRelatorioEstoque).toBeDefined()
        })

        it(`deve retornar erro se usuario não for encontrado`, async () => {
            const { sut, usuarioServiceMock } = sutFactory()

            jest.spyOn(usuarioServiceMock, 'findByCpf').mockResolvedValueOnce(false as any)
            await expect(sut.getRelatorioEstoque('123')).rejects.toThrowError('Usuário não encontrado')
        })

        it(`deve retornar erro se usuario não for admin`, async () => {
            const { sut, usuarioServiceMock } = sutFactory()

            jest.spyOn(usuarioServiceMock, 'findByCpf').mockResolvedValueOnce({
                admin: null,
            } as any)
            await expect(sut.getRelatorioEstoque('123')).rejects.toThrowError(
                'Usuário não autorizado a acessar esse recurso'
            )
        })

        it(`deve retornar o relatorio de estoque`, async () => {
            const { sut, usuarioServiceMock, estoqueRepositoryMock } = sutFactory()

            jest.spyOn(usuarioServiceMock, 'findByCpf').mockResolvedValueOnce({
                admin: true,
            } as any)

            jest.spyOn(estoqueRepositoryMock, 'getRelatorioEstoque').mockResolvedValueOnce([
                {
                    nome: 'nome',
                    isbn: 'isbn',
                    quantidade_vendas: 10,
                    quantidade_em_estoque: 10,
                },
            ] as any)

            const result = await sut.getRelatorioEstoque('123')
            expect(result).toStrictEqual([
                {
                    nome: 'nome',
                    isbn: 'isbn',
                    quantidade_vendida: 10,
                    quantidade_em_estoque: 10,
                },
            ])
        })
    })
})
