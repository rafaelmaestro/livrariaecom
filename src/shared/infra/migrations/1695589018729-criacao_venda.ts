import { MigrationInterface, QueryRunner } from 'typeorm'

export class CriacaoVenda1695589018729 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS carrinho (
                codigo INTEGER PRIMARY KEY AUTO_INCREMENT,
                situacao VARCHAR(20) NOT NULL
                CHECK (situacao in ('pago', 'aguardando_pagamento') )
                DEFAULT 'aguardando_pagamento',
                cpf VARCHAR(15) NOT NULL,
                FOREIGN KEY (cpf) REFERENCES usuario(cpf)
            )`
        )

        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS itens_carrinho (
                codigo_carrinho INTEGER NOT NULL,
                isbn VARCHAR(100) NOT NULL,
                quantidade INTEGER NOT NULL,
                FOREIGN KEY (codigo_carrinho) REFERENCES carrinho(codigo),
                FOREIGN KEY (isbn) REFERENCES livro(isbn),
                PRIMARY KEY (codigo_carrinho, isbn)
            )`
        )

        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS pagamento (
                nsu INTEGER PRIMARY KEY,
                valor_total FLOAT NOT NULL,
                data_pagamento DATE NOT NULL,
                forma_pagamento VARCHAR(10) NOT NULL
                CHECK (forma_pagamento in ('pix', 'cartao', 'boleto') ),
                codigo_carrinho INTEGER NOT NULL,
                FOREIGN KEY (codigo_carrinho) REFERENCES carrinho(codigo),
                cpf VARCHAR(15) NOT NULL,
                FOREIGN KEY (cpf) REFERENCES usuario(cpf)
            )`
        )

        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS nfe_pagamento (
                codigo  INTEGER PRIMARY KEY AUTO_INCREMENT,
                xml VARCHAR(255) NOT NULL,
                nsu INTEGER not null unique,
                FOREIGN KEY (nsu) REFERENCES pagamento(nsu),
                codigo_carrinho INTEGER not null unique,
                FOREIGN KEY (codigo_carrinho) REFERENCES carrinho(codigo)
            )`
        )

        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS historico_precos (
                id INTEGER AUTO_INCREMENT PRIMARY KEY ,
                isbn VARCHAR(100) NOT NULL,
                valor_antigo FLOAT NOT NULL,
                valor_novo FLOAT NOT NULL,
                data_alteracao DATE NOT NULL,
                FOREIGN KEY (isbn) REFERENCES livro(isbn)
            )`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS historico_precos`)
        await queryRunner.query(`DROP TABLE IF EXISTS nfe_pagamento`)
        await queryRunner.query(`DROP TABLE IF EXISTS pagamento`)
        await queryRunner.query(`DROP TABLE IF EXISTS itens_carrinho`)
        await queryRunner.query(`DROP TABLE IF EXISTS carrinho`)
    }
}
