import { Request, Response } from "express";
import { AppDataSource } from "@config/data-source";
import { Sale } from "@entities/Sale";
import { Product } from "@entities/Product";
import { SaleProduct } from "@entities/SaleProduct";

const saleRepo = AppDataSource.getRepository(Sale);
const productRepo = AppDataSource.getRepository(Product);
const saleProductRepo = AppDataSource.getRepository(SaleProduct);

export class SaleController {
    static async list(_req: Request, res: Response) {
        const sales = await saleRepo.find({
            order: { id: 'ASC' },
            relations: { saleProducts: { product: true } }
        });
        res.json(sales);
    }

    static async get(req: Request, res: Response) {
        const id = Number(req.params.id);
        const sale = await saleRepo.findOne({
            where: { id },
            relations: { saleProducts: { product: true } }
        });
        if (!sale) return res.status(404).json({ message: 'Sale not found' });
        res.json(sale);
    }

    static async create(req: Request, res: Response) {
        try {
            const sale = saleRepo.create({});
            await saleRepo.save(sale);
            res.json(sale);
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

    static async addProduct(req: Request, res: Response) {
        try {
            const saleId = Number(req.params.id);
            const { productId, qtd, discount = 0 } = req.body;

            if (!productId || !qtd || qtd <= 0) {
                return res.status(400).json({ 
                    message: 'Product ID and quantity (greater than 0) are required' 
                });
            }

            const sale = await saleRepo.findOne({
                where: { id: saleId },
                relations: { saleProducts: true }
            });

            if (!sale) {
                return res.status(404).json({ message: 'Sale not found' });
            }

            const product = await productRepo.findOneBy({ id: productId });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            const existingSaleProduct = sale.saleProducts?.find(sp => sp.product_id === productId);

            if (existingSaleProduct) {
                existingSaleProduct.qtd += qtd;
                await saleProductRepo.save(existingSaleProduct);
                
                const updatedSaleProduct = await saleProductRepo.findOne({
                    where: { id: existingSaleProduct.id },
                    relations: { product: true }
                });
                
                return res.json({
                    message: 'Product quantity updated',
                    saleProduct: updatedSaleProduct
                });
            } else {
                const saleProduct = saleProductRepo.create({
                    sale_id: saleId,
                    product_id: productId,
                    qtd,
                    discount
                });
                
                await saleProductRepo.save(saleProduct);
                
                const savedSaleProduct = await saleProductRepo.findOne({
                    where: { id: saleProduct.id },
                    relations: { product: true }
                });
                
                return res.json({
                    message: 'Product added to sale',
                    saleProduct: savedSaleProduct
                });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error adding product to sale', error });
        }
    }

    static async removeProduct(req: Request, res: Response) {
        try {
            const saleId = Number(req.params.id);
            const { productId } = req.body;

            if (!productId) {
                return res.status(400).json({ message: 'Product ID is required' });
            }

            const sale = await saleRepo.findOne({
                where: { id: saleId },
                relations: { saleProducts: true }
            });

            if (!sale) {
                return res.status(404).json({ message: 'Sale not found' });
            }

            const saleProduct = sale.saleProducts?.find(sp => sp.product_id === productId);

            if (!saleProduct) {
                return res.status(404).json({ message: 'Product not found in this sale' });
            }

            await saleProductRepo.remove(saleProduct);
            res.json({ message: 'Product removed from sale' });
        } catch (error) {
            res.status(500).json({ message: 'Error removing product from sale', error });
        }
    }

    static async updateProductQuantity(req: Request, res: Response) {
        try {
            const saleId = Number(req.params.id);
            const { productId, qtd, discount } = req.body;

            if (!productId || qtd === undefined || qtd < 0) {
                return res.status(400).json({ 
                    message: 'Product ID and valid quantity are required' 
                });
            }

            const sale = await saleRepo.findOne({
                where: { id: saleId },
                relations: { saleProducts: true }
            });

            if (!sale) {
                return res.status(404).json({ message: 'Sale not found' });
            }

            const saleProduct = sale.saleProducts?.find(sp => sp.product_id === productId);

            if (!saleProduct) {
                return res.status(404).json({ message: 'Product not found in this sale' });
            }

            saleProduct.qtd = qtd;
            if (discount !== undefined) {
                saleProduct.discount = discount;
            }

            await saleProductRepo.save(saleProduct);

            const updatedSaleProduct = await saleProductRepo.findOne({
                where: { id: saleProduct.id },
                relations: { product: true }
            });

            res.json({
                message: 'Product updated in sale',
                saleProduct: updatedSaleProduct
            });
        } catch (error) {
            res.status(500).json({ message: 'Error updating product in sale', error });
        }
    }
}