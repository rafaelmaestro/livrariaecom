import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { sendMailPagamentoAprovado } from './interfaces/SendMailPagamentoAprovado.interface'

@Injectable()
export class EMailerService {
    constructor(private readonly mailerService: MailerService) {}
    async sendMail(destinatario: string, assunto: string, corpo: string, html: string) {
        await this.mailerService.sendMail({
            to: destinatario,
            from: process.env.EMAIL_USER,
            subject: assunto,
            text: corpo,
            html: html,
        })
    }

    async sendMailPagamentoAprovado(props: sendMailPagamentoAprovado) {
        let htmlProdutos = ''

        for (const item of props.pedido.itens) {
            htmlProdutos += `
            <div style="border: 1px solid #ccc; padding: 10px; margin: 10px;">
                <img src="data:image/png;base64,${item.imagem}" style="max-width: 100px; max-height: 100px; display: block; margin: 0 auto;" />
                <p><strong>${item.titulo}</strong></p>
                <p><strong>Valor:</strong> ${item.valor}</p>
                <p><strong>Quantidade:</strong> ${item.quantidade}</p>
            </div>
            `
        }

        await this.mailerService.sendMail({
            to: props.destinatario,
            from: process.env.EMAIL_USER,
            subject: 'Seu pagamento foi aprovado! 🎉',
            text: `O pagamento do carrinho ${props.pedido.codigo} foi aprovado. O valor total foi de R$ ${props.pedido.valor}`,
            html: `
                <b>Olá ${props.nome_destinario}!</b><br><br>
                Seu pagamento no valor de R$ ${props.pedido.valor} foi aprovado!<br /><br />
                <b>Itens do pedido:</b><br />
                ${htmlProdutos} <br><br>
                Ah!... Já ia me esquecendo, o xml da nota fiscal está em anexo. <br><br>
                Arquivo: <b>${props.xml}</b><br><br>
                <b>Atenciosamente, <br>
                Equipe de vendas da Livraria 📚</b>
            `,
        })
    }
}
