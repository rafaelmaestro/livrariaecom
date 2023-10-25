import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AdicionarProdutoDto } from './dto/adicionar-produto.dto'
import { CreateCarrinhoDto } from './dto/create-carrinho.dto'
import { CarrinhoPagoError } from './errors/carrinho-pago.error'
import { EstoqueInsuficienteError } from './errors/estoque-insuficiente.error'
import { CarrinhoModel } from './models/carrinho.model'

@Injectable()
export class VendaRepository {
    constructor(private readonly dataSource: DataSource) {}

    async inicializarCarrinho(carrinho: CreateCarrinhoDto) {
        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()
        const carrinhoExistente = await CarrinhoModel.createQueryBuilder('carrinho')
            .where('carrinho.cpf = :cpf', { cpf: carrinho.cpf })
            .andWhere('carrinho.situacao = :situacao', { situacao: 'aguardando_pagamento' })
            .leftJoinAndSelect('carrinho.usuario', 'usuario')
            .getOne()

        if (carrinhoExistente) {
            return carrinhoExistente
        }

        try {
            const carrinhoCriado = await queryRunner.manager.save(CarrinhoModel, carrinho)

            await queryRunner.commitTransaction()
            return carrinhoCriado
        } catch (error) {
            await queryRunner.rollbackTransaction()
            throw error
        } finally {
            await queryRunner.release()
        }
    }

    async atualizarQuantidadeProdutoCarrinho(adicionarProdutoDto: AdicionarProdutoDto) {
        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            await queryRunner.manager.query(`
                INSERT INTO itens_carrinho (codigo_carrinho, isbn, quantidade)
                VALUES (
                    ${adicionarProdutoDto.codigo_carrinho},
                    '${adicionarProdutoDto.isbn}',
                    ${adicionarProdutoDto.quantidade}
                )
                ON DUPLICATE KEY UPDATE quantidade = quantidade + ${adicionarProdutoDto.quantidade};
            `)

            if (adicionarProdutoDto.quantidade < 0) {
                await queryRunner.manager.query(`
                CALL DeleteItemIfQuantityNegative(
                    ${adicionarProdutoDto.codigo_carrinho}, 
                    ${adicionarProdutoDto.isbn},
                    ${adicionarProdutoDto.quantidade});
                `)
            }

            await queryRunner.commitTransaction()
        } catch (error) {
            await queryRunner.rollbackTransaction()

            if (error.sqlState === '20000') {
                throw new EstoqueInsuficienteError()
            } else if (error.sqlState === '20002') {
                throw new CarrinhoPagoError()
            } else {
                throw error
            }
        } finally {
            await queryRunner.release()
        }
    }

    async consultarCarrinho(codigo: number) {
        const carrinhoExistente = await CarrinhoModel.findOne({
            where: { codigo },
            relations: ['itens_carrinho', 'pagamento', 'itens_carrinho.livro'],
        })

        if (!carrinhoExistente) {
            return null
        }

        return carrinhoExistente
    }
}
