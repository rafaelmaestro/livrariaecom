import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddDateColumns1695589689999 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE public.usuario
            ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP;
        `)
        await queryRunner.query(`
            CREATE TRIGGER usuario_BEFORE_UPDATE BEFORE UPDATE ON usuario FOR EACH ROW SET NEW.updated_at = NOW();
        `)

        await queryRunner.query(`
            ALTER TABLE public.endereco_usuario
            ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP;
        `)
        await queryRunner.query(`
            CREATE TRIGGER endereco_usuario_BEFORE_UPDATE BEFORE UPDATE ON endereco_usuario FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;
        `)

        await queryRunner.query(`
            ALTER TABLE public.usuario_admin
            ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP;
        `)
        await queryRunner.query(`
            CREATE TRIGGER usuario_admin_BEFORE_UPDATE BEFORE UPDATE ON usuario_admin FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;
        `)

        await queryRunner.query(`
            ALTER TABLE public.carrinho
            ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP;
        `)
        await queryRunner.query(`
            CREATE TRIGGER carrinho_BEFORE_UPDATE BEFORE UPDATE ON carrinho FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;
        `)

        await queryRunner.query(`
            ALTER TABLE public.itens_carrinho
            ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP;
        `)
        await queryRunner.query(`
            CREATE TRIGGER itens_carrinho_BEFORE_UPDATE BEFORE UPDATE ON itens_carrinho FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;
        `)

        await queryRunner.query(`
            ALTER TABLE public.pagamento
            ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP;
        `)
        await queryRunner.query(`
            CREATE TRIGGER pagamento_BEFORE_UPDATE BEFORE UPDATE ON pagamento FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;
        `)

        await queryRunner.query(`
            ALTER TABLE public.nfe_pagamento
            ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP;
        `)
        await queryRunner.query(`
            CREATE TRIGGER nfe_pagamento_BEFORE_UPDATE BEFORE UPDATE ON nfe_pagamento FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;
        `)

        await queryRunner.query(`
            ALTER TABLE public.autor
            ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP;
        `)
        await queryRunner.query(`
            CREATE TRIGGER autor_BEFORE_UPDATE BEFORE UPDATE ON autor FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;
        `)

        await queryRunner.query(`
            ALTER TABLE public.editora
            ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP;
        `)
        await queryRunner.query(`
            CREATE TRIGGER editora_BEFORE_UPDATE BEFORE UPDATE ON editora FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;
        `)

        await queryRunner.query(`
            ALTER TABLE public.livro
            ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP;
        `)
        await queryRunner.query(`
            CREATE TRIGGER livro_BEFORE_UPDATE BEFORE UPDATE ON livro FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;
        `)

        await queryRunner.query(`
            ALTER TABLE public.estoque
            ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP;
        `)
        await queryRunner.query(`
            CREATE TRIGGER estoque_BEFORE_UPDATE BEFORE UPDATE ON estoque FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(``)
    }
}
