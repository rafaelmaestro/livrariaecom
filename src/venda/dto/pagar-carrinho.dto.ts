import { IsString, Matches } from 'class-validator'

export class PagarCarrinhoDto {
    @IsString()
    @Matches(/^(pix|boleto|cartao)$/)
    forma_pagamento: string
}
