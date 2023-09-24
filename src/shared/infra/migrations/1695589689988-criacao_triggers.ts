import { MigrationInterface, QueryRunner } from 'typeorm'

export class CriacaoTriggers1695589689988 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Deletar item da itens_carrinho atualiza estoque

        await queryRunner.query(`
            CREATE TRIGGER itens_carrinho_AFTER_DELETE AFTER DELETE ON itens_carrinho FOR EACH ROW
            BEGIN
                UPDATE estoque SET quantidade = quantidade + OLD.quantidade WHERE isbn = OLD.isbn;
            END;
        `)

        // Incluir item na itens_carrinho atualiza estoque
        await queryRunner.query(`
            CREATE TRIGGER itens_carrinho_AFTER_INSERT AFTER INSERT ON itens_carrinho FOR EACH ROW
            BEGIN
                UPDATE estoque SET quantidade = quantidade - NEW.quantidade WHERE isbn = NEW.isbn;
            END;
        `)
        // Se nÃ£o houver estoque do produto gera erro
        await queryRunner.query(`
            CREATE TRIGGER itens_carrinho_BEFORE_INSERT BEFORE INSERT ON itens_carrinho FOR EACH ROW
            BEGIN
                IF NEW.quantidade > (SELECT quantidade FROM estoque WHERE isbn = NEW.isbn) THEN
                    SIGNAL SQLSTATE '20000' SET MESSAGE_TEXT = 'Nao ha estoque suficiente desse produto!';
                END IF;
            END;
        `)
        // Caso haja mudanÃ§a nos itens do carrinho atualiza estoque:
        await queryRunner.query(`
            CREATE TRIGGER itens_carrinho_AFTER_UPDATE AFTER UPDATE ON itens_carrinho FOR EACH ROW
            BEGIN
                UPDATE estoque SET quantidade = quantidade - NEW.quantidade WHERE isbn = NEW.isbn;
                UPDATE estoque SET quantidade = quantidade + OLD.quantidade WHERE isbn = OLD.isbn;
            END;
        `)

        // Se houver mudanÃ§a no valor dos livros insere na tabela historico_precos
        await queryRunner.query(`
            CREATE TRIGGER livro_AFTER_UPDATE AFTER UPDATE ON livro FOR EACH ROW
            BEGIN
                IF NEW.valor <> OLD.valor THEN
                    INSERT INTO historico_precos (isbn, valor_antigo, valor_novo, data_alteracao)
                    VALUES (NEW.isbn, OLD.valor, NEW.valor, CURRENT_DATE());
                END IF;
            END;
        `)

        // Se apagar o carrinho deleta os registros da itens_carrinho p/ liberar o estoque
        await queryRunner.query(`
            CREATE TRIGGER carrinho_AFTER_DELETE AFTER DELETE ON carrinho FOR EACH ROW
            BEGIN
                DELETE FROM itens_carrinho WHERE codigo_carrinho = OLD.codigo;
            END;
        `)

        // Se o pagamento for confirmado atualiza a situaÃ§Ã£o do carrinho p/ pago
        await queryRunner.query(`
            CREATE TRIGGER pagamento_AFTER_INSERT AFTER INSERT ON pagamento FOR EACH ROW
            BEGIN
                UPDATE carrinho SET situacao = 'pago' WHERE codigo = NEW.codigo_carrinho;
            END;
        `)

        // Se tentar inserir um carrinho que jÃ¡ foi pago retorna erro
        await queryRunner.query(`
            CREATE TRIGGER pagamento_BEFORE_INSERT BEFORE INSERT ON pagamento FOR EACH ROW
            BEGIN
                IF (SELECT situacao FROM carrinho WHERE codigo = NEW.codigo_carrinho) = 'pago' THEN
                    SIGNAL SQLSTATE '20000' SET MESSAGE_TEXT = 'Esse carrinho ja foi pago!';
                END IF;
            END;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER itens_carrinho_AFTER_DELETE;`)
        await queryRunner.query(`DROP TRIGGER itens_carrinho_AFTER_INSERT;`)
        await queryRunner.query(`DROP TRIGGER itens_carrinho_BEFORE_INSERT;`)
        await queryRunner.query(`DROP TRIGGER itens_carrinho_BEFORE_INSERT;`)
        await queryRunner.query(`DROP TRIGGER itens_carrinho_AFTER_UPDATE;`)
        await queryRunner.query(`DROP TRIGGER livro_AFTER_UPDATE;`)
        await queryRunner.query(`DROP TRIGGER carrinho_AFTER_DELETE;`)
        await queryRunner.query(`DROP TRIGGER pagamento_AFTER_INSERT;`)
        await queryRunner.query(`DROP TRIGGER pagamento_BEFORE_INSERT;`)
    }
}
