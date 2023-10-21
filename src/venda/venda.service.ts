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
}
