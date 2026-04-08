import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';

type NavigationPropType = NavigationProp<any>;

const CategoriesScreen = () => {
    const navigation = useNavigation<NavigationPropType>();

  return (
    <View className='flex-1 bg-gray-50'>
      <View className='flex-row items-center justify-between px-4 py-4 bg-white shadow-sm'>
        <Text className='text-2xl font-bold pl-4 mt-4 text-gray-800'>Categories</Text>
        <TouchableOpacity className='flex-row items-center bg-blue-600 px-3 py-2 rounded-lg mt-5' onPress={() => navigation.navigate("AddCategory")}>
            <Ionicons name='add-circle' size={18} color='#fff'/>
            <Text className='text-white font-semibold ml-2'>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
})