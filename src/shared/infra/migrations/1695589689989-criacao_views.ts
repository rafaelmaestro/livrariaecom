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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP view prioridade_estoque;`)
    }
}
