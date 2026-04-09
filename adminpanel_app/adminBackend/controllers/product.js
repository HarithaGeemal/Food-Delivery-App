import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient({
    log: ['error']
});

async function getProducts(req, res) {
    try {
        const { categoryId, page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const where = categoryId ? { categoryId: parseInt(categoryId) } : {};
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
            where: { id: parseInt(id) },
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
        const { name, description, price, imageUrl, categoryId } = req.body;
        const product = await prisma.product.create({
            data: { name, description, price: parseFloat(price) || 0, imageUrl, category: { connect: { id: parseInt(categoryId) } } },
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
        const { name, description, price, imageUrl, categoryId } = req.body;
        const product = await prisma.product.update({
            where: { id: parseInt(id) },
            data: { name, description, price: parseFloat(price), imageUrl, category: { connect: { id: parseInt(categoryId) } } },
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
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        logger.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export{ getProducts, getProduct, createProduct, updateProduct, deleteProduct };
