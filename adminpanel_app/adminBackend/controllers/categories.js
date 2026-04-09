import { PrismaClient } from '../generated/prisma/index.js';
import logger from '../utils/logger.js';
import { uploadBuffer } from '../utils/cloudinary.js';

const prisma = new PrismaClient({
    log: ['error']
});
async function getCategories(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const categories = await prisma.category.findMany({
            include: { products: true },
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy: { createdAt: 'desc' },
        });
        res.json(categories);
    } catch (error) {
        logger.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getProductsByCategory(req, res) {
    try {
        const { id } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const products = await prisma.product.findMany({
            where: { categoryId: id },
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy: { createdAt: 'desc' },
        });
        res.status(201).json(products);
    } catch (error) {
        logger.error('Error fetching products by category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function createCategory(req, res) {
    try {
        const { name } = req.body;
        logger.info(`Creating category: name="${name}"`);

        if (!name) {
            return res.status(400).json({ error: 'Category name is required' });
        }

        // Upload image to Cloudinary if a file was attached
        let imageUrl = '';
        if (req.file) {
            logger.info(`Uploading image to Cloudinary for category "${name}"`);
            imageUrl = await uploadBuffer(req.file.buffer, 'food_delivery/categories');
            logger.info(`Image uploaded: ${imageUrl}`);
        }

        const category = await prisma.category.create({
            data: { name, imageUrl },
        });

        logger.info(`Category created successfully: id=${category.id}, name="${category.name}"`);
        res.status(201).json(category);
    } catch (error) {
        logger.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateCategory(req, res) {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // If a new image file was provided, upload it; otherwise keep existing
        let updateData = { name };
        if (req.file) {
            const imageUrl = await uploadBuffer(req.file.buffer, 'food_delivery/categories');
            updateData.imageUrl = imageUrl;
        }

        const category = await prisma.category.update({
            where: { id },
            data: updateData,
        });
        res.json(category);
    } catch (error) {
        logger.error('Error updating category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteCategory(req, res) {
    try {
        const { id } = req.params;
        await prisma.product.deleteMany({ where: { categoryId: id } });
        await prisma.category.delete({ where: { id } });
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        logger.error('Error deleting category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export { getCategories, getProductsByCategory, createCategory, updateCategory, deleteCategory };