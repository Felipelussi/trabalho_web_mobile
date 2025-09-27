import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Sale } from "@entities/Sale";
import { Product } from "@entities/Product";

@Entity({ name: 'sale_products' })
export class SaleProduct {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'sale_id' })
    sale_id!: number;

    @Column({ name: 'product_id' })
    product_id!: number;

    @Column({ type: 'integer' })
    qtd!: number;

    @Column({ type: 'integer', default: 0 })
    discount!: number;

    @ManyToOne(() => Sale, sale => sale.saleProducts, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'sale_id' })
    sale!: Sale;

    @ManyToOne(() => Product, product => product.saleProducts, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'product_id' })
    product!: Product;
}