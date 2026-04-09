import { StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCategories, deleteCategory } from '../api/apiClient';

type NavigationPropType = NavigationProp<any>;

const CategoryItem = ({ item }: { item: any }) => {
    const [imageError, setImageError] = useState(false);
    const navigation = useNavigation<NavigationPropType>();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteCategory(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
        onError: (error) => {
            console.error('Error deleting category:', error);
            Alert.alert('Error', 'Failed to delete category.');
        }
    });

    const handleEdit = () => {
        navigation.navigate('EditCategory', { category: item });
    };

    const handleDelete = () => {
        Alert.alert(
            "Delete Category",
            `Are you sure you want to delete "${item.name}"?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => deleteMutation.mutate(item.id)
                }
            ]
        );
    };

    return (
        <View className="bg-white p-4 rounded-xl mb-4 flex-row items-center justify-between shadow-sm border border-gray-100">
            <View className="flex-row items-center flex-1">
                {item.imageUrl && !imageError ? (
                    <Image 
                        source={{ uri: item.imageUrl }} 
                        className="w-12 h-12 rounded-lg shrink-0 bg-gray-100" 
                        style={{ width: 48, height: 48 }}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <View className="w-12 h-12 rounded-lg bg-gray-100 items-center justify-center shrink-0" style={{ width: 48, height: 48 }}>
                        <Ionicons name="image-outline" size={24} color="#9ca3af" />
                    </View>
                )}
                <Text className="text-lg font-semibold text-gray-800 ml-4 flex-1" numberOfLines={1}>{item.name}</Text>
            </View>
            <View className="flex-row items-center">
                <TouchableOpacity className="ml-2 p-2" onPress={handleEdit}>
                    <Ionicons name="pencil" size={20} color="#6b7280" />
                </TouchableOpacity>
                <TouchableOpacity className="ml-2 p-2" onPress={handleDelete} disabled={deleteMutation.isPending}>
                    {deleteMutation.isPending ? (
                        <ActivityIndicator size="small" color="#ef4444" />
                    ) : (
                        <Ionicons name="trash" size={20} color="#ef4444" />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const CategoriesScreen = () => {
    const navigation = useNavigation<NavigationPropType>();

    const { data: categories, isLoading, isError } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

  return (
    <View className='flex-1 bg-gray-50'>
      <View className='flex-row items-center justify-between px-4 py-4 bg-white shadow-sm border-b border-gray-100 pb-4'>
        <Text className='text-2xl font-bold pl-2 mt-4 text-gray-800'>Categories</Text>
        <TouchableOpacity className='flex-row items-center bg-blue-600 px-3 py-2 rounded-lg mt-5' onPress={() => navigation.navigate("AddCategory")}>
            <Ionicons name='add-circle' size={18} color='#fff'/>
            <Text className='text-white font-semibold ml-2'>Add</Text>
        </TouchableOpacity>
      </View>
      
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : isError ? (
        <View className="flex-1 justify-center items-center">
            <Text className="text-red-500">Error loading categories</Text>
        </View>
      ) : (
        <FlatList
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => <CategoryItem item={item} />}
            ListEmptyComponent={() => (
                <View className="flex-1 justify-center items-center pt-20">
                    <Ionicons name="folder-open-outline" size={48} color="#9ca3af" />
                    <Text className="text-gray-500 mt-4 font-medium text-lg">No Categories Found</Text>
                    <Text className="text-gray-400 mt-1">Tap Add to create a new category</Text>
                </View>
            )}
        />
      )}
    </View>
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({})