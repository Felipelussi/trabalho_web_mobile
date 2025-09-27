import {
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { SaleProduct } from "@entities/SaleProduct";

@Entity({ name: 'sales' })
export class Sale {
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @OneToMany(() => SaleProduct, saleProduct => saleProduct.sale)
    saleProducts!: SaleProduct[];
}