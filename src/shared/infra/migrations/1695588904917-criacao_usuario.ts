import { MigrationInterface, QueryRunner } from 'typeorm'

export class CriacaoUsuario1695588904917 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS usuario (
                cpf VARCHAR(15) PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                email VARCHAR(155) NOT NULL,
                telefone VARCHAR(20) NOT NULL,
                senha VARCHAR(255) NOT NULL
            )`
        )

        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS endereco_usuario (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                rua VARCHAR(155) NOT NULL,
                cep VARCHAR(20) NOT NULL,
                estado VARCHAR(20) NOT NULL,
                cidade VARCHAR (30) NOT NULL,
                cpf VARCHAR(15),
                FOREIGN KEY (cpf) REFERENCES usuario(cpf)
            )`
        )

        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS usuario_admin (
                setor varchar(30) NOT null,
                cpf VARCHAR(15) NOT NULL primary key,
                FOREIGN KEY (cpf) REFERENCES usuario(cpf)
            )`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS usuario_admin`)
        await queryRunner.query(`DROP TABLE IF EXISTS endereco_usuario`)
        await queryRunner.query(`DROP TABLE IF EXISTS usuario`)
    }
}
