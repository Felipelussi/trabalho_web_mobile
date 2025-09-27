import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import {Product} from "@entities/Product";
import {Sale} from "@entities/Sale";
import {SaleProduct} from "@entities/SaleProduct";

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_NAME || 'database.sqlite',
  synchronize: false, // true For dev only.
  logging: false,
  entities: [Product, Sale, SaleProduct],
  migrations: ['src/migrations/*.ts'],
});
