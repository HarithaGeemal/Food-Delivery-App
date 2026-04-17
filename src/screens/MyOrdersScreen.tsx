import { View, Text, FlatList, ActivityIndicator, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { fetchMyOrders } from '../api/apiClient';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';

const MyOrdersScreen = () => {
    const navigation = useNavigation();
    const { data: orders, isLoading, isError } = useQuery({
        queryKey: ['myOrders'],
        queryFn: fetchMyOrders,
    });

    const renderOrderItem = ({ item }: any) => {
        return (
            <View className="bg-white rounded-xl p-4 shadow-sm mb-4 border border-gray-100">
                <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-[13px] font-bold text-gray-800">Order ID: {item.id || item._id}</Text>
                    <View className={`px-2 py-1 rounded-md ${item.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                        <Text className={`text-[12px] font-bold capitalize ${item.status === 'completed' ? 'text-green-800' : 'text-yellow-800'}`}>
                            {item.status}
                        </Text>
                    </View>
                </View>
                <Text className="text-[12px] text-gray-500 mb-2">
                    Date: {new Date(item.createdAt).toLocaleDateString()}
                </Text>
                <View className="border-t border-gray-100 pt-2 mb-2">
                    {item.items && item.items.map((prod: any, idx: number) => (
                        <Text key={idx} className="text-[13px] text-gray-700">
                            {prod.quantity}x {prod.name}
                        </Text>
                    ))}
                </View>
                <View className="flex-row justify-between items-center mt-2">
                    <Text className="text-[14px] font-medium text-gray-600">Total:</Text>
                    <Text className="text-[15px] font-bold text-gray-900">LKR {item.totalAmount}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="px-4 pt-4 pb-3 flex-row items-center border-b border-gray-100 bg-white">
                <Pressable className="p-2 -ml-2" onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </Pressable>
                <Text className="flex-1 text-[18px] font-bold text-gray-900 text-center pr-8">
                    My Orders
                </Text>
            </View>

            {isLoading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#16a34a" />
                </View>
            ) : isError ? (
                <View className="flex-1 items-center justify-center">
                    <Text className="text-red-500">Error loading orders</Text>
                </View>
            ) : orders?.length === 0 ? (
                <View className="flex-1 items-center justify-center">
                    <Ionicons name="receipt-outline" size={48} color="#9ca3af" />
                    <Text className="text-gray-500 mt-4 font-medium">No orders found</Text>
                </View>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id || item._id}
                    renderItem={renderOrderItem}
                    contentContainerStyle={{ padding: 16 }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
};

export default MyOrdersScreen;
