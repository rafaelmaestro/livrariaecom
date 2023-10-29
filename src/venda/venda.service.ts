import { Injectable } from '@nestjs/common'
import { EMailerService } from '../mailer/mailer.service'
import { UsuarioService } from '../usuario/usuario.service'
import { AdicionarProdutoDto } from './dto/adicionar-produto.dto'
import { CreateCarrinhoDto } from './dto/create-carrinho.dto'
import { VendaRepository } from './venda.repository'

@Injectable()
export class VendaService {
    constructor(
        private readonly vendaRepository: VendaRepository,
        private readonly usuarioService: UsuarioService,
        private readonly emailerService: EMailerService
    ) {}

    async inicializarCarrinho(carrinho: CreateCarrinhoDto) {
        const carrinhoCriado = await this.vendaRepository.inicializarCarrinho(carrinho)

        return {
            codigo: carrinhoCriado.codigo,
            situacao: carrinhoCriado.situacao,
            cpf: carrinhoCriado.cpf,
        }
    }

    async atualizarQuantidadeProdutoCarrinho(adicionarProdutoDto: AdicionarProdutoDto) {
        await this.vendaRepository.atualizarQuantidadeProdutoCarrinho(adicionarProdutoDto)
    }

    async consultarCarrinho(codigo: number) {
        const carrinho = await this.vendaRepository.consultarCarrinho(codigo)

        if (carrinho) {
            return {
                codigo: carrinho?.codigo,
                situacao: carrinho?.situacao,
                cpf: carrinho?.cpf,
                valor_total: carrinho?.itens_carrinho
                    .map((item) => item.quantidade * item.livro.valor)
                    .reduce((a, b) => a + b, 0),
                itens: [
                    ...carrinho.itens_carrinho.map((item) => ({
                        livro: {
                            isbn: item.livro.isbn,
                            titulo: item.livro.nome,
                            valor: item.livro.valor,
                            imagem: item.livro.imagem,
                            autor: item.livro.nome_autor,
                        },
                        quantidade: item.quantidade,
                    })),
                ],
                pagamento: carrinho?.pagamento,
            }
        }
        return carrinho
    }

    async pagarCarrinho(codigo: number, forma_pagamento: string) {
        const nsu = this.generateRandomInt()

        const dataPagamento = new Date().toISOString().slice(0, 10)

        const carrinho = await this.vendaRepository.consultarCarrinho(codigo)

        if (!carrinho) {
            throw new Error('Carrinho não encontrado')
        }

        if (carrinho.itens_carrinho.length === 0) {
            throw new Error('Carrinho vazio')
        }

        const valorTotal =
            carrinho?.itens_carrinho.map((item) => item.quantidade * item.livro.valor).reduce((a, b) => a + b, 0) || 0

        const objPagamento = {
            codigo_carrinho: codigo,
            forma_pagamento,
            data_pagamento: dataPagamento,
            valor_total: valorTotal,
            nsu,
        }

        await this.vendaRepository.pagarCarrinho(objPagamento)
        await this.gerarNotaFiscal(nsu, carrinho.cpf)
    }

    async gerarNotaFiscal(nsu: number, cpf: string) {
        const usuario = await this.usuarioService.findByCpf(cpf)

        const xml = `xml_de_teste_${nsu}_${cpf}_${usuario.nome}.xml`

        await this.vendaRepository.inserirXmlNfe(nsu, xml)
        await this.emailerService.sendMail(usuario.email, 'Pagamento Aprovado!', 'Seu pagamento foi aprovado!')
    }

    private generateRandomInt() {
        const min = Math.pow(10, 4)
        const max = Math.pow(10, 5) - 1
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}
