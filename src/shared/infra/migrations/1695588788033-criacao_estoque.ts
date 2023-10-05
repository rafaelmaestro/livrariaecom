import { MigrationInterface, QueryRunner } from 'typeorm'

export class CriacaoEstoque1695588788033 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS editora (
                cnpj VARCHAR(55) PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                telefone VARCHAR(20) NOT NULL,
                email VARCHAR(155) NOT NULL 
            )`
        )

        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS autor (
                email VARCHAR(155) PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                INDEX idx_nome (nome)
            )`
        )

        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS livro (
                isbn VARCHAR(100) PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                valor FLOAT NOT NULL,
                imagem BLOB,
                nome_autor VARCHAR(255) NOT NULL,
                cnpj_editora VARCHAR(55) NOT NULL,
                FOREIGN KEY (nome_autor) REFERENCES autor(nome),
                FOREIGN KEY (cnpj_editora) REFERENCES editora(cnpj)
            )`
        )

        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS estoque (
                sku VARCHAR(25) PRIMARY KEY,
                quantidade INTEGER NOT NULL,
                isbn VARCHAR(100) NOT NULL,
                FOREIGN KEY (isbn) REFERENCES livro(isbn)
            )`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS estoque`)
        await queryRunner.query(`DROP TABLE IF EXISTS livro`)
        await queryRunner.query(`DROP TABLE IF EXISTS autor`)
        await queryRunner.query(`DROP TABLE IF EXISTS editora`)
    }
}
