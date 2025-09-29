import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSaleProductTable1734000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "sales" (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "products" (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "name" TEXT NOT NULL,
                "price" INTEGER NOT NULL
            )
        `);

        // Drop existing sale_product table if it exists
        await queryRunner.query(`DROP TABLE IF EXISTS "sale_product"`);

        // Create sale_products table with foreign keys defined inline
        await queryRunner.query(`
            CREATE TABLE "sale_products" (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "sale_id" INTEGER NOT NULL,
                "product_id" INTEGER NOT NULL,
                "unit_price" INTEGER NOT NULL,
                "qtd" INTEGER NOT NULL,
                "discount" INTEGER NOT NULL DEFAULT 0,
                FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE CASCADE,
                FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "sale_products"`);
        
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "sale_product" (
                "sale_id" INTEGER NOT NULL,
                "product_id" INTEGER NOT NULL,
                PRIMARY KEY ("sale_id", "product_id"),
                FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE CASCADE,
                FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE
            )
        `);
    }
}
