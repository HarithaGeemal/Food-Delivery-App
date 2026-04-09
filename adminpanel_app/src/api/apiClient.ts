import axios from 'axios';

// ⚠️ Android devices cannot reach 'localhost' — it points to the device itself.
// Use your PC's local network IP instead. Check it with `ipconfig` (Windows).
const API_BASE_URL = 'http://192.168.1.3:5000/api/v1';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// category APIs

export const fetchCategories = async () => (await api.get('/categories')).data;
export const fetchCategory = async (id: string) => (await api.get(`/categories/${id}`)).data;

/**
 * Create a category with an optional image file.
 * Sends multipart/form-data so the image binary is included.
 */
export const createCategory = async (data: { name: string; imageUri?: string }) => {
    const formData = new FormData();
    formData.append('name', data.name);

    if (data.imageUri) {
        // React Native FormData accepts { uri, name, type } as a "file"
        const filename = data.imageUri.split('/').pop() ?? 'image.jpg';
        const match = /\.(\w+)$/.exec(filename);
        const mimeType = match ? `image/${match[1]}` : 'image/jpeg';

        formData.append('image', {
            uri: data.imageUri,
            name: filename,
            type: mimeType,
        } as any);
    }

    const response = await api.post('/categories', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const updateCategory = async (id: string, data: { name: string; imageUri?: string }) => {
    const formData = new FormData();
    formData.append('name', data.name);

    if (data.imageUri) {
        const filename = data.imageUri.split('/').pop() ?? 'image.jpg';
        const match = /\.(\w+)$/.exec(filename);
        const mimeType = match ? `image/${match[1]}` : 'image/jpeg';

        formData.append('image', {
            uri: data.imageUri,
            name: filename,
            type: mimeType,
        } as any);
    }

    const response = await api.put(`/categories/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const deleteCategory = async (id: string) => (await api.delete(`/categories/${id}`)).data;

// product APIs

export const fetchProductsByCategory = async (categoryId: string) => (await api.get(`/categories/${categoryId}/products`)).data;
export const fetchProducts = async () => (await api.get('/products')).data;
export const fetchProductById = async (id: string) => (await api.get(`/products/${id}`)).data;
export const createProduct = async (productData: { name: string, description: string, price: number, categoryId: string, imageUrl?: string }) => (await api.post('/products', productData)).data;
export const updateProduct = async (id: string, productData: { name: string, description: string, price: number, categoryId: string, imageUrl?: string }) => (await api.put(`/products/${id}`, productData)).data;
export const deleteProduct = async (id: string) => (await api.delete(`/products/${id}`)).data;