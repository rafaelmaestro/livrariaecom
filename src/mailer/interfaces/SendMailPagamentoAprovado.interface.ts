export interface sendMailPagamentoAprovado {
    destinatario: string
    nome_destinario: string
    xml: string
    pedido: {
        codigo: number
        valor: number
        itens: {
            titulo: string
            valor: number
            imagem: string
            quantidade: number
        }[]
    }
}
