import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { SendMailEstoqueBaixo } from './interfaces/SendMailEstoqueBaixo.interface'
import { sendMailPagamentoAprovado } from './interfaces/SendMailPagamentoAprovado.interface'
import { SendMailRelatorioEstoque } from './interfaces/SendMailRelatorioEstoque.interface'
import { SendMailRelatorioUsuarios } from './interfaces/SendMailRelatorioUsuarios.interface'
import { SendMailRelatorioVenda } from './interfaces/SendMailRelatorioVenda.interface'

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

    async sendMailEstoqueBaixo(props: SendMailEstoqueBaixo) {
        let htmlProdutos = ''

        for (const item of props.produtos) {
            htmlProdutos += `
            <div style="border: 1px solid #ccc; padding: 10px; margin: 10px;">
                <p><strong>Nome:</strong> ${item.nome}</p>
                <p><strong>ISBN:</strong> ${item.isbn}</p>
                <p><strong>Quantidade de vendas:</strong> ${item.quantidade_vendas}</p>
                <p><strong>Quantidade em estoque:</strong> ${item.quantidade_em_estoque}</p>
            </div>
            `
        }

        await this.mailerService.sendMail({
            to: props.destinatarios,
            from: process.env.EMAIL_USER,
            subject: 'Alerta de estoque baixo! 📚',
            text: 'Alguns produtos campeões de venda estão com estoque baixo!',
            html: `
                <b>Olá!</b><br><br>
                Alguns produtos campeões de venda estão com estoque baixo!<br /><br />
                <b>Produtos:</b><br />
                ${htmlProdutos} <br><hr><br>
                <b>Atenciosamente, <br>
                E-mail automático. Livraria 📚</b>
            `,
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

    async sendMailRelatorioVenda(props: SendMailRelatorioVenda) {
        await this.mailerService.sendMail({
            to: props.destinatario,
            from: process.env.EMAIL_USER,
            subject: 'Seu relatório de vendas 📊💰',
            text: `O seu relatório de vendas está em anexo.`,
            html: `
                <b>Olá ${props.nome_destinatario}!</b><br><br>
                <p>Seu relatório de vendas solicitado está disponível à seguir!</p>
                <ul>
                    ${props.relatorio
                        .map(
                            (item) =>
                                `<li>${item.mes_referencia}/${item.ano_referencia}: R$ ${item.valor_total.toFixed(
                                    2
                                )}</li>`
                        )
                        .join('')}
                </ul>
                <p><b>Atenciosamente,<br>Equipe de vendas da Livraria 📚</b></p>
        `,
        })
    }

    async sendMailRelatorioUsuarios(props: SendMailRelatorioUsuarios) {
        await this.mailerService.sendMail({
            to: props.destinatario,
            from: process.env.EMAIL_USER,
            subject: 'Seu relatório de usuários 📊👤',
            text: `O seu relatório de usuários está em anexo.`,
            html: `
                <b>Olá ${props.nome_destinatario}!</b><br><br>
                <p>Seu relatório de usuários solicitado está disponível à seguir!</p>
                <ul>
                    ${props.relatorio
                        .map(
                            (item) =>
                                `<li>Nome: <b>${item.nome}</b> - Email: <b>${
                                    item.email
                                }</b> - Valor total gasto: <b>R$ ${item.valor_total_gasto.toFixed(2)}</b></li>`
                        )
                        .join('')}
                </ul>
                <p><b>Atenciosamente,<br>Equipe de vendas da Livraria 📚</b></p>
        `,
        })
    }

    async sendMailRelatorioEstoque(props: SendMailRelatorioEstoque) {
        await this.mailerService.sendMail({
            to: props.destinatario,
            from: process.env.EMAIL_USER,
            subject: 'Seu relatório de estoque 📊📚',
            text: `O seu relatório de estoque está em anexo.`,
            html: `
                <b>Olá ${props.nome_destinatario}!</b><br><br>
                <p>Seu relatório de estoque solicitado está disponível à seguir!</p>
                <ul>
                    ${props.relatorio
                        .map(
                            (item) =>
                                `<li>Nome: <b>${item.nome}</b> - ISBN: <b>${item.isbn}</b> - Quantidade vendida: <b>${item.quantidade_vendida}</b> - Quantidade em estoque: <b>${item.quantidade_em_estoque}</b></li><br>`
                        )
                        .join('')}
                </ul>
                <p><b>Atenciosamente,<br>Equipe de vendas da Livraria 📚</b></p>
        `,
        })
    }
}
