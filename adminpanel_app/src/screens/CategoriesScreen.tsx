import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    ActivityIndicator,
    Image,
    Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCategories, deleteCategory } from '../api/apiClient';

type NavigationPropType = NavigationProp<any>;

const getAvatarColor = (name: string) => {
    const colors = [
        { bg: 'bg-blue-100', text: 'text-blue-600' },
        { bg: 'bg-green-100', text: 'text-green-600' },
        { bg: 'bg-purple-100', text: 'text-purple-600' },
        { bg: 'bg-orange-100', text: 'text-orange-600' },
        { bg: 'bg-rose-100', text: 'text-rose-600' },
        { bg: 'bg-teal-100', text: 'text-teal-600' },
    ];
    let hash = 0;
    if (name) {
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
};

const CategoryItem = ({ item }: { item: any }) => {
    const [imageError, setImageError] = useState(false);
    const navigation = useNavigation<NavigationPropType>();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteCategory(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
        onError: error => {
            console.error('Error deleting category:', error);
            Alert.alert('Error', 'Failed to delete category.');
        },
    });

    const handleEdit = () => {
        navigation.navigate('EditCategory', { category: item });
    };

    const handleDelete = () => {
        const productCount = item.products ? item.products.length : 0;
        const message = productCount > 0
            ? `This category contains ${productCount} items. Deleting it will also remove all its items locally.\n\nAre you sure you want to delete "${item.name}"?`
            : `Are you sure you want to delete "${item.name}"?`;

        Alert.alert(
            'Delete Category',
            message,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteMutation.mutate(item.id),
                },
            ],
        );
    };

    return (
        <TouchableOpacity 
            className="bg-white p-4 rounded-xl mb-4 flex-row items-center justify-between shadow-sm border border-gray-100"
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Product', { categoryId: item.id, categoryName: item.name })}
        >
            <View className="flex-row items-center flex-1">
                {item.imageUrl && !imageError ? (
                    <Image
                        source={{ uri: item.imageUrl }}
                        className="w-12 h-12 rounded-lg shrink-0 bg-gray-100"
                        style={{ width: 48, height: 48 }}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <View
                        className={`w-12 h-12 rounded-lg items-center justify-center shrink-0 ${getAvatarColor(item.name).bg}`}
                        style={{ width: 48, height: 48 }}
                    >
                        <Text className={`text-xl font-bold tracking-widest ${getAvatarColor(item.name).text}`}>
                            {item.name ? item.name.substring(0, 2).toUpperCase() : ''}
                        </Text>
                    </View>
                )}
                <View className="flex-1 ml-4 justify-center">
                    <Text
                        className="text-lg font-semibold text-gray-800"
                        numberOfLines={1}
                    >
                        {item.name}
                    </Text>
                    <Text className="text-sm text-gray-500 mt-1 font-medium">
                        {item.products ? item.products.length : 0} {item.products?.length === 1 ? 'Product' : 'Products'}
                    </Text>
                </View>
            </View>
            <View className="flex-row items-center">
                <TouchableOpacity className="ml-2 p-2 rounded-full bg-blue-100" onPress={handleEdit}>
                    <Ionicons name="pencil" size={20} color="#6b7280" />
                </TouchableOpacity>
                <TouchableOpacity
                    className="ml-2 p-2 rounded-full bg-red-100"
                    onPress={handleDelete}
                    disabled={deleteMutation.isPending}
                >
                    {deleteMutation.isPending ? (
                        <ActivityIndicator size="small" color="#ef4444" />
                    ) : (
                        <Ionicons name="trash" size={20} color="#ef4444" />
                    )}
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const CategoriesScreen = () => {
    const navigation = useNavigation<NavigationPropType>();

    const {
        data: categories,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    return (
        <View className="flex-1 bg-gray-50">
            <View className="flex-row items-center justify-between px-4 py-4 bg-white shadow-sm border-b border-gray-100 pb-4">
                <Text className="text-2xl font-bold pl-2 mt-4 text-gray-800">
                    Categories
                </Text>
                <TouchableOpacity
                    className="flex-row items-center bg-blue-600 px-3 py-2 rounded-lg mt-5"
                    onPress={() => navigation.navigate('AddCategory')}
                >
                    <Ionicons name="add-circle" size={18} color="#fff" />
                    <Text className="text-white font-semibold ml-2">Add</Text>
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#2563eb" />
                </View>
            ) : categories.length === 0 ? (
                <View className="flex-1 justify-center items-center pt-24 pb-10 px-4">
                    <Ionicons name="layers" size={60} color="#9ca3af" />
                    <Text className="text-gray-800 mt-4 font-bold text-lg">
                        No Categories Yet
                    </Text>
                    <Text className="text-gray-400 mt-2 text-sm text-center">
                        Create Categories to organize your products
                    </Text>
                    <TouchableOpacity 
                        className="bg-blue-600 px-6 py-3 rounded-lg mt-6"
                        onPress={() => navigation.navigate('AddCategory')}
                    >
                        <Text className="text-white font-semibold text-base">
                            Create category
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : isError ? (
                <View className="flex-1 justify-center items-center">
                    <Text className="text-red-500">Error loading categories</Text>
                </View>
            ) : (
                <FlatList
                    data={categories}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ padding: 16 }}
                    renderItem={({ item }) => <CategoryItem item={item} /> }
                    ListEmptyComponent={() => (
                        <View className="flex-1 justify-center items-center pt-24 pb-10 px-4">
                            <Ionicons name="layers" size={60} color="#9ca3af" />
                            <Text className="text-gray-800 mt-4 font-bold text-lg">
                                No Categories Yet
                            </Text>
                            <Text className="text-gray-400 mt-2 text-sm text-center">
                                Create Categories to organize your products
                            </Text>
                            <TouchableOpacity 
                                className="bg-blue-600 px-6 py-3 rounded-lg mt-6"
                                onPress={() => navigation.navigate('AddCategory')}
                            >
                                <Text className="text-white font-semibold text-base">
                                    Create category
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default CategoriesScreen;

const styles = StyleSheet.create({});
