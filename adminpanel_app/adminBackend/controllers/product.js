import { PrismaClient } from '../generated/prisma/index.js';
import logger from '../utils/logger.js';
import { uploadBuffer } from '../utils/cloudinary.js';

const prisma = new PrismaClient({
    log: ['error']
});

async function getProducts(req, res) {
    try {
        const { categoryId, page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const where = categoryId ? { categoryId: categoryId } : {};
        const products = await prisma.product.findMany({
            where,
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy: { createdAt: 'desc' },
        });
        res.json(products);
    } catch (error) {
        logger.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getProduct(req, res) {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id },
        });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        logger.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function createProduct(req, res) {
    try {
        const { name, description, price, categoryId } = req.body;
        
        let imageUrl = '';
        if (req.file) {
            imageUrl = await uploadBuffer(req.file.buffer, 'food_delivery/products');
        }

        const product = await prisma.product.create({
            data: { 
                name, 
                description, 
                price: parseFloat(price) || 0, 
                imageUrl, 
                category: { connect: { id: categoryId } } 
            },
        });
        res.status(201).json(product);
    } catch (error) {
        logger.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const { name, description, price, categoryId } = req.body;
        
        let updateData = { name, description, price: parseFloat(price) };
        if (categoryId) {
            updateData.category = { connect: { id: categoryId } };
        }
        if (req.file) {
            updateData.imageUrl = await uploadBuffer(req.file.buffer, 'food_delivery/products');
        }

        const product = await prisma.product.update({
            where: { id },
            data: updateData,
        });
        res.json(product);
    } catch (error) {
        logger.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        await prisma.product.delete({
            where: { id },
        });
        res.status(204).send();
    } catch (error) {
        logger.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export{ getProducts, getProduct, createProduct, updateProduct, deleteProduct };
