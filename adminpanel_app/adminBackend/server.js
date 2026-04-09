import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import crypto from 'crypto';
import logger from './utils/logger.js';
import errorHandler from './middlewares/errorHandler.js';

// Load env vars FIRST before anything else uses process.env
dotenv.config();

// Routes
import categoriesRoutes from './routes/categoriesRoutes.js';
import productsRoutes from './routes/productRoutes.js';
// import ordersRoutes from './routes/ordersRoutes.js';
// import usersRoutes from './routes/usersRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
}));

// Body parsers — do NOT use bodyParser.raw here, it overwrites the parsed JSON body
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes (must be registered BEFORE the error handler)
app.use('/api/v1/categories', categoriesRoutes);
app.use('/api/v1/products', productsRoutes);
// app.use('/api/v1/orders', ordersRoutes);
// app.use('/api/v1/users', usersRoutes);

// Error handler MUST come AFTER routes
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
    logger.info(`Server is running on http://0.0.0.0:${PORT} (LAN accessible)`);
});
