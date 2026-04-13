import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.4:5000/api/v1';

export interface Category {
    id: string;
    name: string;
    imageUrl?: string;
    products: Product[];
}

export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    description?: string;
}

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error: any) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error: any) => {
        console.error('API Response Error:', error);
        return Promise.reject(error);
    }
);

let authInterceptorId: number | null = null;

export const fetchCategories = async () => (await api.get('/categories')).data as Category[];
export const fetchCategory = async (id: string) => (await api.get(`/categories/${id}`)).data as Category;

// products
export const fetchProducts = async () => (await api.get('/products')).data as Product[];
export const fetchProductsByCategory = async (categoryId: string) => (await api.get(`/categories/${categoryId}/products`)).data as Product[];
export const fetchProductById = async (id: string) => (await api.get(`/products/${id}`)).data as Product;
