export interface SendMailRelatorioVenda {
    destinatario: string
    nome_destinatario: string
    relatorio: {
        mes_referencia: number
        ano_referencia: number
        valor_total: number
    }[]
}
