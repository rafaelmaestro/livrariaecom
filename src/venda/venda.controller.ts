import { Body, Controller, Get, Param, Patch, Post, Query, UseFilters } from '@nestjs/common'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { Usuario } from '../usuario/entities/usuario.entity'
import { AdicionarProdutoDto } from './dto/adicionar-produto.dto'
import { CreateCarrinhoDto } from './dto/create-carrinho.dto'
import { PagarCarrinhoDto } from './dto/pagar-carrinho.dto'
import { CarrinhoPagoFilter } from './filters/carrinho-pago.filter'
import { EstoqueInsuficienteFilter } from './filters/estoque-insuficiente.filter'
import { VendaService } from './venda.service'

@Controller('venda')
export class VendaController {
    constructor(private readonly vendaService: VendaService) {}

    @Post('/carrinho')
    async inicializarCarrinho(@Body() createCarrinhoDto: CreateCarrinhoDto) {
        return await this.vendaService.inicializarCarrinho(createCarrinhoDto)
    }

    @Patch('/carrinho')
    @UseFilters(EstoqueInsuficienteFilter, CarrinhoPagoFilter)
    async atualizarQuantidadeProdutoCarrinho(@Body() adicionarProdutoDto: AdicionarProdutoDto) {
        return await this.vendaService.atualizarQuantidadeProdutoCarrinho(adicionarProdutoDto)
    }

    @Get('/carrinho')
    async consultarCarrinho(@Query('codigo') codigo: number) {
        return await this.vendaService.consultarCarrinho(codigo)
    }

    @Post('/carrinho/:codigo/pagamento')
    @UseFilters(CarrinhoPagoFilter)
    async pagarCarrinho(@Param('codigo') codigo: number, @Body() pagarCarrinho: PagarCarrinhoDto) {
        return await this.vendaService.pagarCarrinho(codigo, pagarCarrinho.forma_pagamento)
    }

    @Get('/relatorio')
    async getRelatorioVendas(@CurrentUser() user: Usuario) {
        return await this.vendaService.getRelatorioVendas(user.cpf)
    }
}
