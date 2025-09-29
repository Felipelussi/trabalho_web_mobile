import { Request, Response } from "express";
import { AppDataSource } from "@config/data-source";
import { Product } from "@entities/Product";

const productRepo = AppDataSource.getRepository(Product);

export class ProductController {
    static async list(_req: Request, res: Response) {
        try {
            const products = await productRepo.find({
                order: { id: 'ASC' }
            });
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error });
        }
    }

    static async get(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const product = await productRepo.findOneBy({ id });
            
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching product', error });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const { name, price } = req.body;

            if (!name || !price) {
                return res.status(400).json({ 
                    message: 'Name and price are required' 
                });
            }

            if (!Number.isInteger(price) || price <= 0) {
                return res.status(400).json({ 
                    message: 'Price must be a positive integer' 
                });
            }

            const product = productRepo.create({
                name: name.trim(),
                price,

            });

            await productRepo.save(product);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error creating product', error });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { name, price } = req.body;

            const product = await productRepo.findOneBy({ id });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            if (name !== undefined) {
                if (typeof name !== 'string' || name.trim().length === 0) {
                    return res.status(400).json({ message: 'Name must be a non-empty string' });
                }
                product.name = name.trim();
            }

            if (price !== undefined) {
                if (!Number.isInteger(price) || price <= 0) {
                    return res.status(400).json({ message: 'Price must be a positive integer' });
                }
                product.price = price;
            }

            await productRepo.save(product);
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error updating product', error });
        }
    }

    static async remove(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            
            const product = await productRepo.findOne({
                where: { id },
                relations: { saleProducts: true }
            });

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            if (product.saleProducts && product.saleProducts.length > 0) {
                return res.status(400).json({ 
                    message: 'Cannot delete product that is used in sales',
                    salesCount: product.saleProducts.length
                });
            }

            await productRepo.remove(product);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error });
        }
    }

}