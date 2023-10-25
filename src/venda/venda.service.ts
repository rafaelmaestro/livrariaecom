import { Injectable } from '@nestjs/common'
import { AdicionarProdutoDto } from './dto/adicionar-produto.dto'
import { CreateCarrinhoDto } from './dto/create-carrinho.dto'
import { VendaRepository } from './venda.repository'

@Injectable()
export class VendaService {
    constructor(private readonly vendaRepository: VendaRepository) {}

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
        // return {
        //     codigo: carrinho?.codigo,
        //     situacao: carrinho?.situacao,
        //     cpf: carrinho?.cpf,
        //     itens: carrinho?.itens_carrinho,
        //     pagamento: carrinho?.pagamento,
        // }
    }
}
