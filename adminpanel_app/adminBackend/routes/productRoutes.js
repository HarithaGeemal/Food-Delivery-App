import validate from '../middlewares/validation.js';
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from '../controllers/product.js';
import z from 'zod';
import express from 'express';

const router = express.Router();

const productSchema = z.object({
    categoryId: z.string(),
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    price: z.number().positive('Price must be a positive number'),
    imageUrl: z.string().url('Invalid URL format').optional().or(z.literal('')),
});

const updateProductSchema = z.object({
    categoryId: z.string().optional(),
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    price: z.number().positive('Price must be a positive number').optional(),
    imageUrl: z.string().url('Invalid URL format').optional().or(z.literal('')).optional(),
});

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', validate(productSchema), createProduct);
router.put('/:id', validate(updateProductSchema), updateProduct);
router.delete('/:id', deleteProduct);

export default router;