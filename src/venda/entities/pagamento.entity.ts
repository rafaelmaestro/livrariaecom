import { Carrinho } from './carrinho.entity'
import { NfePagamento } from './nfePagamento.entity'

export class Pagamento {
    nsu: number

    valor_total: number

    data_pagamento: Date

    forma_pagamento: string

    codigo_carrinho: number

    carrinho: Carrinho

    nfePagamento: NfePagamento
}
