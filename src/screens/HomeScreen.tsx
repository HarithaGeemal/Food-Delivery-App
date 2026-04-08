import { View, Text, StyleSheet, StatusBar, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import BannerCarousel from 'components/BannerCarousel';

const HomeScreen = () => {
  const [query, setQuery] = useState('');
  const products = [
    {
      id: '1',
      name: 'Cow Milk Packet',
      price: 70,
      imageUrl:
        'https://cdn.zeptonow.com/production/tr:w-403,ar-1000-1000,pr-true,f-auto,q-80/cms/product_variant/a05ee90f-d81b-43a5-8f40-8c16a981730e.jpeg',
    },
    {
      id: '2',
      name: 'Buffalo Milk',
      price: 80,
      imageUrl:
        'https://www.bbassets.com/media/uploads/p/l/40149834_1-nandini-shubham-milk.jpg',
    },
    {
      id: '3',
      name: 'Ghee (500g)',
      price: 500,
      imageUrl: 'https://via.placeholder.com/300x200?text=Ghee',
    },
    {
      id: '4',
      name: 'Paneer Block',
      price: 200,
      imageUrl: 'https://via.placeholder.com/300x200?text=Paneer',
    },
  ];

  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: '#15803d' }}
    >
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="#15803d"
        translucent={false}
      />
      <View className="bg-green-700">
        <Header />
        <View className="px-4 pb-4">
          <SearchBar value={query} onChange={setQuery} />
        </View>
      </View>

      <ScrollView className="flex-1 bg-white rounded-t-3xl mt-[-2px]">
        <View className="pb-10">
          <View className="pt-4">
            <BannerCarousel />
          </View>

          {/* Catogarise */}

          {/* <View>

            </View> */}
          <View className="mt-3 px-4">
            <View className="flex-row items-center mt-3 justify-between">
              <Text className="text-xl font-bold px-4 mt-1">Flash sale</Text>
              <Text className="text-sm text-purple-600 px-4 mt-1">
                View all
              </Text>
            </View>
          </View>

          <View className="mt-3 px-4">
            <View className="flex-row items-center mt-3 justify-between">
              <Text className="text-xl font-bold px-4 mt-1">Specials</Text>
              <Text className="text-sm text-purple-600 px-4 mt-1">
                View all
              </Text>
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-4" className="mt-2">
            {products.map((product) => (
              <View key={product.id} className="w-32 mr-4 mb-4">
                <View className='h-32 bg-gray-100 rounded-xl p-2'>
                    <Image source={{ uri: product.imageUrl }} className="w-full h-full rounded-lg" resizeMode='contain' />
                </View>
                <View className="mt-2 text-left">
                  <Text className="font-semibold text-[13px]" numberOfLines={1}>{product.name}</Text>
                  <Text className="font-bold text-green-700 mt-1">₹{product.price}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
