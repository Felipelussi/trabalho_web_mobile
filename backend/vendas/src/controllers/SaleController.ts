import { Request, Response } from "express";
import { AppDataSource } from "@config/data-source";
import { Sale } from "@entities/Sale";
import { Product } from "@entities/Product";
import { SaleProduct } from "@entities/SaleProduct";
import {In} from "typeorm";

const saleRepo = AppDataSource.getRepository(Sale);
const productRepo = AppDataSource.getRepository(Product);
const saleProductRepo = AppDataSource.getRepository(SaleProduct);

export class SaleController {
    static async list(_req: Request, res: Response) {
        const sales = await saleRepo.find({
            order: { id: 'ASC' },
            relations: { saleProducts: { product: true } }
        });
        res.json(sales.map(sale => ({
            id: sale.id,
            date: sale.created_at,
            total: sale.saleProducts.reduce((acc, sp) => acc + sp.qtd * (sp.product.price - sp.discount), 0),
        })));
    }

    static async get(req: Request, res: Response) {
        const id = Number(req.params.id);
        const sale = await saleRepo.findOne({
            where: { id },
            relations: { saleProducts: { product: true } }
        });
        if (!sale) return res.status(404).json({ message: 'Sale not found' });
        
        res.json({
            id: sale.id,
            date: sale.created_at,
            total: sale.saleProducts.reduce((acc, sp) => acc + sp.qtd * (sp.product.price - sp.discount), 0),
            products: sale.saleProducts.map(sp => ({
                id: sp.product.id,
                name: sp.product.name,
                price: sp.product.price,
                qtd: sp.qtd,
                discount: sp.discount
            }))
        });
    }

    static async create(req: Request, res: Response) {
        try {
            const { products } = req.body;

            // Create the sale first
            const sale = saleRepo.create({});
            await saleRepo.save(sale);

            // If products array is provided, validate and add products to the sale
            if (products && Array.isArray(products)) {
                // Validate each product
                for (const sp of products) {
                    if (!sp.productId || sp.qtd === undefined || sp.qtd < 0) {
                        return res.status(400).json({ 
                            message: 'Each product must have productId and valid qtd (>= 0)'
                        });
                    }
                }

                // Validate all products exist
                const productIds = products.map(sp => sp.productId);
                const productsAvailable = await productRepo.find({where: { id: In(productIds) }});
                
                if (productsAvailable.length !== productIds.length) {
                    return res.status(404).json({ message: 'One or more products not found' });
                }

                // Create SaleProduct entries
                const newSaleProducts = [];
                for (const sp of products) {
                    const saleProduct = saleProductRepo.create({
                        sale_id: sale.id,
                        product_id: sp.productId,
                        qtd: sp.qtd,
                        discount: sp.discount || 0
                    });
                    newSaleProducts.push(saleProduct);
                }

                await saleProductRepo.save(newSaleProducts);

                // Return the sale with products
                const createdSale = await saleRepo.findOne({
                    where: { id: sale.id },
                    relations: { saleProducts: { product: true } }
                });

                res.json({
                    message: 'Sale created successfully',
                    sale: createdSale
                });
            } else {
                // Return the sale without products (backward compatibility)
                res.json({
                    message: 'Sale created successfully',
                    sale: sale
                });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error creating sale', error });
        }
    }

    static async remove(req: Request, res: Response) {
        const id = Number(req.params.id);
        const result = await saleRepo.delete(id);
        if (!result.affected) return res.status(404).json({ message: 'Sale not found' });
        res.status(204).send();
    }

    static async updateSale(req: Request, res: Response) {
        try {
            const saleId = Number(req.params.id);
            const {  products } = req.body;

            if (!products || !Array.isArray(products)) {
                return res.status(400).json({ 
                    message: 'products array is required'
                });
            }

            for (const sp of products) {
                if (!sp.productId || sp.qtd === undefined || sp.qtd < 0) {
                    return res.status(400).json({ 
                        message: 'Each product must have productId and valid qtd (>= 0)'
                    });
                }
            }

            const sale = await saleRepo.findOne({
                where: { id: saleId },
                relations: { saleProducts: true }
            });

            if (!sale) {
                return res.status(404).json({ message: 'Sale not found' });
            }

            const productIds = products.map(sp => sp.productId);
            const productsAvailable= await productRepo.find({where: { id: In(productIds) }});
            
            if (productsAvailable.length !== productIds.length) {
                return res.status(404).json({ message: 'One or more products not found' });
            }

            if (sale.saleProducts && sale.saleProducts.length > 0) {
                await saleProductRepo.remove(sale.saleProducts);
            }

            const newSaleProducts = [];
            for (const sp of products) {
                const saleProduct = saleProductRepo.create({
                    sale_id: saleId,
                    product_id: sp.productId,
                    qtd: sp.qtd,
                    discount: sp.discount || 0
                });
                newSaleProducts.push(saleProduct);
            }

            await saleProductRepo.save(newSaleProducts);

            const updatedSale = await saleRepo.findOne({
                where: { id: saleId },
                relations: { saleProducts: { product: true } }
            });

            res.json({
                message: 'Sale updated successfully',
                sale: updatedSale
            });
        } catch (error) {
            res.status(500).json({ message: 'Error updating sale', error });
        }
    }
}