export interface SendMailEstoqueBaixo {
    destinatarios: string[]
    produtos: {
        nome: string
        isbn: string
        quantidade_vendas: number
        quantidade_em_estoque: number
    }[]
}
