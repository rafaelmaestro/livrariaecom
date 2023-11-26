export interface SendMailRelatorioEstoque {
    destinatario: string
    nome_destinatario: string
    relatorio: {
        nome: string
        isbn: string
        quantidade_vendida: number
        quantidade_em_estoque: number
    }[]
}
