import { ItemCarrinhoModel } from '../models/itemCarrinho.model'
import { Pagamento } from './pagamento.entity'

export class Carrinho {
    codigo?: number
    situacao?: string
    cpf: string
    itensCarrinho?: ItemCarrinhoModel[]
    pagamento?: Pagamento
}
