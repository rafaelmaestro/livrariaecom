export interface SendMailRelatorioUsuarios {
    destinatario: string
    nome_destinatario: string
    relatorio: {
        nome: string
        email: string
        valor_total_gasto: number
    }[]
}
