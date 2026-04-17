import axios from 'axios';

// ⚠️ For Android Emulators, use '10.0.2.2' which automatically points to your PC's localhost.
// If testing on a physical device, you will need to use your PC's local network IP (e.g., 192.168.1.7).
const API_BASE_URL = 'http://10.0.2.2:5000/api/v1';

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

export const createProduct = async (data: { name: string, description: string, price: string, categoryId: string, imageUri?: string }) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description || '');
    formData.append('price', data.price.toString());
    formData.append('categoryId', data.categoryId);

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

    const response = await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const updateProduct = async (id: string, data: { name: string, description: string, price: string, categoryId: string, imageUri?: string }) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description || '');
    formData.append('price', data.price.toString());
    formData.append('categoryId', data.categoryId);

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

    const response = await api.put(`/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const deleteProduct = async (id: string) => (await api.delete(`/products/${id}`)).data;

// order APIs
export const fetchAllOrders = async () => (await api.get('/orders/all')).data;
export const fetchUserOrders = async (userId: string) => (await api.get(`/orders/all?userId=${userId}`)).data;
export const updateOrderStatus = async (id: string, status: string) => (await api.put(`/orders/${id}/status`, { status })).data;

// user APIs
export const fetchUsers = async () => (await api.get('/auth/users')).data;
export const updateUser = async (id: string, data: { role?: string, isActive?: boolean }) => (await api.put(`/auth/users/${id}`, data)).data;
