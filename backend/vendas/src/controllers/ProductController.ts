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
            const { name, price, image_url } = req.body;

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
                image_url: image_url?.trim() || null
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
            const { name, price, image_url } = req.body;

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

            if (image_url !== undefined) {
                product.image_url = image_url?.trim() || null;
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

    static async updateImage(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { image_url } = req.body;

            const product = await productRepo.findOneBy({ id });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            product.image_url = image_url?.trim() || null;
            await productRepo.save(product);

            res.json({
                message: 'Product image updated successfully',
                product
            });
        } catch (error) {
            res.status(500).json({ message: 'Error updating product image', error });
        }
    }

    static async removeImage(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const product = await productRepo.findOneBy({ id });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            product.image_url = undefined;
            await productRepo.save(product);

            res.json({
                message: 'Product image removed successfully',
                product
            });
        } catch (error) {
            res.status(500).json({ message: 'Error removing product image', error });
        }
    }

    static async uploadImage(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            if (!req.file) {
                return res.status(400).json({ message: 'No image file provided' });
            }

            const product = await productRepo.findOneBy({ id });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            const image_url = `/uploads/products/${req.file.filename}`;
            product.image_url = image_url;
            await productRepo.save(product);

            res.json({
                message: 'Product image uploaded successfully',
                product,
                imageUrl: image_url
            });
        } catch (error) {
            res.status(500).json({ message: 'Error uploading product image', error });
        }
    }
}