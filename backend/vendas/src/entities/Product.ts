import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { SaleProduct } from "@entities/SaleProduct";

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "text" })
    name!: string;

    @Column({ type: 'integer' })
    price!: number;

    @Column({ type: "text", nullable: true })
    image_url?: string;

    @OneToMany(() => SaleProduct, saleProduct => saleProduct.product)
    saleProducts!: SaleProduct[];
}