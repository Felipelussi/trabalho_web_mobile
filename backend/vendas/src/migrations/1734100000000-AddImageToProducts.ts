import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageToProducts1734100000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE products 
            ADD COLUMN image_url TEXT
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE products 
            DROP COLUMN image_url
        `);
    }
}