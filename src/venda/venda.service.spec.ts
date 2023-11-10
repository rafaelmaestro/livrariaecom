import { setEnv } from '../../config'
import { EMailerService } from '../mailer/mailer.service'
import { UsuarioService } from '../usuario/usuario.service'
import { CarrinhoModel } from './models/carrinho.model'
import { VendaRepository } from './venda.repository'
import { VendaService } from './venda.service'

setEnv()

const VendaRepositoryMock = VendaRepository as unknown as jest.Mock<VendaRepository>
const UsuarioServiceMock = UsuarioService as unknown as jest.Mock<UsuarioService>
const EMailerServiceMock = EMailerService as unknown as jest.Mock<EMailerService>

const sutFactory = () => {
    const vendaRepositoryMock = new VendaRepositoryMock() as jest.Mocked<VendaRepository>
    const usuarioServiceMock = new UsuarioServiceMock() as jest.Mocked<UsuarioService>
    const eMailerServiceMock = new EMailerServiceMock() as jest.Mocked<EMailerService>
    const sut = new VendaService(vendaRepositoryMock, usuarioServiceMock, eMailerServiceMock)
    return { sut, vendaRepositoryMock, usuarioServiceMock, eMailerServiceMock }
}

describe(`${VendaService.name} suite`, () => {
    it(`deve estar definido`, () => {
        const { sut } = sutFactory()
        expect(sut).toBeDefined()
    })

    describe(`${VendaService.prototype.inicializarCarrinho.name}()`, () => {
        it(`deve estar definido`, () => {
            const { sut } = sutFactory()
            expect(sut.inicializarCarrinho).toBeDefined()
        })

        it(`deve retornar o carrinho criado`, async () => {
            const { sut, vendaRepositoryMock } = sutFactory()

            const carrinho = {
                cpf: '12345678901',
                itens_carrinho: [],
                pagamento: null,
                situacao: 'aberto',
            }

            jest.spyOn(vendaRepositoryMock, 'inicializarCarrinho').mockResolvedValueOnce({
                codigo: 1,
                cpf: carrinho.cpf,
                itens_carrinho: [],
                pagamento: null,
                situacao: 'aberto',
            } as CarrinhoModel)
            const result = await sut.inicializarCarrinho(carrinho)
            expect(result.codigo).toBeDefined()
            expect(result.cpf).toBeDefined()
            expect(result.situacao).toBeDefined()
        })
    })

    describe(`${VendaService.prototype.atualizarQuantidadeProdutoCarrinho.name}()`, () => {
        it(`deve estar definido`, () => {
            const { sut } = sutFactory()
            expect(sut.atualizarQuantidadeProdutoCarrinho).toBeDefined()
        })

        it(`deve atualizar a quantidade do produto no carrinho`, async () => {
            const { sut, vendaRepositoryMock } = sutFactory()

            const adicionarProdutoDto = {
                codigo: 1,
                isbn: '1234567890123',
                quantidade: 1,
            }

            jest.spyOn(vendaRepositoryMock, 'atualizarQuantidadeProdutoCarrinho').mockResolvedValueOnce()
            await sut.atualizarQuantidadeProdutoCarrinho(adicionarProdutoDto as any)
            expect(vendaRepositoryMock.atualizarQuantidadeProdutoCarrinho).toBeCalledTimes(1)
        })
    })

    describe(`${VendaService.prototype.gerarNotaFiscal.name}()`, () => {
        it(`deve estar definido`, () => {
            const { sut } = sutFactory()
            expect(sut.gerarNotaFiscal).toBeDefined()
        })

        it(`deve gerar a nota fiscal`, async () => {
            const { sut, vendaRepositoryMock } = sutFactory()

            jest.spyOn(vendaRepositoryMock, 'inserirXmlNfe').mockResolvedValueOnce()
            const result = await sut.gerarNotaFiscal(1, '12345678901', 'nome')
            const xml = `xml_de_teste_${1}_${'12345678901'}_${'nome'}.xml`
            expect(result).toBe(xml)
        })
    })

    describe(`${VendaService.prototype.consultarCarrinho.name}()`, () => {
        it(`deve estar definido`, () => {
            const { sut } = sutFactory()
            expect(sut.consultarCarrinho).toBeDefined()
        })

        it(`deve retonar null caso não encontre o carrinho`, async () => {
            const { sut, vendaRepositoryMock } = sutFactory()

            jest.spyOn(vendaRepositoryMock, 'consultarCarrinho').mockResolvedValueOnce(null)

            const result = await sut.consultarCarrinho(3)

            expect(vendaRepositoryMock.consultarCarrinho).toBeCalledTimes(1)
            expect(result).toBeNull()
        })

        it(`deve retornar o carrinho`, async () => {
            const { sut, vendaRepositoryMock } = sutFactory()

            jest.spyOn(vendaRepositoryMock, 'consultarCarrinho').mockResolvedValueOnce({
                codigo: 3,
                situacao: 'pago',
                cpf: '52776789807',
                itens_carrinho: [
                    {
                        codigo_carrinho: 3,
                        isbn: '9788550804777',
                        quantidade: 2,
                        livro: [
                            {
                                isbn: '9788550804777',
                                nome: 'Aprendendo a Programar',
                                valor: 79.9,
                                imagem: 'https://m.media-amazon.com/images/I/51fHn8QZmdL.jpg',
                                autor: 'Rafael Maestro',
                            },
                        ] as any,
                    },
                ] as any,
                pagamento: {
                    nsu: 29892,
                    valor_total: 159.8,
                    data_pagamento: new Date(),
                    forma_pagamento: 'cartao',
                    codigo_carrinho: 3,
                    nfePagamento: null,
                } as any,
            } as any)

            const result = await sut.consultarCarrinho(3)

            expect(vendaRepositoryMock.consultarCarrinho).toBeCalledTimes(1)
            expect(result).toBeDefined()
            expect(result.codigo).toBe(3)
            expect(result.situacao).toBe('pago')
            expect(result.cpf).toBe('52776789807')
        })
    })

    describe(`${VendaService.prototype.pagarCarrinho.name}()`, () => {
        it(`deve estar definido`, () => {
            const { sut } = sutFactory()
            expect(sut.pagarCarrinho).toBeDefined()
        })

        it(`deve retornar erro caso o carrinho não exista`, async () => {
            const { sut, vendaRepositoryMock } = sutFactory()

            jest.spyOn(vendaRepositoryMock, 'consultarCarrinho').mockResolvedValueOnce(null)

            await expect(sut.pagarCarrinho(3, 'cartao')).rejects.toThrow('Carrinho não encontrado')
        })

        it(`deve retornar erro caso o carrinho não tenha itens`, async () => {
            const { sut, vendaRepositoryMock } = sutFactory()

            jest.spyOn(vendaRepositoryMock, 'consultarCarrinho').mockResolvedValueOnce({
                codigo: 3,
                situacao: 'aberto',
                cpf: '52776789807',
                itens_carrinho: [],
                pagamento: null,
            } as any)

            await expect(sut.pagarCarrinho(3, 'cartao')).rejects.toThrow('Carrinho vazio')
        })

        it(`deve realizar o pagamento do carrinho`, async () => {
            const { sut, vendaRepositoryMock, usuarioServiceMock, eMailerServiceMock } = sutFactory()

            jest.spyOn(vendaRepositoryMock, 'consultarCarrinho').mockResolvedValueOnce({
                codigo: 3,
                situacao: 'aberto',
                cpf: '52776789807',
                itens_carrinho: [
                    {
                        codigo_carrinho: 3,
                        isbn: '9788550804777',
                        quantidade: 2,
                        livro: [
                            {
                                isbn: '9788550804777',
                                nome: 'Aprendendo a Programar',
                                valor: 79.9,
                                imagem: 'https://m.media-amazon.com/images/I/51fHn8QZmdL.jpg',
                                autor: 'Rafael Maestro',
                            },
                        ] as any,
                    },
                ] as any,
                pagamento: null,
            } as any)

            jest.spyOn(vendaRepositoryMock, 'pagarCarrinho').mockResolvedValueOnce()

            jest.spyOn(usuarioServiceMock, 'findByCpf').mockResolvedValueOnce({
                nome: 'nome',
                email: 'email',
            } as any)

            jest.spyOn(vendaRepositoryMock, 'inserirXmlNfe').mockResolvedValueOnce()
            jest.spyOn(eMailerServiceMock, 'sendMailPagamentoAprovado').mockResolvedValueOnce()

            await sut.pagarCarrinho(3, 'cartao')

            expect(vendaRepositoryMock.pagarCarrinho).toBeCalledTimes(1)
            expect(vendaRepositoryMock.inserirXmlNfe).toBeCalledTimes(1)
            expect(usuarioServiceMock.findByCpf).toBeCalledTimes(1)
            expect(eMailerServiceMock.sendMailPagamentoAprovado).toBeCalledTimes(1)
            expect(vendaRepositoryMock.consultarCarrinho).toBeCalledTimes(1)
        })
    })

    describe(`${VendaService.prototype.getRelatorioVendas.name}()`, () => {
        it(`deve estar definido`, () => {
            const { sut } = sutFactory()
            expect(sut.getRelatorioVendas).toBeDefined()
        })

        it(`deve retornar erro caso não encontra o usuário que fez a requisição`, async () => {
            const { sut, usuarioServiceMock } = sutFactory()

            jest.spyOn(usuarioServiceMock, 'findByCpf').mockResolvedValueOnce(null)

            await expect(sut.getRelatorioVendas('12345678901')).rejects.toThrow('Usuário não encontrado')
        })

        it(`deve retornar erro caso o usuário não seja um administrador`, async () => {
            const { sut, usuarioServiceMock } = sutFactory()

            jest.spyOn(usuarioServiceMock, 'findByCpf').mockResolvedValueOnce({
                nome: 'nome',
                email: 'email',
                cpf: '12345678901',
                senha: 'senha',
                admin: null,
            } as any)

            await expect(sut.getRelatorioVendas('12345678901')).rejects.toThrow(
                'Usuário não autorizado a acessar esse recurso'
            )
        })

        it(`deve retornar o relatório de vendas`, async () => {
            const { sut, usuarioServiceMock, vendaRepositoryMock } = sutFactory()

            jest.spyOn(usuarioServiceMock, 'findByCpf').mockResolvedValueOnce({
                nome: 'nome',
                email: 'email',
                cpf: '12345678901',
                senha: 'senha',
                admin: {
                    setor: 'TI',
                },
            } as any)

            jest.spyOn(vendaRepositoryMock, 'getRelatorioVendas').mockResolvedValueOnce([
                {
                    mes_referencia: 1,
                    ano_referencia: 2021,
                    valor_total: 100,
                },
            ] as any)

            const result = await sut.getRelatorioVendas('12345678901')

            expect(vendaRepositoryMock.getRelatorioVendas).toBeCalledTimes(1)
            expect(result).toBeDefined()
            expect(result[0].mes_referencia).toBe(1)
            expect(result[0].ano_referencia).toBe(2021)
            expect(result[0].valor_total).toBe(100)
        })
    })
})
