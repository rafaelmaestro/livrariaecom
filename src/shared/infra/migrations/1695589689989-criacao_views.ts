import { MigrationInterface, QueryRunner } from 'typeorm'

export class CriacaoViews1695589689989 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE VIEW prioridade_estoque AS 
            select livro.nome, livro.isbn, t.quantidade_vendas, estoque.quantidade quantidade_em_estoque
            from livro
            inner join (select isbn, count(isbn) quantidade_vendas 
                from itens_carrinho group by isbn) t on t.isbn = livro.isbn
            inner join estoque on estoque.isbn = livro.isbn and estoque.quantidade < 10
            order by t.quantidade_vendas desc
            LIMIT 10;`)

        await queryRunner.query(`
            CREATE VIEW vendas_mes AS 
            select month(data_pagamento) mes_referencia, year(data_pagamento) ano_referencia, round(sum(valor_total), 2) valor_total from pagamento
            group by month(data_pagamento), year(data_pagamento)
            order by month(data_pagamento), year(data_pagamento) desc;
        `)

        await queryRunner.query(`
            CREATE VIEW top_usuarios AS 
            SELECT usuario.nome, usuario.email, t.valor_total as valor_total_gasto FROM usuario
            INNER JOIN (
                SELECT cpf, round(sum(valor_total), 2) valor_total FROM pagamento
                INNER JOIN carrinho c on c.codigo = pagamento.codigo_carrinho and c.situacao = 'pago'
                GROUP BY cpf) t ON t.cpf = usuario.cpf
            ORDER BY valor_total DESC
            LIMIT 10;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP view prioridade_estoque;`)
        await queryRunner.query(`DROP view vendas_mes;`)
        await queryRunner.query(`DROP view top_usuarios;`)
    }
}
